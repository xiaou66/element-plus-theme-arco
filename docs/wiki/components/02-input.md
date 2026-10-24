# Input / Textarea

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_input.scss`
> - 尺寸与内边距 `../../../packages/theme-arco/src/common/var.scss`（`$input-padding-horizontal`、`$input-font-size`）
> - 暗色文字 `../../../packages/theme-arco/src/dark/_text.scss`
> - 对照用例 `../../../playground/src/demos/InputDemo.vue`
> - Arco 来源 `@arco-design/web-vue/es/input/style/token.less`、`textarea.less`

---

## 1. Arco 输入框的特征

| 状态 | 背景 | 边框 |
| --- | --- | --- |
| 默认 | fill-2 | 透明 |
| hover | fill-3 | 透明 |
| focus | bg-2（白） | 主色 |
| error | danger-light-1 | 透明；focus 时白底红边 |
| disabled | fill-2 | 透明，文字 text-4 |

这和 EP 的“白底灰边”完全相反。实现方式是把 `--el-input-border-color`、`--el-input-hover-border-color` 设为透明，背景色用 `--el-input-bg-color`，hover 和 focus 时再单独改 `.el-input__wrapper` 的 `background-color`。

## 2. 盒模型补偿

EP 的边框是 `.el-input__wrapper` 上的 `inset box-shadow`，不占位置；Arco 是 1px 真实边框加 12px padding。

- `$input-padding-horizontal` 三档都写 14px，EP 会减去 1px border-width，最终 13px，文字起点和 Arco 对齐。
- textarea 写 `padding: 5px 13px`、`line-height: 1.5715`，三行高度和 Arco 一致（76px）。
- 前后缀图标与输入区的间距：Arco 是 12px，EP 默认 8px，单独覆盖 `.el-input__prefix-inner > :last-child` 和 `.el-input__suffix-inner > :first-child`。

## 3. 错误态

Arco 有 `error` 属性，EP 没有。EP 的错误态来自两处：

- 放在校验失败的 `el-form-item` 里：EP 原规则是 `.el-form-item.is-error .el-form-item__content .el-input__wrapper`。
- 直接给输入框加 `class="is-error"`：这是本主题新增的选择器，方便不走表单校验的场景。

两处都改成浅红底、透明边，focus 时白底红边。

## 4. 前置 / 后置标签

Arco 的 addon 是灰底，与输入区之间只有一根分隔线。覆盖时去掉 EP 的 box-shadow 边框，改成 `border-right` / `border-left`，padding 改为 12px。

## 5. 字数统计

EP 给计数文字加了白色背景（用来遮挡溢出的输入内容），在 Arco 的灰底输入框上会露出一块白。EP 原规则是 `.el-input .el-input__count .el-input__count-inner`（0,3,0），覆盖必须写同样的嵌套，见[示例 2](../../rules/examples/component-override.examples.md)。

## 6. 已知差异

- 密码框的眼睛图标不同（图标集不同）。
- 字数统计 EP 显示 `2 / 20`，Arco 显示 `2/20`，文本由 JS 渲染。
- EP 的 textarea 默认有 resize 手柄；对照用例里 Arco 用了 `auto-size` 所以没有手柄，这不算差异，保留 EP 的行为。
