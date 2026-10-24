# 组件覆盖规则

正例和反例见 [`examples/component-override.examples.md`](../examples/component-override.examples.md)。

## 文件与命名

- 覆盖文件必须命名为 `packages/theme-arco/src/components/_<x>.scss`，`<x>` 与 EP 的 `theme-chalk/src/<x>.scss` 同名。构建脚本按这个名字把覆盖拼进镜像里的 `el-<x>.css`，名字对不上就会被静默跳过。
- 新文件必须同时在 [`src/index.scss`](../../../packages/theme-arco/src/index.scss) 里 `@use`，否则全量模式不生效。
- 一个覆盖文件只覆盖同名组件。会被其他组件复用的样式（例如表单校验失败时的输入框）可以写在被复用的组件文件里，选择器要带上外层上下文。
- 文件顶部必须写注释：对应的 Arco 组件、变体映射、Arco 的关键视觉特征。
- 按需引入时每个 `el-<x>.css` 单独加载，顺序由使用方的导入顺序决定；全量模式下所有覆盖都排在所有 EP 规则之后。两种情况必须单独处理：
  - EP 的 `<x>.scss` 用 `@use` 打包了别的组件的样式（`select`、`select-v2`、`time-select`、`time-picker`），对应的覆盖文件也要 `@use` 那些组件的覆盖，否则后加载的文件会把覆盖盖掉。
  - EP 在别的组件上重设了本组件的变量（例如 `.el-date-editor` 重设整组 `--el-input-*`），要在那个组件的覆盖里按本组件的值再设一遍。
  - 两个文件里优先级相同的规则互相覆盖（例如 Transfer 里的 `.el-checkbox__label` 和 Checkbox 的覆盖），写在后者所在的文件里，不依赖加载顺序。

## 写法

- 优先重设 EP 的组件 CSS 变量；用 `button-vars` 这类小 mixin 批量声明，保持和现有文件一致。
- 必须先读 EP 该组件的 SCSS，确认原规则的选择器和优先级，再决定覆盖选择器。不要猜。
- 覆盖选择器的优先级必须不低于 EP 原规则：
  - 优先级相同时，靠“我们的 CSS 在 EP 之后加载”取胜。全量模式和镜像构建都保证了这个顺序。
  - EP 原规则带有 `.el-input .el-input__count` 这类嵌套时，覆盖必须写出同样的嵌套。
- 同一文件里，通用规则必须写在类型 / 状态循环之前。例如 `.el-button.is-text` 的默认色要放在 `@each $type` 之前，否则会盖掉 `.el-button--success.is-text` 的类型色。
- 禁止 `!important`。

## 盒模型差异

- EP 的输入类组件用 `inset box-shadow` 画边框，不占位置；Arco 用 1px 真实边框。水平内边距必须加 1px 补偿（例如 `$input-padding-horizontal` 写 14px，EP 减去 border-width 后得到 13px，文字起点才和 Arco 的 1px 边框加 12px padding 对齐）。
- EP 的 text 按钮把边框设为 0，Arco 保留 1px 透明边框。宽度要对齐时必须补回 `border: 1px solid transparent`。
- Arco 的 focus 环是 `box-shadow: 0 0 0 0.25em`，不是 `outline`。覆盖 focus 样式时用 `box-shadow`，颜色走 `--el-button-outline-color` 之类的变量。

## 注释

- 注释用中文，解释“为什么”。例如为什么补 1px、为什么写在循环之前、为什么用这个选择器。
- 不写复述代码的注释。

完成标准：覆盖文件命名正确并已接入 `index.scss`；每条覆盖选择器的优先级都对照过 EP 源码；对比报告在四种组合下归零。
