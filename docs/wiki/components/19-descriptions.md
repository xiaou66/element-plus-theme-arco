# Descriptions

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_descriptions.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_descriptions-item.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_fill.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_text.scss`
> - 对照用例 `../../../playground/src/demos/DescriptionsDemo.vue`（`#descriptions`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| 无边框（标签与内容在同一格） | `layout="inline-horizontal"` |
| `border` | `bordered` |
| `size` small / default / large | small / medium / large |

## 2. 关键实现

- 标签 text-3 / 500，内容 text-1；无边框时标签右侧 4px，单元格只有浏览器默认的 1px 内边距（Arco inline 布局没设）。
- 带边框：外框和 4px 圆角画在 body 上，表格用 `border-style: hidden` 去掉单元格最外圈的边（`border-collapse` 下有效），避免和外框叠成 2px；单元格 `5px 20px`（small 3px、large 9px）。
- 标签列 `width: 1px; white-space: nowrap`，和 Arco 一样收缩到内容宽度；传了 `label-width` 时 EP 的行内宽度仍然优先。

## 3. 已知差异

- 无边框纵向布局存在主题问题：`_descriptions-item.scss` 把非 bordered 的标签与内容统一设为 `inline-block`，纵向布局的 `th` / `td` 也被命中，导致列挤在一起。文档站 `site/examples/descriptions/vertical.vue` 可复现，移出 `.vp-doc` 后仍有问题。带边框纵向布局不受影响，主题包需单独修复。
