/**
 * 文档站生产页面验收：在八种语言、外观和组件主题组合下检查运行错误、示例与样式切换。
 * 截图和报告保留在 site/.check，供人工复核布局；失败时以非零状态退出，避免漏掉坏页面。
 */
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('../../', import.meta.url))
const require = createRequire(new URL('../../scripts/screenshot.mjs', import.meta.url))
const { chromium } = require('playwright')
const output = resolve(root, 'site/.check')

/** 参数仅允许站内页面路径，防止拼错路径时把其他页面当作验收目标。 */
function options() {
  const args = process.argv.slice(2)
  const pages = []
  let base = 'http://localhost:5191'
  for (let index = 0; index < args.length; index++) {
    if (args[index] === '--base') {
      base = args[++index]
      if (!base || !/^https?:\/\//.test(base)) throw new Error('--base 需要 HTTP 地址')
    } else {
      if (!/^(?:(?:components|guide)\/)?[a-z0-9-]+$/.test(args[index])) {
        throw new Error(`无效页面路径：${args[index]}`)
      }
      pages.push(args[index].includes('/') ? args[index] : `components/${args[index]}`)
    }
  }
  return { base: new URL(base).href, pages }
}

/** 不传页面时从目录声明和指南文件发现目标，不维护第二份组件清单。 */
async function discoverPages() {
  const source = await readFile(resolve(root, 'site/.vitepress/catalog.ts'), 'utf8')
  const components = [...source.matchAll(/\{\s*slug:\s*'([^']+)'[^}]*ready:\s*true\s*\}/g)]
    .map((match) => `components/${match[1]}`)
  const guides = (await readdir(resolve(root, 'site/guide')))
    .filter((name) => name.endsWith('.md')).sort().map((name) => `guide/${name.slice(0, -3)}`)
  return [...components, ...guides]
}

/** 每个组合使用独立上下文，确保语言、暗色和上次访问状态不会相互污染。 */
async function inspect(browser, target, base) {
  const { path, lang, appearance, theme } = target
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  const errors = []
  const result = { ...target, errors, empty: 0, switchOk: false, primary: '', screenshot: '' }
  try {
    await context.addInitScript(({ theme, appearance }) => {
      /** 新标签页的空白文档没有存储权限，只在实际 HTTP 页面初始化状态。 */
      if (location.origin === 'null') return
      localStorage.setItem('site-theme', theme)
      localStorage.setItem('vitepress-theme-appearance', appearance)
    }, { theme, appearance })
    const page = await context.newPage()
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error' || (message.type() === 'warning' && message.text().includes('[Vue warn]'))) {
        errors.push(message.text())
      }
    })
    const response = await page.goto(new URL(`${lang === 'en' ? 'en/' : ''}${path}`, base).href)
    if (!response?.ok()) errors.push(`HTTP ${response?.status() ?? '无响应'}`)
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(500)
    const state = await page.evaluate(() => ({
      primary: getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary').trim().toLowerCase(),
      empty: [...document.querySelectorAll('.demo-preview')].filter((element) =>
        element.getBoundingClientRect().height <= 0 || !element.children.length || /组件未找到|Component not found/.test(element.textContent),
      ).length,
      previews: document.querySelectorAll('.demo-preview').length,
      dark: document.documentElement.classList.contains('dark'),
      heading: document.querySelector('.vp-doc h1')?.textContent.trim(),
      active: [...document.querySelectorAll('.VPSidebar .is-active .link')].map((element) => element.getAttribute('href')),
      outline: [...document.querySelectorAll('.VPDocAsideOutline .outline-link')].map((element) => element.textContent.trim()),
      sections: [...document.querySelectorAll('.vp-doc h2')].map((element) => element.textContent.replace(/​/g, '').trim()),
      breadcrumb: document.querySelector('.site-breadcrumb')?.textContent.trim(),
    }))
    result.primary = state.primary
    result.empty = state.empty
    /** 暗色 Arco 使用 _arco-dark.scss 的 arcoblue-6；不能套用亮色主色而误报切换失败。 */
    const expectedPrimary = theme === 'ep' ? '#409eff' : appearance === 'dark' ? 'rgb(60,126,255)' : '#165dff'
    result.switchOk = state.primary.replaceAll(' ', '') === expectedPrimary
    if (!result.switchOk) errors.push(`样式切换失效：${state.primary}`)
    if (state.dark !== (appearance === 'dark')) errors.push('亮暗外观切换失效')
    if (!state.heading) errors.push('页面没有标题')
    const route = `/${lang === 'en' ? 'en/' : ''}${path}`
    if (!state.active.includes(route)) errors.push('侧栏没有选中当前页')
    if (path.startsWith('components/')) {
      if (!state.previews) errors.push('组件页没有示例')
      if (!state.breadcrumb) errors.push('组件页没有分组面包屑')
      if (state.outline.length !== state.sections.length) errors.push('右侧目录与章节数不一致')
    }
    result.screenshot = `${lang}-${path.replaceAll('/', '-')}-${appearance}-${theme}.png`
    await page.screenshot({ path: resolve(output, result.screenshot), fullPage: true })
  } catch (error) {
    errors.push(error.stack ?? String(error))
  } finally {
    await context.close()
  }
  return result
}

/** 报告逐组合保留证据；终端按页面汇总，方便定位失败批次。 */
async function run() {
  const { base, pages: requested } = options()
  const pages = requested.length ? [...new Set(requested)] : await discoverPages()
  if (!pages.length) throw new Error('没有可检查的页面')
  await mkdir(output, { recursive: true })
  const browser = await chromium.launch()
  const results = []
  try {
    const queue = pages.flatMap((path) => ['zh', 'en'].flatMap((lang) =>
      ['light', 'dark'].flatMap((appearance) => ['arco', 'ep'].map((theme) => ({ path, lang, appearance, theme }))),
    ))
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (queue.length) {
        const target = queue.shift()
        const result = await inspect(browser, target, base)
        results.push(result)
        console.log(`${target.lang} ${target.path} ${target.appearance}/${target.theme}: ${result.errors.length} 错误，${result.empty} 空示例`)
        for (const error of result.errors) console.error(error)
      }
    }))
  } finally {
    await browser.close()
  }
  results.sort((a, b) => `${a.path}/${a.lang}/${a.appearance}/${a.theme}`.localeCompare(`${b.path}/${b.lang}/${b.appearance}/${b.theme}`))
  const rows = pages.map((path) => {
    const checks = results.filter((result) => result.path === path)
    return `| ${path} | ${checks.reduce((sum, row) => sum + row.errors.length, 0)} | ${checks.reduce((sum, row) => sum + row.empty, 0)} | ${checks.every((row) => row.switchOk) ? '正常' : '失败'} |`
  })
  const details = results.map((row) => `### ${row.lang} ${row.path} ${row.appearance}/${row.theme}\n\n主色：\`${row.primary}\`；空示例：${row.empty}；[截图](${row.screenshot})\n\n${row.errors.length ? row.errors.map((error) => `- ${error.replaceAll('\n', ' ')}`).join('\n') : '无错误。'}`)
  await writeFile(resolve(output, 'report.md'), `# 文档站页面检查\n\n检查地址：${base}\n\n| 页面 | 错误数 | 空示例数 | 样式切换 |\n| --- | --- | --- | --- |\n${rows.join('\n')}\n\n${details.join('\n\n')}\n`)
  await writeFile(resolve(output, 'report.json'), JSON.stringify(results, null, 2))
  if (results.some((row) => row.errors.length || row.empty)) process.exitCode = 1
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
