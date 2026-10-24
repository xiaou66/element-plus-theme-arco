# Progress

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_progress.scss`
> - 对照用例 `../../../playground/src/demos/ProgressDemo.vue`（`#progress`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `type="line"` | `type="line"` |
| `type="circle"` | `type="circle"` |
| `status` success / warning / exception | success / warning / danger |

## 2. 关键实现

- 轨道 fill-3；百分比文字 12px、text-2，与进度条间距 16px，不随状态变色。
- EP 按线宽把字号算进行内样式（`12 + 线宽 × 0.4`），改在内层 span 上写 12px；文字容器改成 flex，高度只由内层文字决定。
- 线形进度改为 `inline-flex; width: 100%`，和 Arco 的 inline-block 一样按外部行高留白。
- 环形的颜色是 SVG 的 `stroke` 属性（不是行内样式），CSS 能覆盖。EP 在 JS 里写死了默认色（`#20a0ff` 等），用属性选择器只匹配这些默认值，使用者传了 `color` 时不受影响。

## 3. 已知差异

- 线宽：EP 默认 6px、Arco 默认 4px，写在行内样式上，主题改不了（需要一致时传 `:stroke-width="4"`）。
- 有状态时 EP 只显示图标，Arco 显示百分比加图标（JS 渲染的内容）。
