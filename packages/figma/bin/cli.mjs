#!/usr/bin/env node
// element-plus-theme-arco-figma：把「Arco for Element Plus · UI Kit」的 Figma 设计稿转成 Element Plus 代码。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import os from 'node:os'
import { generate, listComponents } from '../lib/runner.mjs'
import { fetchTree, parseFigmaUrl } from '../lib/rest.mjs'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const BIN = 'element-plus-theme-arco-figma'

const HELP = `用法：
  ${BIN} <Figma 链接> [--json]             直接读取设计稿并输出 Element Plus 代码（需要 Figma 令牌，见下）
  ${BIN} extract <节点 ID | Figma 链接>   打印导出脚本（交给 Figma MCP 的 use_figma 执行，结果存成 JSON）
  ${BIN} run [tree.json]                  把导出的 JSON 转成 Element Plus 代码（省略文件名时读 stdin）
  ${BIN} list                             列出支持的 Figma 组件

Figma 令牌：环境变量 FIGMA_ACCESS_TOKEN，或文件 ~/.figma-token（Figma → Settings → Security →
Personal access tokens，权限 File content: Read only，所有套餐都能生成）。没有令牌时用 extract + run 两步走 Figma MCP。

示例：
  ${BIN} "https://www.figma.com/design/xxx/yyy?node-id=12-345"
  ${BIN} extract "https://www.figma.com/design/xxx/yyy?node-id=12-345"
  ${BIN} run tree.json`

// "12-345" / "12:345" / Figma 链接 → "12:345"
function parseNodeId(input) {
  if (!input) return null
  let id = input
  if (/^https?:\/\//.test(input)) {
    const url = new URL(input)
    id = url.searchParams.get('node-id')
    if (!id) return null
  }
  id = decodeURIComponent(id).replace('-', ':')
  return /^\d+:\d+$/.test(id) ? id : null
}

function fail(msg, code = 1) {
  console.error(msg)
  process.exit(code)
}

function readToken() {
  if (process.env.FIGMA_ACCESS_TOKEN) return process.env.FIGMA_ACCESS_TOKEN.trim()
  const file = path.join(os.homedir(), '.figma-token')
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8').trim() : ''
}

function print(tree) {
  const { text, unmatched } = generate(tree)
  console.log(text)
  if (unmatched.length) console.error(`\n<!-- 没有模板的组件（已跳过，只渲染其中能识别的子组件）：${unmatched.join('、')} -->`)
}

// 选项（--json）可以写在任意位置，其余是位置参数
const argv = process.argv.slice(2)
const flags = new Set(argv.filter(a => a.startsWith('--') && a !== '--help'))
const [cmd, arg] = argv.filter(a => !flags.has(a))

switch (cmd) {
  case 'extract': {
    const id = parseNodeId(arg)
    if (!id) fail(`需要节点 ID（如 12:345）或带 node-id 的 Figma 链接，收到：${arg ?? '（空）'}`)
    const script = fs.readFileSync(path.join(ROOT, 'extract.js'), 'utf8')
    // 去掉文件头注释，只留可执行部分
    process.stdout.write(script.slice(script.indexOf('const NODE_ID')).replace('__NODE_ID__', id))
    break
  }
  case 'run': {
    const raw = arg && arg !== '-' ? fs.readFileSync(arg, 'utf8') : fs.readFileSync(0, 'utf8')
    let tree
    try {
      tree = JSON.parse(raw)
    } catch (e) {
      fail(`JSON 解析失败：${e.message}`)
    }
    print(tree)
    break
  }
  case 'list': {
    const { components, icons } = listComponents()
    console.log(components.join('\n'))
    console.log(`\n另有 ${icons.length} 个图标（Icon/*）`)
    break
  }
  case undefined:
  case '-h':
  case '--help':
  case 'help':
    console.log(HELP)
    break
  default: {
    if (!/^https?:\/\//.test(cmd)) fail(`未知命令：${cmd}\n\n${HELP}`)
    const target = parseFigmaUrl(cmd)
    if (!target || !target.nodeId) fail(`链接里需要有 node-id（在 Figma 里选中图层后复制链接）：${cmd}`)
    const token = readToken()
    // 退出码 2：没有令牌，调用方（AI）应改用 extract + run
    if (!token) fail(`没有找到 Figma 令牌（FIGMA_ACCESS_TOKEN 或 ~/.figma-token）。\n改用 Figma MCP：执行 \`${BIN} extract "${cmd}"\`，把输出的脚本交给 use_figma 执行，结果存成 JSON 后执行 \`${BIN} run <文件>\`。`, 2)
    try {
      const tree = await fetchTree({ ...target, token })
      if (flags.has('--json')) console.log(JSON.stringify(tree))
      else print(tree)
    } catch (e) {
      fail(e.message)
    }
  }
}
