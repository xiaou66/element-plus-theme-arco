// 校验 Arco 兼容变量：在两个隔离页面里分别只加载 Arco 原版 CSS 和本主题 CSS，
// 逐个比较亮色 / 暗色下每个变量解析后的值。
//
//   pnpm verify:vars     （需先 pnpm build）
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const theme = resolve(root, 'packages/theme-arco')
const require = createRequire(resolve(theme, 'package.json'))

const arcoCss = readFileSync(require.resolve('@arco-design/web-vue/dist/arco.css'), 'utf8')
const ourCss = ['dist/index.css', 'dist/dark.css'].map((f) => readFileSync(resolve(theme, f), 'utf8')).join('\n')
const names = [
  ...new Set(
    [...readFileSync(resolve(theme, 'src/generated/_arco-vars.scss'), 'utf8').matchAll(/(--[\w-]+):/g)].map((m) => m[1]),
  ),
]

const browser = await chromium.launch()

// Arco 的暗色开关是 body[arco-theme=dark]，本主题跟随 EP 用 html.dark
async function resolveVars(css, dark, toggle) {
  const page = await browser.newPage()
  await page.setContent(`<style>${css}</style><div id="probe"></div>`)
  const values = await page.evaluate(
    ({ names, dark, toggle }) => {
      if (dark && toggle === 'arco') document.body.setAttribute('arco-theme', 'dark')
      if (dark && toggle === 'ep') document.documentElement.classList.add('dark')
      const cs = getComputedStyle(document.getElementById('probe'))
      return Object.fromEntries(names.map((n) => [n, cs.getPropertyValue(n).trim()]))
    },
    { names, dark, toggle },
  )
  await page.close()
  return values
}

let failed = false
try {
  for (const dark of [false, true]) {
    const arco = await resolveVars(arcoCss, dark, 'arco')
    const ours = await resolveVars(ourCss, dark, 'ep')
    const diff = names.filter((n) => arco[n] !== ours[n])
    const missing = names.filter((n) => !ours[n])
    console.log(`${dark ? '暗色' : '亮色'}：${names.length} 个变量，不一致 ${diff.length}，缺失 ${missing.length}`)
    for (const n of diff.slice(0, 20)) console.log(`  ${n}  Arco=${arco[n]}  主题=${ours[n]}`)
    if (diff.length || missing.length) failed = true
  }
} finally {
  await browser.close()
}
process.exit(failed ? 1 : 0)
