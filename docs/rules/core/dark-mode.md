# 暗色规则

原理见 wiki [暗色主题](../../wiki/architecture/04-dark-mode.md)。

## 放置位置

- 暗色 token 放在 [`src/tokens/_arco-dark.scss`](../../../packages/theme-arco/src/tokens/_arco-dark.scss)，通过 [`src/dark/css-vars.scss`](../../../packages/theme-arco/src/dark/css-vars.scss) 配置 EP 的 `dark/var.scss`。
- 组件的暗色修正放在 `src/dark/_<x>.scss`，在 `src/dark/css-vars.scss` 里 `@use`。禁止放进 `src/components/`：那里的文件会按名字拼进对应组件的 CSS，暗色修正必须只出现在 `dark/css-vars.css` 里。
- 暗色开关是 `html.dark`，与 EP 一致。禁止改用 Arco 的 `body[arco-theme='dark']`。

## 先确认是否需要暗色修正

亮色覆盖只要引用的是 `--el-*` 变量，暗色下会自动切换。只有以下情况才写暗色修正：

1. EP 的 `dark/css-vars.scss` 里有 `html.dark .el-<x>` 规则。它的优先级是 (0,2,1)，`.dark` 也算一个类，会盖掉亮色覆盖里 (0,2,0) 以下的规则，必须在暗色层用同等或更高优先级重新声明。
2. Arco 暗色下用的不是同一语义的 token。例如 secondary 按钮在暗色下是 gray-9 / 8 / 7 叠加，focus 环是暗色色板第 3 级。
3. Arco 的半透明色叠在组件自己的底色上（例如 dashed 按钮的边框叠在按钮的浅色底上），而 EP 合成时是叠在容器背景上。这种情况必须在暗色层用 `arco.over(color, α, 实际底色)` 重新合成。

## 半透明色

- 全局的文字、填充变量必须保持 EP 的合成后不透明值。禁止在 `html.dark` 全局把 `--el-text-color-*` 改成半透明：EP 的 tooltip 等组件会把文字色当背景色用。
- 组件内部需要半透明文字时，在 [`src/dark/_text.scss`](../../../packages/theme-arco/src/dark/_text.scss) 的组件列表里加上该组件，在组件作用域内重设。
- Arco 的半透明填充叠在组件自身的另一层填充上时（按钮组的灰底上叠选中项、输入框灰底上叠标签），在 [`src/dark/_fill.scss`](../../../packages/theme-arco/src/dark/_fill.scss) 的列表里加上该组件。
- Arco 用 `--color-white`（暗色下是 90% 白）画文字或图标的组件，加进 [`src/dark/_white.scss`](../../../packages/theme-arco/src/dark/_white.scss)。不要改全局的 `--el-color-white`：Button 的白字在 Arco 里是写死的 `#fff`。
- `:root` 上已经解析成具体值的派生变量（如 `--el-disabled-text-color`）不会跟着组件作用域内的源变量变化，必须在同一作用域里单独重设。

完成标准：`pnpm shot --dark` 和 `pnpm shot --mode ondemand --dark` 归零，且看过暗色截图。
