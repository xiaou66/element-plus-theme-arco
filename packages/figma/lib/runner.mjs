// 执行 Code Connect 模板：Figma 实例树 → Element Plus 代码。
// 模板与官方 Code Connect 共用（templates/**/*.figma.ts），这里模拟官方模板 API 在本地运行。
//
// 实例树有两种格式，generate() 都接受：
//   精简格式（extract.js / REST 输出）：
//     实例 { c: 组件名, p: { 属性名: 值 | "@被替换的组件名" }, k?: [子节点], n?: 图层名 }
//     分组 { n: Frame 名, k: [子节点] }
//   详细格式：{ name, component?, props?: { 属性名: 值 | 实例节点 }, children?: [...] }

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const TEMPLATE_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'templates')

// ---------- 加载模板 ----------
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : e.name.endsWith('.figma.ts') ? [path.join(dir, e.name)] : [],
  )
}

let templates
function loadTemplates() {
  if (templates) return templates
  templates = new Map()
  for (const file of walk(TEMPLATE_DIR)) {
    const src = fs.readFileSync(file, 'utf8')
    const m = src.match(/^\/\/ figma=(.+)$/m)
    if (!m) continue
    const name = m[1].trim()
    const body = src
      .replace(/^import figma from ['"]figma['"]\s*$/m, '')
      .replace(/^const figma = require\(['"]figma['"]\)\s*$/m, '')
      .replace(/^export default /m, 'return ')
    const id = (src.match(/^\s*id: ['"]([^'"]+)['"]/m) || [])[1]
    templates.set(name, { file: path.relative(TEMPLATE_DIR, file), body, id, isIcon: name.startsWith('Icon/') })
  }
  return templates
}

export function listComponents() {
  const all = [...loadTemplates().keys()]
  return { components: all.filter(k => !k.startsWith('Icon/')).sort(), icons: all.filter(k => k.startsWith('Icon/')).sort() }
}

// ---------- 格式归一 ----------
export function normalize(node) {
  if (!node || typeof node !== 'object') return node
  if (Array.isArray(node)) return node.map(normalize)
  if ('c' in node || 'k' in node || ('n' in node && !('name' in node))) {
    const props = {}
    for (const [k, v] of Object.entries(node.p || {})) {
      props[k] = typeof v === 'string' && v.startsWith('@') ? { name: k, component: v.slice(1), props: {} } : v
    }
    return {
      name: node.n || node.c || '',
      ...(node.c ? { component: node.c, props } : {}),
      children: (node.k || []).map(normalize),
    }
  }
  return { ...node, children: (node.children || []).map(normalize) }
}

// ---------- 模拟 Figma 模板 API ----------
const code = (strings, ...values) =>
  strings.reduce((out, s, i) => {
    let v = i < values.length ? values[i] : ''
    if (Array.isArray(v)) v = v.join('')
    if (v === undefined || v === null || v === false) v = ''
    return out + s + v
  }, '')

const ERROR = { type: 'ERROR' }

// 官方语义：在实例自身的图层里找，遇到嵌套实例的边界就停（除非 traverseInstances）
function descendants(node, { traverseInstances = false } = {}) {
  const out = []
  const visit = n => {
    for (const c of n.children || []) {
      out.push(c)
      if (!c.component || traverseInstances) visit(c)
    }
  }
  visit(node)
  return out
}

function createContext() {
  const tpls = loadTemplates()
  const usedImports = new Set()
  const cache = new WeakMap()

  function handle(node) {
    if (!node || !node.component) return ERROR
    const tpl = tpls.get(node.component)
    return {
      type: 'INSTANCE',
      name: node.name,
      hasCodeConnect: () => !!tpl,
      // 只读 id，不执行模板（避免把没用到的子组件 import 也收集进来）
      codeConnectId: () => (tpl ? tpl.id : null),
      executeTemplate: () => execute(node, true),
    }
  }

  function selected(node) {
    const props = node.props || {}
    const need = name => {
      if (!(name in props)) throw new Error(`[${node.component}] 没有属性 "${name}"，可用：${Object.keys(props).join(', ')}`)
      return props[name]
    }
    const connected = opts => descendants(node, opts).filter(c => c.component && tpls.has(c.component)).map(handle)
    return {
      type: 'INSTANCE',
      name: node.name,
      getString: name => String(need(name)),
      getBoolean: (name, mapping) => {
        const v = need(name) === true || need(name) === 'true'
        return mapping ? mapping[v] : v
      },
      getEnum: (name, mapping) => mapping[need(name)],
      getPropertyValue: name => need(name),
      getInstanceSwap: name => {
        const v = need(name)
        return v && typeof v === 'object' ? handle(v) : null
      },
      getSlot: () => undefined,
      findInstance: (layer, opts) => {
        const hit = descendants(node, opts).find(c => c.component && c.name === layer)
        return hit ? handle(hit) : ERROR
      },
      findText: () => ERROR,
      findConnectedInstances: (fn, opts) => connected(opts).filter(h => fn(h)),
      findConnectedInstance: (id, opts) => connected(opts).find(h => h.codeConnectId() === id) || ERROR,
      findLayers: (fn, opts) => descendants(node, opts).filter(c => c.component).map(handle).filter(h => fn(h)),
    }
  }

  function execute(node, nested = false) {
    const tpl = tpls.get(node.component)
    // 父模板只读图标的 iconName，图标的 import 由父模板自己声明
    const record = r => {
      if (!(nested && tpl.isIcon)) for (const i of r.imports || []) usedImports.add(i)
    }
    if (cache.has(node)) {
      record(cache.get(node))
      return cache.get(node)
    }
    const figma = { code, html: code, tsx: code, selectedInstance: selected(node), properties: {}, helpers: {} }
    let result
    try {
      result = new Function('figma', tpl.body)(figma)
    } catch (e) {
      throw new Error(`执行模板 ${tpl.file} 出错：${e.message}`)
    }
    record(result)
    cache.set(node, result)
    return result
  }

  return { tpls, execute, usedImports }
}

// 合并同一模块的具名导入：import { A } from 'x' + import { B } from 'x' → import { A, B } from 'x'
function mergeImports(lines) {
  const byModule = new Map()
  const others = []
  for (const line of lines) {
    const m = line.match(/^import \{([^}]+)\} from ['"]([^'"]+)['"]/)
    if (!m) {
      others.push(line)
      continue
    }
    const set = byModule.get(m[2]) || new Set()
    m[1].split(',').map(s => s.trim()).filter(Boolean).forEach(n => set.add(n))
    byModule.set(m[2], set)
  }
  return [...[...byModule].map(([mod, names]) => `import { ${[...names].join(', ')} } from '${mod}'`), ...others]
}

/**
 * 生成代码。
 * @param tree 实例树（精简或详细格式，单个节点或数组）
 * @returns {{ imports: string[], snippets: string[], text: string, unmatched: string[] }}
 */
export function generate(tree) {
  const { tpls, execute, usedImports } = createContext()
  const lines = []
  const unmatched = new Set()
  const render = (node, depth) => {
    if (node.component && tpls.has(node.component)) {
      lines.push(String(execute(node).example).trim(), '')
      return
    }
    if (node.component) unmatched.add(node.component)
    // 普通 Frame 分组：输出一行注释，方便对照设计稿的布局结构
    if (!node.component && depth > 0 && (node.children || []).length) lines.push(`<!-- ${node.name} -->`)
    for (const c of node.children || []) render(c, depth + 1)
  }
  const roots = normalize(Array.isArray(tree) ? tree : [tree])
  for (const r of roots) render(r, 0)
  const imports = mergeImports(usedImports)
  const body = lines.join('\n').trim()
  return {
    imports,
    text: (imports.length ? imports.join('\n') + '\n\n' : '') + body,
    unmatched: [...unmatched],
  }
}
