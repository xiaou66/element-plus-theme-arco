# 表格 Table

<p class="page-desc">默认对应 Arco 无边框表格，<code>border</code> 对应带单元格边框表格。 属性用法见 <a href="https://element-plus.org/zh-CN/component/table.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础与边框

切换边框、表头和自适应宽度；点击行可查看 Arco 没有对应项的当前行高亮。

::: demo table/basic
:::

## 斑马纹、尺寸与合计

切换 `size` 查看尺寸级差，斑马纹与合计行对应 Arco 的同类场景。

::: demo table/variants
:::

## 排序、筛选与多选

点击列标题排序、筛选图标过滤城市，复选框支持多选。

::: demo table/sort-filter
:::

## 固定列与多级表头

横向滚动查看固定列，多级表头保留 Element Plus 的边框布局。

::: demo table/fixed
:::

## 与 Arco 的差异

- 筛选、展开图标使用 Element Plus 图标；空数据默认只显示文字，可用 `#empty` 放入 `el-empty`。
- 勾选与展开列默认宽 48px，需要 Arco 的宽度时显式传 `width="40"`。
- 多级表头保留 Element Plus 的强制边框；排序整列底色只适用于单层表头且没有合并单元格的表格。
- `highlight-current-row`、`cell-style`、`row-class-name`、`show-header`、`fit`、`show-overflow-tooltip` 保留 Element Plus 配置语义，Arco 没有完全对应项。
- large 尺寸按 Element Plus 级差延伸。
