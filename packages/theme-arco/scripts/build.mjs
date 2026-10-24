// 构建产物：
//   dist/theme-chalk/   与 element-plus/theme-chalk 同名同结构的镜像，每个文件 = EP 样式（Arco token）+ 对应组件覆盖
//   dist/index.css      全量样式（等同 theme-chalk/index.css）
//   dist/dark.css       暗色变量（等同 theme-chalk/dark/css-vars.css，需配合 html.dark 使用）
//   dist/meta.json      镜像所基于的 element-plus 版本，供 Vite 插件做版本检查
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as sass from 'sass'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const epRoot = resolve(root, 'node_modules/element-plus')
const epSrc = resolve(epRoot, 'theme-chalk/src')
const dist = resolve(root, 'dist')
const mirror = resolve(dist, 'theme-chalk')

// EP 的命名规则：src/button.scss → el-button.css；这几个保持原名
const plainNames = new Set(['base', 'index', 'display'])
const outName = (name) => (plainNames.has(name) ? `${name}.css` : `el-${name}.css`)

function entrySource(file) {
  const name = basename(file, '.scss')
  // 全量入口直接用 src/index.scss，里面已经包含所有组件覆盖
  if (name === 'index') return `@use '${resolve(root, 'src/index.scss')}';`
  const override = resolve(root, `src/components/_${name}.scss`)
  return [
    `@use '${resolve(root, 'src/common/var.scss')}' as *;`,
    `@use 'element-plus/theme-chalk/src/${file}' as ep;`,
    existsSync(override) ? `@use '${override}' as arco;` : '',
  ].join('\n')
}

const start = performance.now()
rmSync(dist, { recursive: true, force: true })
mkdirSync(resolve(mirror, 'dark'), { recursive: true })

const files = readdirSync(epSrc).filter((f) => f.endsWith('.scss'))
let bytes = 0
// 串行同步编译：纯 JS 版 sass 在上百个 compileStringAsync 并发时会卡死，串行反而只要几秒
for (const file of files) {
  const { css } = sass.compileString(entrySource(file), {
    style: 'compressed',
    loadPaths: [resolve(root, 'node_modules')],
    silenceDeprecations: ['import', 'global-builtin'],
  })
  writeFileSync(resolve(mirror, outName(basename(file, '.scss'))), css)
  bytes += Buffer.byteLength(css)
}

// 暗色：EP 的 dark/var 用 Arco 暗色 token 配置，再叠加暗色修正
const dark = sass.compile(resolve(root, 'src/dark/css-vars.scss'), {
  style: 'compressed',
  loadPaths: [resolve(root, 'node_modules')],
  silenceDeprecations: ['import', 'global-builtin'],
})
writeFileSync(resolve(mirror, 'dark/css-vars.css'), dark.css)
copyFileSync(resolve(mirror, 'index.css'), resolve(dist, 'index.css'))
copyFileSync(resolve(mirror, 'dark/css-vars.css'), resolve(dist, 'dark.css'))

const epVersion = JSON.parse(readFileSync(resolve(epRoot, 'package.json'), 'utf8')).version
writeFileSync(resolve(dist, 'meta.json'), JSON.stringify({ elementPlus: epVersion }, null, 2) + '\n')

// 和 EP 的 theme-chalk 对一遍文件清单，防止 EP 升级后漏文件
const expected = readdirSync(resolve(epRoot, 'theme-chalk')).filter((f) => f.endsWith('.css'))
const missing = expected.filter((f) => !existsSync(resolve(mirror, f)))
if (missing.length) {
  console.error(`镜像缺少 EP 的文件：${missing.join(', ')}`)
  process.exit(1)
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`
console.log(
  `dist/theme-chalk  ${files.length} 个文件 ${kb(bytes)}（基于 element-plus@${epVersion}）  ${((performance.now() - start) / 1000).toFixed(1)}s`,
)
