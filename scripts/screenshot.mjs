// 对照截图 + 样式差异报告
//
//   pnpm shot                 # 所有 demo
//   pnpm shot button          # 只跑 button
//   pnpm shot --url http://localhost:5180
//   pnpm shot:ondemand        # 按需引入模式（先构建主题镜像，端口 5181）
//   pnpm shot --dark          # 暗色（两侧同时切到暗色），可与 --mode ondemand 组合
//   pnpm shot:all             # 构建后并行跑四种组合和变量校验（见 shot-all.mjs）
//
// 产物（默认 .compare/，按需 .compare-ondemand/，暗色再加 -dark 后缀）：
//   <demo>/<case>.png         每个对照用例的截图（左 EP，右 Arco）
//   report.md                 成对元素在 default / hover / focus 下的样式差异
//
// 成对规则：同一个 .case 里，.side-ep 和 .side-arco 下 data-pair 相同的两个元素。
// EP 一侧的 wrapper 上可以写 data-skip="focus hover"，跳过两边行为本来就不同的状态。
// wrapper 上可以写 data-target=".el-radio__inner|.el-radio__label"（两侧各写各的选择器，数量相同），
// 按顺序逐个测量组件内部的部件；不写时测第一个匹配 TARGET 的组件本体。
// EP 一侧写 data-pos 时额外比较测量目标相对 wrapper 的位置（Badge 角标、Divider 文字这类绝对定位的部件）。
// EP 一侧写 data-width 时比较宽度（默认只有按钮类 pair 比较宽度，输入框的宽度由容器决定）。
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? fallback : args.splice(i, 2)[1]
}
const ondemand = flag('mode', 'full') === 'ondemand'
const dark = args.includes('--dark') && args.splice(args.indexOf('--dark'), 1).length > 0
const baseUrl = flag('url', ondemand ? 'http://localhost:5181' : 'http://localhost:5180')
const outDir = resolve(root, flag('out', `.compare${ondemand ? '-ondemand' : ''}${dark ? '-dark' : ''}`))
// 默认跑 App.vue 里注册的全部 demo
const registered = [...readFileSync(resolve(root, 'playground/src/App.vue'), 'utf8').matchAll(/^\s+'?([\w-]+)'?: \{ label:/gm)].map((m) => m[1])
const demos = args.length ? args : registered

// 在成对的 wrapper 里，按顺序找第一个“组件本体”来测量
const TARGET = [
  '.el-button, .arco-btn, .el-textarea__inner, .arco-textarea-wrapper, .el-input__wrapper, .arco-input-wrapper',
  '.el-link, .arco-link, .el-tag, .el-check-tag, .arco-tag',
  '.el-badge__content, .arco-badge-number, .arco-badge-dot, .arco-badge-text, .el-divider, .arco-divider',
  '.el-alert, .arco-alert, .el-card, .arco-card, .el-avatar, .arco-avatar, .el-input-tag, .arco-input-tag',
  '.el-descriptions, .arco-descriptions, .el-text, .arco-typography, .el-select__wrapper, .arco-select-view',
  '.el-message, .arco-message, .el-notification, .arco-notification, .el-dialog, .arco-modal, .el-drawer, .arco-drawer',
].join(', ')

function stopServer(child) {
  try {
    process.kill(-child.pid)
  } catch {}
}

async function ensureServer() {
  try {
    await fetch(baseUrl)
    return null
  } catch {}
  // detached 让 pnpm 和它拉起的 vite 在同一个进程组里，退出时整组杀掉
  const script = ondemand ? 'dev:ondemand' : 'dev'
  const child = spawn('pnpm', ['--filter', 'playground', script], { cwd: root, stdio: 'ignore', detached: true })
  // 冷启动要做依赖预构建，最多等 60 秒
  for (let i = 0; i < 120; i++) {
    await new Promise((r) => setTimeout(r, 500))
    try {
      await fetch(baseUrl)
      return child
    } catch {}
  }
  stopServer(child)
  throw new Error(`dev server 未在 ${baseUrl} 启动`)
}

// 预热：冷启动时 Vite 要预构建依赖，首次访问可能中途整页刷新；几组对比并行跑时会更慢。
// 先打开一次页面，等用例渲染出来、网络空闲，再开始逐个 demo 测量
async function warmUp(page) {
  const deadline = Date.now() + 120000
  for (;;) {
    try {
      await page.goto(`${baseUrl}/${dark ? '?dark=1' : ''}#${demos[0]}`)
      await page.waitForSelector('.case', { timeout: 30000 })
      await page.waitForLoadState('networkidle')
      return
    } catch (e) {
      if (Date.now() > deadline) throw e
    }
  }
}

// 在页面里执行：把一个元素的样式归一成可比较的字段。
// - EP 的输入框用 inset box-shadow 画边框，Arco 用真实 border，统一折算成 edge。
// - Arco 暗色下大量使用半透明色，EP 则预先合成成不透明色；所以所有颜色都先合成到实际背景上，比“看起来的颜色”。
function measure(el, withPos) {
  const parse = (c) => {
    const n = c.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0, 0]
    return c === 'transparent' ? [0, 0, 0, 0] : [n[0], n[1], n[2], n[3] ?? 1]
  }
  const over = (top, bottom) => {
    const a = top[3]
    return [0, 1, 2].map((i) => top[i] * a + bottom[i] * (1 - a)).concat(1)
  }
  const fmt = (c) => `rgb(${c.slice(0, 3).map(Math.round).join(', ')})`
  // 一个元素自己的背景层：background-color，加上纯色渐变（linear-gradient(c, c)）叠的一层
  const ownLayers = (n) => {
    const c = getComputedStyle(n)
    const layers = [parse(c.backgroundColor)]
    const grad = c.backgroundImage.match(/^linear-gradient\((rgba?\([^)]*\)),\s*(rgba?\([^)]*\))\)$/)
    if (grad && grad[1] === grad[2]) layers.push(parse(grad[1]))
    return layers
  }
  // 元素自身背景合成到它下面所有可见层之后的颜色。
  // 按元素中心点取下面的元素（elementsFromPoint），而不是只看祖先：
  // EP InputNumber 的按钮是叠在输入框上的兄弟节点，只看祖先会漏掉输入框的底色
  const surface = (node) => {
    const r = node.getBoundingClientRect()
    const stack = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    const below = stack.slice(stack.indexOf(node) + 1).filter((n) => n.checkVisibility({ opacityProperty: true }))
    // 测量目标自己即使 opacity 为 0（Arco embed 模式的按钮列）也计入，两侧口径一致
    const nodes = stack.includes(node) ? [node, ...below] : [...(function* () { for (let n = node; n instanceof Element; n = n.parentElement) yield n })()]
    return nodes
      .flatMap((n) => ownLayers(n).reverse())
      .reverse()
      .reduce((acc, layer) => over(layer, acc), [255, 255, 255, 1])
  }

  // 第一段可见文字相对组件左边缘的偏移：padding 写在外层还是内层（Arco 的 radio-button-content）都不影响结果
  const firstText = (node) => {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
    for (let t = walker.nextNode(); t; t = walker.nextNode()) {
      if (!t.textContent.trim()) continue
      // Arco Switch 用 opacity: 0 的 text-holder 撑宽度，不算可见文字
      let hidden = false
      for (let p = t.parentElement; p && p !== node.parentElement; p = p.parentElement) {
        if (getComputedStyle(p).opacity === '0') hidden = true
      }
      // 用于测量宽度的隐藏镜像（InputTag 的 input-calculator / mirror）也不算；
      // font-size 为 0 的文字（EP ColorPicker 触发器里的无障碍文字）看不见，也不算
      const parentCs = getComputedStyle(t.parentElement)
      if (hidden || parentCs.visibility === 'hidden' || parseFloat(parentCs.fontSize) === 0) continue
      const range = document.createRange()
      range.selectNodeContents(t)
      const r = range.getBoundingClientRect()
      if (r.width > 0) return { node: t, rect: r }
    }
    return null
  }
  const text = firstText(el)
  const textCs = text ? getComputedStyle(text.node.parentElement) : getComputedStyle(el)
  const textStart = () => (text ? text.rect.left - el.getBoundingClientRect().left : null)

  // elementsFromPoint 只认视口内的点，必要时把元素滚进视口。只滚窗口：scrollIntoView 会连带滚动
  // overflow: hidden 的内部容器（Arco InputNumber 的按钮列），把元素挪位
  const vr = el.getBoundingClientRect()
  // 顶部吸顶的导航栏会盖住元素，也要避开
  const headBottom = document.querySelector('.pg-head')?.getBoundingClientRect().bottom ?? 0
  if (vr.top < headBottom || vr.bottom > innerHeight) window.scrollBy(0, vr.top - (innerHeight + headBottom) / 2)
  const cs = getComputedStyle(el)
  // Radio / Checkbox 里隐藏的原生 input 不算输入区
  // 祖先 opacity 为 0 也算隐藏（EP Select 的 input 外层 input-wrapper 在不可搜索时是透明的）
  const shown = (n) => n && n.checkVisibility({ opacityProperty: true }) && n.getBoundingClientRect().width > 0 && n
  const inner = shown(el.matches('input, textarea') ? el : el.querySelector('input, textarea')) || null
  const innerCs = inner ? getComputedStyle(inner) : null
  const rect = el.getBoundingClientRect()
  const transparent = (c) => parse(c)[3] === 0
  const bg = surface(el)
  const parentBg = surface(el.parentElement)

  // 取第一条可见的边：分割线一类组件 EP 画上边框、Arco 画下边框，视觉上是同一根线
  let edge = 'none'
  for (const side of ['Top', 'Bottom', 'Left', 'Right']) {
    const style = cs[`border${side}Style`]
    const color = cs[`border${side}Color`]
    if (parseFloat(cs[`border${side}Width`]) > 0 && style !== 'none' && !transparent(color)) {
      edge = `${style} ${fmt(over(parse(color), bg))}`
      break
    }
  }
  let ring = 'none'
  for (const part of cs.boxShadow === 'none' ? [] : cs.boxShadow.split(/,(?![^(]*\))/)) {
    const color = part.match(/rgba?\([^)]*\)/)?.[0]
    const nums = part.replace(/rgba?\([^)]*\)/, '').replace('inset', '').trim().split(/\s+/).map(parseFloat)
    if (!color || transparent(color)) continue
    if (part.includes('inset') && edge === 'none') edge = `solid ${fmt(over(parse(color), bg))}`
    else if (!part.includes('inset') && nums[3] > 0) ring = `${nums[3]}px ${fmt(over(parse(color), parentBg))}`
  }

  const wrap = el.closest('[data-pair]').getBoundingClientRect()
  return {
    ...(withPos ? { left: rect.left - wrap.left, top: rect.top - wrap.top } : {}),
    width: rect.width,
    height: rect.height,
    // 内容（文字 / 输入区）相对组件左边缘的偏移，比单纯比 padding 更能反映视觉位置
    contentX: inner
      ? inner.getBoundingClientRect().left +
        parseFloat(innerCs.paddingLeft) +
        parseFloat(innerCs.borderLeftWidth) -
        rect.left
      : textStart() ?? parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth),
    // 没有文字、图标、输入框的元素（Badge 小圆点等），文字属性没有视觉意义，不比较；
    // 只看可见的文字和图标（隐藏的图标、font-size 为 0 的无障碍文字不算）
    ...(inner || text || el.matches('svg') || [...el.querySelectorAll('svg, img')].some((n) => n.checkVisibility())
      ? {
          // 字号、字重同样取第一段可见文字所在元素（Arco Card 的标题字号写在内层 title 上）
          fontSize: parseFloat(innerCs?.fontSize ?? textCs.fontSize),
          // 只有图标、没有文字时字重没有视觉意义
          ...(text || inner ? { fontWeight: textCs.fontWeight } : {}),
          // 文字色取第一段可见文字所在元素：Arco Switch 这类组件的根节点是 <button>，文字色写在内层
          // 空输入框显示的是占位符，取 ::placeholder 的颜色（EP Select 的占位符是真实文字，Arco 是伪元素）
          color: fmt(
            over(
              parse(
                inner && !inner.value && inner.placeholder
                  ? getComputedStyle(inner, '::placeholder').color
                  : (innerCs?.color ?? textCs.color),
              ),
              bg,
            ),
          ),
        }
      : {}),
    background: fmt(bg),
    edge,
    ring,
    // 超过半高的圆角视觉上都是胶囊形，统一截断
    radius: Math.min(parseFloat(cs.borderTopLeftRadius), rect.height / 2),
  }
}

const rgb = (s) => s.match(/[\d.]+/g)?.map(Number)
function same(a, b) {
  if (typeof a === 'number') return Math.abs(a - b) <= 0.5
  if (a === b) return true
  const [ca, cb] = [rgb(String(a)), rgb(String(b))]
  if (!ca || !cb || ca.length !== cb.length) return false
  return ca.every((v, i) => Math.abs(v - cb[i]) <= (i === 3 ? 0.02 : 2))
}
const fmt = (v) => (typeof v === 'number' ? `${Math.round(v * 10) / 10}` : v)

async function setState(page, handle, state) {
  await page.mouse.move(0, 0)
  await page.evaluate(() => document.activeElement?.blur())
  if (state === 'hover') await handle.hover({ force: true })
  if (state === 'focus') {
    const focusable = await handle.evaluateHandle((el) =>
      el.matches('input, textarea, button') ? el : el.querySelector('input, textarea') ?? el,
    )
    // 先按一次键盘，让按钮的 :focus-visible 生效
    await page.keyboard.press('Shift')
    await focusable.asElement().focus()
  }
  await page.waitForTimeout(state === 'default' ? 0 : 250)
  // 上一个状态离开后的过渡（如失焦后的背景色渐变）结束再测
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((a) => a instanceof CSSTransition)
        .map((a) => a.finished.catch(() => {})),
    ),
  )
}

async function run() {
  const server = await ensureServer()
  let browser
  let page
  const report = [`# EP × Arco 样式差异报告（${ondemand ? '按需引入' : '全量引入'}${dark ? '，暗色' : ''}）`, '', `生成时间：${new Date().toISOString()}`, '']
  let total = 0

  try {
    // 浏览器放在 try 里创建：启动或建页失败时也要走 finally，关掉脚本自己拉起的 dev server，避免留下孤儿进程
    browser = await chromium.launch()
    page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
    await warmUp(page)
    for (const demo of demos) {
      // 冷启动时 Vite 可能在首次访问中途重新预构建依赖并刷新页面，重试一次
      for (let attempt = 1; ; attempt++) {
        try {
          await page.goto(`${baseUrl}/${dark ? '?dark=1' : ''}#${demo}`)
          await page.waitForSelector(`.pg-main[data-demo="${demo}"] .case`, { timeout: 20000 })
          break
        } catch (e) {
          if (attempt >= 2) throw e
        }
      }
      await page.evaluate(() => document.fonts.ready)
      // EP 的 Tag 等组件挂载时有入场动画（el-zoom-in-center），等有限时长的动画都结束再截图测量
      await page.evaluate(() =>
        Promise.all(
          document
            .getAnimations()
            .filter((a) => a.effect?.getComputedTiming().endTime !== Infinity)
            .map((a) => a.finished.catch(() => {})),
        ),
      )
      mkdirSync(resolve(outDir, demo), { recursive: true })
      report.push(`## ${demo}`, '')

      for (const caseEl of await page.$$('.case')) {
        const id = await caseEl.getAttribute('data-case')
        await caseEl.screenshot({ path: resolve(outDir, demo, `${id}.png`) })

        const pairs = await caseEl.$$eval('.side-ep [data-pair]', (els) =>
          els.map((e) => ({
            id: e.dataset.pair,
            skip: (e.dataset.skip ?? '').split(/\s+/),
            width: 'width' in e.dataset,
            pos: 'pos' in e.dataset,
          })),
        )
        const rows = []
        for (const { id: pair, skip, width, pos } of pairs) {
          const parts = await Promise.all(
            ['ep', 'arco'].map((side) =>
              caseEl.$$eval(`.side-${side} [data-pair="${pair}"]`, (els) => els[0]?.dataset.target?.split('|') ?? null),
            ),
          )
          const count = Math.max(parts[0]?.length ?? 1, parts[1]?.length ?? 1)
          for (let i = 0; i < count; i++) {
            const find = (side, list) => {
              const wrap = `.side-${side} [data-pair="${pair}"]`
              return caseEl.$(list ? `${wrap} :is(${list[i]}), ${wrap}:is(${list[i]})` : `${wrap} :is(${TARGET})`)
            }
            const label = parts[0] ? `${pair} ${parts[0][i]}` : pair
            const ep = await find('ep', parts[0])
            const arco = await find('arco', parts[1])
            if (!ep || !arco) {
              rows.push(`| ${label} | — | 缺少成对元素 | | |`)
              continue
            }
            for (const state of ['default', 'hover', 'focus'].filter((st) => !skip.includes(st))) {
              // 出错时带上用例和 pair，方便定位
              const run = async (handle, side) => {
                try {
                  await setState(page, handle, state)
                  return await handle.evaluate(measure, pos)
                } catch (e) {
                  throw new Error(`${demo} / ${id} / ${label}（${side}，${state}）：${e.message.split('\n')[0]}`)
                }
              }
              const a = await run(ep, 'EP')
              const b = await run(arco, 'Arco')
              for (const key of Object.keys(a)) {
                if (key === 'width' && !width && !pair.match(/^(primary|secondary|outline|dashed|text|small|default|large|icon|round)/)) continue
                if (!same(a[key], b[key])) rows.push(`| ${label} | ${state} | ${key} | ${fmt(a[key])} | ${fmt(b[key])} |`)
              }
            }
          }
        }
        await page.mouse.move(0, 0)

        total += rows.length
        report.push(`### ${id}  ${rows.length ? `（${rows.length} 处差异）` : '✅'}`, '')
        report.push(`![${id}](${demo}/${id}.png)`, '')
        if (rows.length) report.push('| pair | state | 属性 | EP | Arco |', '|---|---|---|---|---|', ...rows, '')
      }
    }
  } finally {
    await browser?.close()
    if (server) stopServer(server)
  }

  report.splice(3, 0, `**共 ${total} 处差异**`, '')
  writeFileSync(resolve(outDir, 'report.md'), report.join('\n'))
  console.log(`截图与报告已写入 ${outDir}（共 ${total} 处差异）`)
}

run().catch((e) => {
  console.error(`对比失败：${e.message}`)
  process.exit(1)
})
