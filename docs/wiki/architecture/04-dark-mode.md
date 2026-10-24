# 暗色主题

> 和 EP 官方用法一致：引入暗色变量文件，给 `<html>` 加 `dark` class。
> 关键文件：
>
> - Arco 暗色 token `../../../packages/theme-arco/src/tokens/_arco-dark.scss`
> - 暗色入口 `../../../packages/theme-arco/src/dark/css-vars.scss`
> - Button 暗色修正 `../../../packages/theme-arco/src/dark/_button.scss`
> - 组件内半透明文字 `../../../packages/theme-arco/src/dark/_text.scss`
> - 规则 [`dark-mode.md`](../../rules/core/dark-mode.md)

---

## 1. EP 暗色的结构

EP 的 `theme-chalk/src/dark/var.scss` 是一套独立的变量：背景、文字、填充、边框、阴影，以及状态色色阶。`dark/css-vars.scss` 把它们输出到 `html.dark { ... }` 下，另外有几条组件级规则，例如：

```scss
html.dark .el-button { --el-button-disabled-text-color: rgba(255, 255, 255, 0.5); }
```

`dark/var.scss` 依赖 `common/var.scss`（用到 `$types` 和亮色主色），所以暗色入口必须先加载我们配置过的 `common/var.scss`，再 `@use ... with` 配置暗色变量。

## 2. Arco 暗色 token

取自 Arco `arco.css` 里的 `body[arco-theme='dark']`：

- 暗色下的色板是另一套，例如 arcoblue-6 从 `#165DFF` 变成 `#3C7EFF`。
- 背景分 5 级：bg-1 `#17171A`（页面）、bg-2 `#232324`（容器）、bg-5 `#373739`（弹出层）。
- 文字、填充、状态浅色都是半透明的：text-1 是 90% 白，fill-2 是 8% 白，primary-light-1 是 `rgba(primary-6, 0.2)`。

## 3. 半透明色：沿用 EP 的合成做法

Arco 的半透明色会随着下面的底色变化；EP 则把暗色的文字、填充预先合成到容器背景上，得到不透明色。我们沿用 EP 的做法：

- 文字、填充传 Arco 原始的 rgba 值，由 EP 的 `mix-overlay-color` 合成到 `bg-color`（`#232324`）上。
- 状态色浅色阶在 `_arco-dark.scss` 里用 `over()` 合成：`light-9 = over(6 级, 0.2)` 等。

不全局改成半透明的原因：EP 有些地方把这些变量当作不透明色用。例如 tooltip 把 `--el-text-color-primary` 当背景色，表格固定列、当前行用 `light-9` 做底色来遮挡下面的内容。改成半透明会出现透底。

代价是：组件直接放在页面背景 `#17171A` 上时，填充色会比 Arco 略亮一点。

## 4. 需要暗色修正的三种情况

只要亮色覆盖引用的是 `--el-*` 变量，暗色下就会自动切换。实际迁移 Button、Input 时，下面三类情况需要额外修正：

### ① EP 的 html.dark 规则优先级更高

`html.dark .el-button` 的优先级是 (0,2,1)，`.dark` 也算一个类。它会盖掉亮色覆盖里所有 (0,2,0) 及以下的规则，例如 `.el-button.is-text` 设置的禁用色，暗色下 text 按钮的禁用文字因此变成了灰色。

修正放在 `src/dark/_button.scss`：用同优先级、写在 EP 之后的 `html.dark .el-button` 重新声明，text / link 按钮再用 (0,3,1) 的选择器单独声明。

### ② Arco 暗色用的不是同一语义的 token

- secondary 按钮的底色在暗色下是 gray-9 / 8 / 7 叠加（`$secondary`、`$secondary-hover`、`$secondary-active`），而不是 fill 色。
- 带类型按钮的 focus 环是暗色色板第 3 级，而不是半透明的 `light-5`。

### ③ 半透明色叠在组件自己的底色上

Arco 的 dashed 按钮边框是 `primary-light-2`（35%），叠在按钮自己的 `primary-light-1`（20%）底色上；EP 合成时是叠在容器背景上，结果偏暗。修正时用 `over(base, 0.35, over(base, 0.2))` 重新合成。

## 5. 组件内的半透明文字

Arco 的文字是半透明白，叠在灰色按钮、输入框上时比 EP 的合成色更亮，差距 3~12 个色阶。`src/dark/_text.scss` 只在 `.el-button`、`.el-input`、`.el-textarea` 的作用域内把 `--el-text-color-*` 换回半透明值。

注意 `--el-disabled-text-color` 在 `:root` 上已经解析成了具体值，组件内改 `--el-text-color-disabled` 影响不到它，所以要在同一作用域里单独重设。
