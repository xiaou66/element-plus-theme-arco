# PageHeader

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_page-header.scss`
> - 对照用例 `../../../playground/src/demos/PageHeaderDemo.vue`（`#page-header`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `content`（页面标题） | `title`：20px / 600 / text-1 |
| `title`（“返回”文字） | 无对应；按 Arco 返回按钮的颜色写成 14px text-2 |
| 分割线 | 标题与副标题之间的分割线：1 × 16px、fill-3 |

## 2. 关键实现

- 整体 `16px 20px 16px 24px` 内边距，标题行最少 30px 高。
- 返回图标 14px，hover 时出现 30px 的 fill-2 圆底，距右侧 12px。

## 3. 已知差异

- EP 的返回文字始终显示（插槽留空也会回落成默认文字 “Back”），Arco 没有。
- 返回箭头图标不同（图标集）。
