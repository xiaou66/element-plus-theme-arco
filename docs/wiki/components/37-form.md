# Form

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_form.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_form-item.scss`
> - 对照用例 `../../../playground/src/demos/FormDemo.vue`（`#form`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `label-position` right / left / top | 横向（右 / 左对齐）/ `layout="vertical"` |
| `inline` | `layout="inline"`：项之间 24px、下方 8px |
| `size` small / default / large | 标签行高 28 / 32 / 36px |

## 2. 关键实现

- 项间距 20px；标签 text-2、右侧 16px；错误提示 12px、danger、20px 行高，占住下方 20px（EP 是绝对定位，视觉位置相同）。
- 必填标记占 12px 宽（8px 标记 + 4px 间距）。

## 3. 已知差异

- 必填标记：EP 是文字 `*`，Arco 是 svg。
