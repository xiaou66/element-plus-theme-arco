// 打包前把仓库根目录的 README.md 和 LICENSE 复制进包目录：npm 只展示包目录里的 README。
// 复制出的文件不进 Git（见 .gitignore），以根目录的为准。
import { copyFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
for (const file of ['README.md', 'LICENSE']) copyFileSync(resolve(root, '../..', file), resolve(root, file))
