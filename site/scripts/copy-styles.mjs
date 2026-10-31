// 把两套组件样式复制到站点的静态目录：页面用 <link> 引入，切换“Arco 主题 / EP 原版”时启用一套、停用另一套。
//   arco.css / arco-dark.css  主题包构建产物（先执行 pnpm build）
//   glass.css                 毛玻璃（只在 Arco 主题下启用，开关是 html.glass）
//   ep.css / ep-dark.css      Element Plus 原版
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(resolve(root, 'package.json'))
const out = resolve(root, 'public/styles')
mkdirSync(out, { recursive: true })

// 主题包的 exports 没有导出 package.json，直接解析它导出的 dist 文件
const ep = dirname(require.resolve('element-plus/package.json'))
const files = {
  'arco.css': require.resolve('element-plus-theme-arco/dist/index.css'),
  'arco-dark.css': require.resolve('element-plus-theme-arco/dist/dark.css'),
  'glass.css': require.resolve('element-plus-theme-arco/dist/glass.css'),
  'ep.css': resolve(ep, 'dist/index.css'),
  'ep-dark.css': resolve(ep, 'theme-chalk/dark/css-vars.css'),
}
for (const [name, src] of Object.entries(files)) {
  if (!existsSync(src)) throw new Error(`缺少 ${src}，先执行 pnpm build`)
  copyFileSync(src, resolve(out, name))
}
console.log(`样式已复制到 ${out}`)
