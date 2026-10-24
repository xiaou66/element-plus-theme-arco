# Arco 兼容变量

> 主题同时输出 Arco 的全部全局 CSS 变量（亮色 257 个），业务代码可以照 Arco 的写法取色：`rgb(var(--primary-6))`、`var(--color-text-2)`。
> 关键文件：
>
> - 生成脚本 `../../../packages/theme-arco/scripts/gen-arco-vars.mjs`
> - 生成结果 `../../../packages/theme-arco/src/generated/`
> - 接入点 `../../../packages/theme-arco/src/components/_base.scss`、`../../../packages/theme-arco/src/dark/css-vars.scss`
> - 校验脚本 `../../../scripts/verify-arco-vars.mjs`

---

## 1. 来源

Arco 的 `dist/arco.css` 只在四个块里定义全局变量：

| 选择器 | 内容 | 数量 |
| --- | --- | --- |
| `body` | 14 组色板 × 10 级，加 primary / success / warning / danger / link 的别名 | 190 |
| `body` | 语义变量：`--color-text-*`、`--color-fill-*`、`--color-bg-*`、`--color-border-*`、`--border-radius-*` 等 | 67 |
| `body[arco-theme='dark']` | 暗色色板 | 190 |
| `body[arco-theme='dark']` | 暗色语义变量 | 47 |

生成脚本按选择器提取这些声明，原样写进 SCSS 片段，只把选择器换成 `:root` 和 `html.dark`，跟随 EP 的暗色开关。提取数量异常（少于 200）时脚本直接失败，防止 Arco 改了 CSS 结构后悄悄漏变量。

## 2. 为什么不引用 `--el-*`

最初的想法是让这些变量引用对应的 `--el-*`，实际做的时候放弃了：

- Arco 的色板是 `r,g,b` 三元组（`--arcoblue-6: 22,93,255`），使用时写 `rgb(var(--arcoblue-6))`。EP 只有基色有 `-rgb` 三元组，10 级色阶无从引用。
- Arco 暗色的语义色是半透明的，EP 是合成后的不透明值，引用 EP 会和 Arco 规范对不上。
- 直接从 Arco 生成能保证 1:1 一致，升级 Arco 时 `pnpm build` 会自动重新生成。

## 3. 与 EP 变量的关系

两套变量互相独立：EP 组件只读 `--el-*`，Arco 变量只给业务代码用。

- 运行时改 `--el-color-primary` 不会影响 `--primary-6`，反过来也一样。换主色需要两边都改。
- 两套变量名不冲突（EP 都带 `el-` 前缀）。
- 如果项目同时引入了 Arco 组件库，Arco 在 `body` 上定义的同名变量会覆盖我们在 `:root` 上的定义，但两者的值相同。

## 4. 接入位置

- 亮色变量通过 `src/components/_base.scss` 拼进 `base.css`。按需引入时每个组件的样式链都依赖 `base.css`，所以一定会被加载，不需要额外 import。全量入口 `index.scss` 同样引入。
- 暗色变量在 `src/dark/css-vars.scss` 里引入，输出到 `dark/css-vars.css`。

## 5. 校验

`pnpm verify:vars` 开两个隔离页面：一个只加载 Arco 原版 CSS，一个只加载本主题的 `dist/index.css` 和 `dist/dark.css`。脚本在亮色和暗色下逐个读取每个变量解析后的值并比较，当前结果是 257 个变量全部一致、没有缺失。
