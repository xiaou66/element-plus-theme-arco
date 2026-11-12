// 在 Figma 里把一个节点导出成精简实例树（只读，不改文件），供 `element-plus-theme-arco-figma run` 使用。
// 一般不直接用本文件：执行 `npx element-plus-theme-arco-figma extract <节点 ID>` 会打印替换好 ID 的脚本，
// 再交给 Figma MCP 的 use_figma 执行。
//
// 精简格式：实例 { c: 组件名, p: { 属性: 值 | "@被替换的组件名" }, k?: [子节点] }；分组 { n: Frame 名, k: [子节点] }。
// 为节省 AI 上下文：不导出文字图层、组件内部的图标子节点（图标通过属性里的 "@Icon/xxx" 表达）、隐藏图层和不含实例的装饰图层。
const NODE_ID = '__NODE_ID__'

const root = await figma.getNodeByIdAsync(NODE_ID)
if (!root) throw new Error(`找不到节点 ${NODE_ID}`)
let page = root
while (page && page.type !== 'PAGE') page = page.parent
if (page) await figma.setCurrentPageAsync(page)

const names = new Map()
async function nameOf(component) {
  if (!component) return null
  if (!names.has(component.id)) {
    names.set(component.id, component.parent && component.parent.type === 'COMPONENT_SET' ? component.parent.name : component.name)
  }
  return names.get(component.id)
}

async function visit(node, inInstance = false) {
  if (!node.visible || node.type === 'TEXT') return null
  const kids = []
  if ('children' in node) {
    for (const c of node.children) {
      const v = await visit(c, inInstance || node.type === 'INSTANCE')
      if (!v) continue
      // 实例内部的普通容器摊平，只保留实例层级
      if (node.type === 'INSTANCE' && !v.c) kids.push(...(v.k || []))
      else kids.push(v)
    }
  }
  if (node.type === 'INSTANCE') {
    const c = await nameOf(await node.getMainComponentAsync())
    // 组件内部的图标已经体现在属性里（"@Icon/xxx"）；直接摆在设计稿里的图标保留
    if (inInstance && c && c.startsWith('Icon/')) return null
    const p = {}
    for (const [key, prop] of Object.entries(node.componentProperties)) {
      p[key.split('#')[0]] = prop.type === 'INSTANCE_SWAP' ? '@' + (await nameOf(await figma.getNodeByIdAsync(prop.value))) : prop.value
    }
    const out = { c, p }
    if (kids.length) out.k = kids
    return out
  }
  if (!kids.length) return null
  return { n: node.name, k: kids }
}

return await visit(root)
