// Vite 插件：把 element-plus/theme-chalk/*.css 的导入重定向到 Arco 镜像。
//
// 不管样式是从哪条链引入的（resolver 的 sideEffects、组件之间的样式依赖、手写 import），
// 只要最终请求的是 element-plus/theme-chalk/xxx.css，都会拿到 Arco 版。
//
// 用 resolve.alias 而不是 resolveId 钩子：EP 的 style/css.mjs 会被依赖预构建打进 .vite/deps，
// 预构建阶段不走插件的 resolveId，但会应用 alias。
// alias 只列出镜像里实际存在的文件，镜像缺的文件（例如 EP 升级后新增的组件）自然回落到 EP 原版。
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), 'dist')
const mirror = resolve(dist, 'theme-chalk')
const minor = (v) => v.split('.').slice(0, 2).join('.')
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function listCss(dir, base = dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = resolve(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'src' ? [] : listCss(full, base)
    return entry.name.endsWith('.css') ? [relative(base, full)] : []
  })
}

function findElementPlus(root) {
  try {
    const pkg = createRequire(resolve(root, 'package.json')).resolve('element-plus/package.json')
    return { dir: dirname(pkg), version: JSON.parse(readFileSync(pkg, 'utf8')).version }
  } catch {
    return null
  }
}

export function arcoTheme() {
  const files = listCss(mirror)

  return {
    name: 'element-plus-theme-arco',
    enforce: 'pre',

    config() {
      return {
        resolve: {
          alias: [
            {
              find: new RegExp(`^element-plus/theme-chalk/(${files.map(escape).join('|')})$`),
              replacement: `${mirror}/$1`,
            },
          ],
        },
      }
    },

    configResolved(config) {
      const ep = findElementPlus(config.root)
      if (!ep) return
      const tag = '[element-plus-theme-arco]'
      const built = JSON.parse(readFileSync(resolve(dist, 'meta.json'), 'utf8')).elementPlus
      if (minor(ep.version) !== minor(built)) {
        config.logger.warn(`${tag} 主题基于 element-plus@${built} 构建，当前安装的是 ${ep.version}，部分组件样式可能不一致`)
      }
      const chalk = resolve(ep.dir, 'theme-chalk')
      if (!existsSync(chalk)) return
      const mirrored = new Set(files)
      const missing = listCss(chalk).filter((f) => !mirrored.has(f))
      if (missing.length) {
        config.logger.warn(`${tag} 以下样式不在主题镜像中，将使用 Element Plus 原版：${missing.join(', ')}`)
      }
    },
  }
}

export default arcoTheme
