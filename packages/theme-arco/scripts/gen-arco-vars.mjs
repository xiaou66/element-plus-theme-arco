// 从 @arco-design/web-vue 的 dist/arco.css 提取 Arco 的全局 CSS 变量，生成 SCSS 片段：
//   src/generated/_arco-vars.scss       :root      亮色色板（--red-1 … --link-10）+ 语义变量（--color-text-1 等）
//   src/generated/_arco-vars-dark.scss  html.dark  暗色色板 + 暗色语义变量
//
// 变量名和值与 Arco 完全一致，业务代码可以照 Arco 的写法取色，例如 rgb(var(--primary-6))、var(--color-text-2)。
// 选择器换成 :root / html.dark，跟随 Element Plus 的暗色开关，而不是 Arco 的 body[arco-theme='dark']。
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(resolve(root, 'package.json'))
const arcoPkg = JSON.parse(readFileSync(require.resolve('@arco-design/web-vue/package.json'), 'utf8'))
const css = readFileSync(require.resolve('@arco-design/web-vue/dist/arco.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')

// Arco 只在这两个选择器上定义全局变量（色板一块、语义变量一块）
const SELECTORS = { light: 'body', dark: "body[arco-theme='dark']" }

function collect(selector) {
  const vars = new Map()
  for (const [, sel, body] of css.matchAll(/([^{}]*)\{([^{}]*)\}/g)) {
    if (sel.trim() !== selector) continue
    for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);?/g)) vars.set(name, value.trim())
  }
  return vars
}

function render(target, vars) {
  const lines = [...vars].map(([name, value]) => `  ${name}: ${value};`)
  return [
    `// 由 scripts/gen-arco-vars.mjs 从 @arco-design/web-vue@${arcoPkg.version} 生成，请勿手改`,
    `${target} {`,
    ...lines,
    '}',
    '',
  ].join('\n')
}

const light = collect(SELECTORS.light)
const dark = collect(SELECTORS.dark)
if (light.size < 200 || dark.size < 200) {
  throw new Error(`从 arco.css 提取的变量数量异常（亮色 ${light.size}，暗色 ${dark.size}），Arco 的 CSS 结构可能变了`)
}

const out = resolve(root, 'src/generated')
mkdirSync(out, { recursive: true })
writeFileSync(resolve(out, '_arco-vars.scss'), render(':root', light))
writeFileSync(resolve(out, '_arco-vars-dark.scss'), render('html.dark', dark))
console.log(`src/generated  Arco 变量：亮色 ${light.size} 个，暗色 ${dark.size} 个（@arco-design/web-vue@${arcoPkg.version}）`)
