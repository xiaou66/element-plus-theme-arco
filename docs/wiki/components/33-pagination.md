# Pagination

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_pagination.scss`
> - 对照用例 `../../../playground/src/demos/PaginationDemo.vue`（`#pagination`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| 默认 | 默认：页码 32px、左右 8px、间距 8px、text-2，hover fill-1，当前页浅主色底、主色字、不加粗 |
| `background` | Arco 没有；保留 EP 的实心形态 |
| `size` small / large | 28 / 36px，字号 14px（large 的翻页图标 14px） |

## 2. 关键实现

- 尺寸、颜色在 `$pagination` 配置；上一页 / 下一页 hover 主色 + fill-1。
- 对照用例要用 `default-current-page`：只传 `current-page` 不监听更新，EP 视为废弃用法，直接不渲染。

## 3. 已知差异

- 每页条数下拉的宽度：EP 128px，Arco 按内容。
