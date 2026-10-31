# 毛玻璃规则

原理见 wiki [毛玻璃主题](../../wiki/architecture/06-glass.md)。

## 放置位置

- 玻璃样式只放在 [`src/glass/`](../../../packages/theme-arco/src/glass/)，产物是 `dist/glass.css`。禁止放进 `src/components/`（会拼进每个组件的 CSS）或 `src/dark/`。
- 所有规则必须挂在 `html.glass` 下。开关是 `html.glass`，与暗色的 `html.dark` 叠加，禁止另造别的 class 或属性。
- 亮、暗两套共用一份结构：只有 `_tokens.scss` 里允许出现 `html.glass.dark`，其余文件禁止写暗色分支。
- 引入顺序固定：`index` → `dark` → `glass`。

## 颜色与 token

- 颜色必须引用 `--glass-*` 或 `--el-*` 变量，禁止写死 hex / rgb（`_tokens.scss` 里定义 token 本身除外）。
- 强调色（主色、状态色）必须来自 `--el-color-*`，需要半透明时用 `color-mix(in srgb, var(--el-color-xxx) N%, transparent)`，保证使用方改主色后玻璃模式跟着变。
- 新增 token 要在 `_tokens.scss` 里同时给出亮、暗两个取值，并在 wiki 06 的表里补一行。
- 禁止在 `html.glass` 全局把 `--el-text-color-*` 改成半透明，原因同 [`dark-mode.md`](dark-mode.md)。

## 三类面

- 普通面（Card、Table 等）只用半透明填充，**禁止**加 `backdrop-filter`。
- 浮层必须用 `_overlays.scss` 的 `overlay` mixin，子面板底色置空，禁止在浮层里再叠一层强色。
- 输入类的聚焦 / 错误态必须保留完整描边，禁止给它们加顶部高光（内阴影会盖淡描边上沿）。

## EP 属性仍然生效

- 遵守 [`principles.md`](principles.md) 的"EP 原有的配置必须继续生效"：覆盖某个变体时选择器只命中该变体；`round` / `circle`、按钮组、`shadow`、`effect` 等属性取不同值时外观仍有区别。
- 选择器优先级必须压过 `src/components/` 里的同名覆盖（`html.glass .el-x` 是 (0,2,1) 起），禁止用 `!important`。

## 验证

- 不加 `glass` class 时，四种组合的对比报告必须是 0 差异（改了构建脚本，所以按 [`infrastructure-change.md`](../workflows/infrastructure-change.md) 跑全）。
- 玻璃本身无 Arco 原版可比：用 `?glass=1`（和 `?glass=1&dark=1`）截图对照设计稿，弹出层需要点开后截图，并看过截图。

完成标准：关掉 `glass` 后默认外观零差异；开启后亮色玻璃、暗色玻璃的截图与设计稿一致。
