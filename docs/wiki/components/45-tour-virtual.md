# Tour / SelectV2 / TableV2 / TreeSelect / Mention

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_tour.scss`、`_select-v2.scss`、`_select-dropdown-v2.scss`、`_table-v2.scss`、`_tree-select.scss`、`_mention.scss`
> - 对照用例 `../../../playground/src/demos/TourDemo.vue`、`VirtualDemo.vue`、`TreeSelectDemo.vue`、`MiscDemo.vue`

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| Tour | Arco 没有，按 Popover 外壳（用户确认）：12px 16px、neutral-3 描边、4px 圆角，标题 16px / 500、正文 text-2；遮罩按 Arco 的 mask 色 |
| SelectV2 | 同 Select |
| TableV2 | 同 Table（颜色、单元格 16px、表头 500） |
| TreeSelect | 选择框同 Select，面板里的树同 Tree，选中节点主色字 |
| Mention | 输入框同 Input，下拉同 Select 下拉 |

## 2. 关键实现

- Tour 的遮罩：EP 默认的 `rgba(0,0,0,0.5)` 写在 SVG 路径的行内样式上，只匹配这个默认值换成 Arco 的 mask 色，用户通过 `mask` 传的颜色不受影响。
- SelectV2 复用 `.el-select__*` 的类，但按需引入时只加载 `el-select-v2.css` / `el-select-dropdown-v2.css`；在它们的覆盖里 `@use` Select、下拉、选项的覆盖（全量模式下 Sass 模块只输出一次）。虚拟列表用 6px 上下外边距，改成 4px。
- TreeSelect 的节点标题是选项元素，EP 用 `!important` 清掉了它的背景，Tree 的 hover 样式用不上；按 Arco 的块级标题重写（铺满剩余宽度、5px 4px、2px 圆角、hover fill-2），只能同样用 `!important`。
  EP 用 JS 把树宽写成选择框宽（行内样式），加上弹出层边框面板会比选择框宽 2px；树改成 `width: 100% !important` 铺满面板内部（面板本身有“最小宽度 = 选择框宽 − 2px”），和 Arco 等宽。不能用负外边距（会溢出滚动容器，hover 时出现横向滚动条），也不能用 `max-width`（百分比相对的正是被树撑开的宽度）。面板的左 10px、右 4px 加在树上（border-box）；节点去掉 2px 左边距（Arco 在 TreeSelect 里也去掉了）。
- TableV2 没有用 `--el-table-text-color`（文字色继承页面），补上，暗色下才是 Arco 的 gray-10。

## 3. 已知差异

- SelectV2 每项高度是 `item-height` 属性（默认 34px），Arco 是 36px；打开时 EP 把键盘 hover 放在选中项上。
- TableV2 的行高、表头高度是 `row-height` / `header-height` 属性（默认 50px），Arco 是 40px。
- Mention 的下拉跟着光标定位、宽度按内容，Arco 在输入框下方、和输入框等宽（两边 JS 定位方式不同）。
- TreeSelect、Mention、TimePicker 的面板在失焦时会关闭，对比脚本测量前会让焦点失焦，这几个只看截图（TimePicker 用 EP 导出的 TimePickPanel 单独渲染后可以自动对比）。
