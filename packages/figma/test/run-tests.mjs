// 回归测试：用 test/*.json 里的实例树跑全部模板，检查
// 1. 每个模板都能执行；2. 生成的 Vue 模板能被编译；3. 关键输出没变（快照）。
// 更新快照：node test/run-tests.mjs --update
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { generate, listComponents } from '../lib/runner.mjs'

const DIR = path.dirname(fileURLToPath(import.meta.url))
// 不单独加依赖：借用仓库里文档站安装的 vue，再从 vue 的位置找到它自带的模板编译器
const fromSite = createRequire(path.join(DIR, '../../../site/package.json'))
const { compile } = createRequire(fromSite.resolve('vue/package.json'))('@vue/compiler-dom')
const update = process.argv.includes('--update')
let failed = 0

for (const file of fs.readdirSync(DIR).filter(f => f.endsWith('.json'))) {
  const tree = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'))
  const { text, unmatched } = generate(tree)

  // 只编译以 < 开头的片段（ElMessage 等函数调用和注释跳过）
  const blocks = text.split(/\n\n+/).filter(b => b.trim().startsWith('<') && !b.trim().startsWith('<!--'))
  for (const b of blocks) {
    const errors = []
    compile(b, { onError: e => errors.push(e.message), onWarn: () => {} })
    if (errors.length) {
      failed++
      console.error(`✗ ${file}: 编译失败\n${b}\n${errors.join('\n')}\n`)
    }
  }

  const snap = path.join(DIR, '__snapshots__', file.replace(/\.json$/, '.vue.txt'))
  if (update || !fs.existsSync(snap)) {
    fs.mkdirSync(path.dirname(snap), { recursive: true })
    fs.writeFileSync(snap, text + '\n')
  } else if (fs.readFileSync(snap, 'utf8') !== text + '\n') {
    failed++
    console.error(`✗ ${file}: 输出与快照不一致（确认改动无误后执行 node test/run-tests.mjs --update）`)
  }
  console.log(`${file}: ${blocks.length} 个片段${unmatched.length ? `，未识别：${unmatched.join('、')}` : ''}`)
}

const { components, icons } = listComponents()
console.log(`模板：${components.length} 个组件 + ${icons.length} 个图标`)
if (failed) {
  console.error(`\n${failed} 项失败`)
  process.exit(1)
}
console.log('全部通过')
