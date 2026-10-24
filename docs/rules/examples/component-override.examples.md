# 组件覆盖示例

以下反例都是迁移 Button / Input 时真实踩过的坑，正例是最终采用的写法。

## 1. 通用规则写在类型循环之后，盖掉了类型色

反例：

```scss
.el-button {
  @each $type in $arco-types {
    &--#{$type} {
      &.is-text { --el-button-text-color: var(--el-color-#{$type}); }
    }
  }

  // 写在循环之后，优先级同为 (0,2,0)，后出现者胜
  &.is-text { --el-button-text-color: var(--el-color-primary); }
}
```

结果：`<el-button type="success" text>` 显示成了主色蓝。

正例：通用的 `&.is-text` 放在 `@each $type` 之前，并在注释里写明顺序要求。

## 2. 覆盖选择器的嵌套层级不够

反例：

```scss
.el-input__count .el-input__count-inner { background: transparent; }
```

EP 原规则是 `.el-input .el-input__count .el-input__count-inner`（0,3,0），上面的写法（0,2,0）不生效，字数统计上留下一块白底。

正例：照 EP 源码写出同样的嵌套：

```scss
.el-input .el-input__count .el-input__count-inner { background: transparent; }
```

## 3. 写死色值，暗色下不切换

反例：

```scss
$el-disabled: (
  'bg-color': #f7f8fa,
  'text-color': #c9cdd4,
);
```

正例：

```scss
$el-disabled: (
  'bg-color': var(--el-fill-color-light),
  'text-color': var(--el-text-color-disabled),
);
```

## 4. 忽略 inset box-shadow 边框，文字起点差 2px

反例：照抄 Arco 的 `padding: 0 12px`。EP 的输入框边框是 inset box-shadow，不占位置，文字起点比 Arco 靠左 2px。

正例：`$input-padding-horizontal` 写 14px，EP 减去 1px border-width 后得到 13px，等于 Arco 的 1px 边框加 12px padding。textarea 同理写 `padding: 5px 13px`。

## 5. 想当然地去掉 loading 遮罩

反例：以为 Arco 的 loading 按钮没有遮罩，写了 `&.is-loading::before { background-color: transparent; }`。

实际：Arco 的 `index.less` 里是白色遮罩加 `opacity: 0.4`。

正例：读 `index.less` 后写 `background-color: rgba(255, 255, 255, 0.4)`。教训：伪元素、遮罩这类属性对比报告测不到，必须读源码并看截图。

## 6. 暗色下被 EP 的 html.dark 规则盖掉

反例：只在亮色覆盖里写 `.el-button.is-text { --el-button-disabled-text-color: ... }`（0,2,0）。

EP 的 `dark/css-vars.scss` 有 `html.dark .el-button { --el-button-disabled-text-color: rgba(255,255,255,.5) }`，`.dark` 也算类，优先级是 (0,2,1)，暗色下 text 按钮的禁用色变成了灰色。

正例：在 `src/dark/_button.scss` 里用 `html.dark .el-button.is-text`（0,3,1）重新声明。

## 7. 暗色下全局改成半透明文字

反例：

```scss
html.dark { --el-text-color-primary: rgba(255, 255, 255, 0.9); }
```

EP 的 tooltip 等组件把 `--el-text-color-primary` 当背景色用，背景会变成半透明。

正例：只在组件作用域内重设（`html.dark :is(.el-button, .el-input, .el-textarea) { ... }`），见 [`src/dark/_text.scss`](../../../packages/theme-arco/src/dark/_text.scss)。

## 7. 覆盖 hover 时盖掉了选中态

反例：

```scss
.el-radio .el-radio__inner:hover { border-color: var(--el-radio-input-border-color); }
```

这条规则是（0,3,0），和 EP 的 `.el-radio__input.is-checked .el-radio__inner`（0,3,0）一样，又写在后面，hover 选中的单选框时主色描边变回了灰色。

正例：排除选中和禁用：

```scss
.el-radio__input:not(.is-checked, .is-disabled) .el-radio__inner:hover { ... }
```

## 8. 尺寸循环的顺序

反例：`$sizes: (small, default, large)`，循环里 small 写 `.el-input-number--small .el-input-number__decrease`，default 写 `.el-input-number .el-input-number__decrease`。两者都是（0,2,0），default 在后面，small 的宽度被盖掉。

正例：default 放在最前，并写注释说明。

## 9. inline-block 的行框间隙

反例：只改 Skeleton 行的 `height` 和 `margin-top`，行距仍然多出 3px。EP 的 `.el-skeleton__item` 是 `inline-block`，行与行之间有行框（行高 × 字号）带来的间隙；Arco 的行是块级的 `li`。

正例：给对应的变体加 `display: block`。同类问题还有 Checkbox 的 label（父级 `.el-checkbox-group` 的 `line-height: 0`）和 Descriptions 的单元格。

## 10. 用颜色属性选择器只覆盖 EP 写死的默认值

EP 环形进度的颜色写在 SVG 的 `stroke` 属性上，默认值 `#20a0ff` 是 JS 里写死的。直接写 `.el-progress-circle__path { stroke: ... }` 会连使用者传的 `color` 一起盖掉。

正例：`.el-progress-circle__path[stroke='#20a0ff'] { stroke: var(--el-color-primary); }`，只匹配默认值。
