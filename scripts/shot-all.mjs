// 完整回归：构建后并行跑全量 / 按需 × 亮色 / 暗色四组对比和 Arco 变量校验
//
//   pnpm shot:all             # 所有 demo
//   pnpm shot:all table tree  # 只跑指定 demo（变量校验照常跑）
//
// 两个 dev server 由这里先起好，并按顺序预热四种组合的页面，四组对比都复用它们：
// screenshot.mjs 发现端口上已有 server 时不会自己起，也不会在结束时关掉，避免先跑完的一组把另一组还在用的 server 关掉。
// 结束后只关掉这里自己起的 server。任何一组失败或有差异时，退出码非 0。
import { spawn, spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const demos = process.argv.slice(2)

async function up(url) {
  try {
    await fetch(url)
    return true
  } catch {
    return false
  }
}

// detached 让 pnpm 和它拉起的 vite 在同一个进程组里，结束时整组杀掉
async function ensureServer(script, url) {
  if (await up(url)) return null
  const child = spawn('pnpm', ['--filter', 'playground', script], { cwd: root, stdio: 'ignore', detached: true })
  for (let i = 0; i < 120; i++) {
    await new Promise((r) => setTimeout(r, 500))
    if (await up(url)) return child
  }
  throw new Error(`dev server 未在 ${url} 启动`)
}

// 并行之前按顺序把四种组合的页面各打开一遍：冷启动时 Vite 要预构建依赖，暗色页面还会动态加载暗色样式、
// 可能触发新一轮预构建并刷新所有页面；这些都在并行开始前做完，几组对比就不会互相打断
async function warmUp() {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage()
    for (const url of ['http://localhost:5180/', 'http://localhost:5180/?dark=1', 'http://localhost:5181/', 'http://localhost:5181/?dark=1']) {
      const deadline = Date.now() + 120000
      for (;;) {
        try {
          await page.goto(`${url}#${demos[0] ?? 'button'}`)
          await page.waitForSelector('.case', { timeout: 30000 })
          await page.waitForLoadState('networkidle')
          break
        } catch (e) {
          if (Date.now() > deadline) throw new Error(`预热 ${url} 失败：${e.message}`)
        }
      }
    }
  } finally {
    await browser.close()
  }
}

// 跑一个子命令，返回退出码、完整输出和最后一行
function run(label, args) {
  return new Promise((done) => {
    const child = spawn('node', args, { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] })
    let out = ''
    child.stdout.on('data', (d) => (out += d))
    child.stderr.on('data', (d) => (out += d))
    child.on('close', (code) => {
      // 失败时 playwright 会在错误后面附调用日志，取“对比失败”那一行
      const lines = out.trim().split('\n').filter(Boolean)
      const last = lines.find((l) => l.startsWith('对比失败')) ?? lines.at(-1) ?? ''
      done({ label, code, out, last })
    })
  })
}

const servers = []
let failed = false
try {
  console.log('构建主题…')
  const build = spawnSync('pnpm', ['build'], { cwd: root, encoding: 'utf8' })
  if (build.status !== 0) {
    console.log(build.stdout + build.stderr)
    throw new Error('构建失败')
  }
  console.log(build.stdout.trim().split('\n').at(-1))

  for (const [script, url] of [
    ['dev', 'http://localhost:5180'],
    ['dev:ondemand', 'http://localhost:5181'],
  ]) {
    const child = await ensureServer(script, url)
    if (child) servers.push(child)
  }

  console.log('预热 dev server…')
  await warmUp()

  console.log('并行运行对比和变量校验…')
  const shot = 'scripts/screenshot.mjs'
  const results = await Promise.all([
    run('变量校验', ['scripts/verify-arco-vars.mjs']),
    run('全量 亮色', [shot, ...demos]),
    run('全量 暗色', [shot, '--dark', ...demos]),
    run('按需 亮色', [shot, '--mode', 'ondemand', ...demos]),
    run('按需 暗色', [shot, '--mode', 'ondemand', '--dark', ...demos]),
  ])
  for (const { label, code, out, last } of results) {
    const diff = last.match(/共 (\d+) 处差异/)
    // 变量校验亮色、暗色各输出一行，要检查完整输出
    const ok = code === 0 && (!diff || diff[1] === '0') && !/不一致 [1-9]|缺失 [1-9]/.test(out)
    if (!ok) failed = true
    console.log(`${ok ? '✓' : '✗'} ${label}：${last}`)
  }
} catch (e) {
  failed = true
  console.error(e.message)
} finally {
  for (const child of servers) {
    try {
      process.kill(-child.pid)
    } catch {}
  }
}
process.exit(failed ? 1 : 0)
