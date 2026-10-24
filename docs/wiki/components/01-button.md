# Button

> 关键文件：
>
> - 亮色覆盖 `../../../packages/theme-arco/src/components/_button.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_button.scss`
> - 对照用例 `../../../playground/src/demos/ButtonDemo.vue`
> - Arco 来源 `@arco-design/web-vue/es/button/style/token.less`、`index.less`

---

## 1. 变体映射

| Element Plus | Arco | 外观 |
| --- | --- | --- |
| `<el-button>` | `type="secondary"` | 灰底（fill-2）、无边框 |
| `type="primary"` 等 | `type="primary" status="..."` | 实色底，hover 5 级，active 7 级，disabled 3 级 |
| `type="x" plain` | `type="outline" status="x"` | 透明底、同色描边 |
| `plain`（无类型） | 无对应 | 自定：透明底、灰边，hover 变主色 |
| `dashed` | `type="dashed"` | 灰底、灰色虚线边 |
| `type="x" dashed` | `type="dashed" status="x"` | 浅色底（light-9）、浅色虚线边（light-7） |
| `text` | `type="text"` | 无类型时也是主色文字，hover 出现灰色填充 |
| `size` small / default / large | small / medium / large | 28 / 32 / 36px，字号都是 14px |
| `info` 类型 | 无对应 | 用中性灰色板 |

`plain` 映射到 `outline` 而不是 Arco 的 `secondary + status`（浅色底），是因为 EP 的 plain 语义更接近“描边按钮”。

## 2. 关键实现

### 只改变量

整个文件几乎只做一件事：按变体重设 `--el-button-*`。用一个小 mixin 批量声明：

```scss
@mixin button-vars($map) {
  @each $key, $value in $map {
    --el-button-#{$key}: #{$value};
  }
}
```

hover / active / disabled 的切换仍由 EP 的样式负责。

### 规则顺序

全部规则的优先级大多是 (0,1,0) 或 (0,2,0)，同优先级靠出现顺序决定胜负，所以文件的顺序是有意安排的：

1. `.el-button`：默认按钮 → Arco secondary。
2. `.el-button.is-plain`、`.is-dashed`：无类型的 plain / dashed。
3. `.el-button.is-text`：无类型的 text，**必须在类型循环之前**。
4. `@each $type`：`.el-button--x` 以及它的 plain / dashed / text 变体。

第 3 步最初写在循环之后，导致 `type="success" text` 显示成主色，见[示例 1](../../rules/examples/component-override.examples.md)。

### 与 Arco 的细节对齐

- 字重 400（EP 默认 500）。
- focus 环用 `box-shadow: 0 0 0 0.25em`，颜色走 `--el-button-outline-color`：带类型的用 3 级，无类型的用 border-dark（gray-4）。
- text 按钮补回 `border: 1px solid transparent`，否则宽度比 Arco 窄 2px。
- 圆形按钮 `padding: 0`，靠 flex 居中。
- small 按钮的圆角：EP 默认是 `base - 1px`，在 `var.scss` 里改成 2px。
- loading 遮罩：Arco 是白色加 `opacity: 0.4`，这里写成 `rgba(255, 255, 255, 0.4)`。

## 3. 暗色

见 [暗色主题](../architecture/04-dark-mode.md) 第 4 节，Button 是三种情况都遇到了的组件：

- EP 的 `html.dark .el-button` 盖掉禁用文字色，需要重新声明；
- secondary 底色和 focus 环在暗色下换 token；
- dashed 带状态时边框重新合成。

暗色下所有按钮的禁用文字都是 30% 白（Arco 对 primary 禁用态有一条 `body[arco-theme='dark'] .arco-btn-primary.arco-btn-disabled` 规则）。

## 4. 已知差异

- loading 图标形状不同（EP 用自己的 Loading 图标）。
- EP 的 loading 按钮带 `disabled` 属性，不能获得焦点；Arco 的可以。对照用例里该 pair 跳过了 focus 状态。
