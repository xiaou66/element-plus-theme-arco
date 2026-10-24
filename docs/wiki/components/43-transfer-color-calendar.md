# Transfer / ColorPicker / Calendar

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_transfer.scss`、`_color-picker.scss`、`_color-picker-panel.scss`、`_calendar.scss`
> - 对照用例 `../../../playground/src/demos/TransferDemo.vue`、`ColorDemo.vue`、`CalendarDemo.vue`

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| Transfer | Transfer：面板 200 × 224、表头 40px fill-1、项 36px |
| Transfer `filterable` | `show-search` |
| ColorPicker 触发器 | ColorPicker：fill-2 底、无边框，色块无圆角、没有下拉箭头 |
| ColorPicker 面板 / ColorPickerPanel | 只换外观（手柄、圆角、阴影、预设色块），布局保留 EP |
| Calendar | Calendar 月视图：格子 100px、日期在 28px 圆里 |

## 2. 关键实现

- Transfer：
  - 边框从表头、列表、底部挪到整个面板上（Arco 的结构），面板高 2 + 40 + 182 = 224px。
  - 中间按钮是 EP 模板里写死的 `type="primary"`，不是用户配置，按 Arco 改成 secondary 圆形小按钮；用 `--color-secondary` 系列（暗色下是 gray 的半透明色）。
  - 按钮用 `column-reverse` 把“移到右边”放上面（只改视觉顺序）。
  - 面板底色透明（Arco 透出外层背景；EP 是 bg-color-overlay，暗色下更亮）。
- ColorPicker：
  - Arco 的 small 是 30 × 28（左右 4px、上下 3px），不是正方形；EP 的 1px 透明边框即使透明也占位置，去掉。
  - 色相 / 透明度滑块由 JS 按手柄的实际尺寸定位（offsetWidth / offsetHeight），换成 16px 圆形手柄不影响定位；色板光标按中心点定位，translate 跟着改成 −8px。
  - 禁用：Arco 只是没有 hover，保留 EP 色块 30% 透明度，让禁用和可用仍然有区别。
- Calendar：日期圆只加在 EP 默认渲染的那个单独的 `span` 上；整个日历加 1px 外框；星期下面的分割线由第一行格子的上边框画（不占星期格子的高度）。

## 3. 已知差异

- Transfer 计数文字 EP 是“0/3”，Arco 是“0 / 3”；搜索框图标 EP 在左、Arco 在右；空列表 EP 是文字，Arco 是 Empty。
- ColorPicker 面板：EP 的色相条竖排在色板右侧（JS 按竖直方向定位），Arco 是两根横条加预览块；EP 的底部是输入框 + “清空 / 确定”。
- Calendar：EP 按需要显示 5 或 6 行、Arco 固定 6 行；表头 EP 是按钮组，Arco 是图标 + 月 / 年切换；星期 EP 是“日 一 …”，Arco 是“周日 周一 …”（语言包文字）。
