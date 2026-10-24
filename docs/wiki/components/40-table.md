# Table

> 关键文件：
>
> - 变量 `../../../packages/theme-arco/src/common/var.scss`（`$table`、`$table-padding`、`$table-cell-padding`、`$table-font-size`）
> - 覆盖 `../../../packages/theme-arco/src/components/_table.scss`、`_table-column.scss`（筛选面板）
> - 暗色 `../../../packages/theme-arco/src/dark/_table.scss`
> - 对照用例 `../../../playground/src/demos/TableDemo.vue`（`#table`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| 默认（无 `border`） | `:bordered="false"`：表头 neutral-2 底、顶部 4px 圆角，行间 neutral-3 分割线，表头下方无分割线 |
| `border` | `:bordered="{ cell: true }"`：外框 + 所有单元格边框 |
| `size` default / small / large | large（默认）/ small / Arco 没有，按 EP 的档差延伸（单元格上下 9 / 5 / 13px） |
| `stripe` | `stripe`（偶数行 fill-1） |
| 行 hover | `hoverable`（fill-1） |
| `show-summary` | 表尾（neutral-2 底） |
| `sortable` / `default-sort` | `sortable`：箭头 7×5px，排序中的表头 neutral-3、整列 fill-1 |
| `filters` | `filterable`：筛选按钮贴表头右侧、整高；面板底部两个 mini 按钮 |
| `type="selection"` | `row-selection`：勾选框居中，选中的行 fill-1（暗色 neutral-2） |
| `type="expand"` / 树形数据 | `expandable` / 树形数据：展开按钮 14px 方块、neutral-3 底 |
| `fixed` | `fixed`：Arco 的阴影 inset 6px 0 8px -3px |
| 多级表头 | `children` 列：合并的表头居中 |
| `align` / `header-align` | `align`（显式传的对齐始终按用户的） |
| `highlight-current-row` | Arco 没有，保留 EP 的浅主色 |

## 2. 关键实现

- 尺寸、内边距、字号走 EP 的 `$table-padding` / `$table-cell-padding` / `$table-font-size`。EP 的 `.cell` 左右 12px 是写死的，另外覆盖成 16px；展开列、勾选列的 `.cell` 要单独恢复成无内边距。
- 文字色是 `rgb(var(--gray-10))`，不是 text-1：亮色下两者相同，暗色下 gray-10 是不透明的 #f6f6f6。
- `border` 的外框：Arco 是容器上真实的上、左边框，单元格整体错开 1px。EP 原本用盖在单元格上的伪元素画外框，这里换成真实边框；EP 按 `clientWidth` 算列宽，不含边框，布局不受影响。
- 可排序表头 hover：在原底色上用 `background-image` 叠一层 rgba(gray-4, 0.5)，排序中的表头（neutral-3）hover 时也能保留底色。
- 排序中的整列：EP 只给表头加 `ascending` / `descending` 类，用 `.el-table:has(th:nth-child(n).ascending)` 按列序号找到同一列的单元格（生成 1～30 列）。
- 选中的行：EP 不给选中行加类，用 `tr:has(.el-checkbox.is-checked)` 识别。这条规则和排序列一样用 `:where` 压低优先级，hover、斑马纹、当前行仍然优先。
- 展开行：EP 自带 `!important` 把展开内容的 hover 背景清成透明，Arco 保持 fill-1，只能同样用 `!important` 盖回。
- 筛选面板：EP 的筛选面板偏移是 0，不跟随全局 popper 的 2px 回挪。底部按钮按 Arco 的顺序把"重置"放前面，并按 Arco 的行内基线排（距分割线 8.4px）。Arco 的筛选列表是 `<ul>`，没有重置浏览器默认的 1em 上下外边距，实际渲染出来上下各多 14px，这里照做。

## 3. 已知差异

- 图标形状不同：筛选图标 EP 是箭头、Arco 是漏斗；展开按钮里 EP 是会旋转的箭头、Arco 是 +/−。
- 空数据：EP 只显示一行文字，Arco 是 Empty 组件（图标加"暂无数据"）。需要一致时用 `#empty` 插槽放 `<el-empty>`。
- 勾选列、展开列宽度 EP 默认 48px、Arco 40px，由 JS 写在 `<col>` 上，需要一致时传 `width="40"`。
- 不设宽度的列由两边的 JS 各自分配剩余宽度。
- 多级表头：EP 有多级表头时强制带边框（`border || isGroup`），和用户显式传 `border` 分不出来，保留 EP 的边框。
- 排序中整列的底色只处理单层表头；用 `span-method` 合并了单元格的行会错位。
- 筛选生效时 EP 原本把表头文字变主色，这里改成和 Arco 一样只把图标变主色；筛选面板打开时 EP 不给触发按钮加类，没有 Arco 打开时的 neutral-4 底。
- 如果项目用了 CSS reset，Arco 筛选列表的 14px 外边距会消失，EP 一侧仍然保留。
