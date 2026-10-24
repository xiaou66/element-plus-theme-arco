# DatePicker / TimePicker / TimeSelect

> 关键文件：
>
> - 变量 `../../../packages/theme-arco/src/common/var.scss`（`$datepicker`）
> - 覆盖 `../../../packages/theme-arco/src/components/_date-picker-panel.scss`、`_time-picker.scss`
> - 对照用例 `../../../playground/src/demos/DateDemo.vue`、`TimeDemo.vue`；`playground/src/components/TimePanelHost.vue`

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| DatePicker 输入框 | DatePicker：日历图标挪到右侧（用户确认），hover 时清空按钮替换图标；文字 text-2 |
| `type="daterange"` 等范围输入框 | RangePicker：两个输入框靠左各占一半、分隔符 text-3，正在编辑的一侧 fill-2 底 |
| 日期面板 | 宽 265px，头部 41px（下方分割线、24px 圆形图标按钮），日期 24px 圆、今天下方 4px 圆点 |
| 范围面板 | 两个日期面板各 265px，范围内 primary-light-1，起止整格宽、外侧 16px 圆角 |
| 月份 / 年份面板 | MonthPicker / YearPicker：24px 胶囊、14px |
| TimePicker 面板 | TimePicker：选中项停在列顶部，每列 64px、项 32px，底部 mini 按钮 |
| TimeSelect | 就是 Select（已迁移），Arco 没有对应组件 |

## 2. 关键实现

- 单个输入框的日历图标原本是前缀，右侧 12px 是给左边文字留的；挪到右侧后去掉，图标和清空按钮的左侧间距都改成 4px、输入框右内边距 12px，两者右边缘都距右 12px，hover 时清空按钮正好替换在图标的位置（和 Arco 一样）。
- 月份 / 年份表：EP 每格写死 68px 宽，4 列比面板内容区宽，文字会跑到面板外面；改成 `table-layout: fixed`、按表格宽度平分。
- 范围输入框本身就是 `.el-input__wrapper`，外面没有 `.el-input`，拿不到 Input 的变量，单独补上；EP 的边框是 box-shadow 不占位置，Arco 是真实 1px 边框，左右内边距各多 1px。
- 日期格：范围底色画在 32px 高的日期格上（上下 4px + 24px），行间 2px；起止日期去掉 EP 的 5px 外边距。
- 范围面板：EP 用 table-cell 排左右两半，自动布局按内容最小宽度分配；改成 flex 各 50%。头部在 flex 下按 DOM 顺序会乱（EP 原来靠 float），用 `order` 排成 « ‹ 标题 › »；只有一侧有按钮时用 56px 占位让标题居中（开了 unlink-panels 时两侧都有按钮，不占位）。
- 暗色：范围底色改用 Arco 的 `--color-primary-light-1`（暗色下是半透明主色，EP 的 light-9 是合成好的不透明色）；选中日期的白字改用 `--el-color-white`。
- TimePicker：EP 是“滚轮”（选中项在中间高亮带），滚动定位用的是 `scrollTop = 序号 × 行高`，和留白无关；去掉上方留白、下方留白改成 192px，选中项就停在顶部，滚动时按顶部那一项取值。每项 32px 不能改（JS 按 li 的高度算滚动），中间 24px 的底色条画在 `::before` 上。

## 3. 已知差异

- Arco 的日期面板默认带“今天”底栏，EP 的日期面板只有日期时间类型才有底栏。
- 标题文字格式：EP 是“2026 年 10 月”，Arco 是“2026-10”。
- 月份 / 年份表 EP 是 DOM 里写死的 4 列，Arco 是 3 列；年份面板 Arco 显示 12 格（含前后各一年），EP 显示 10 格。
- 日期时间面板：EP 是日期面板顶部加日期 / 时间输入框，Arco 是日期和时间列左右并排。
- TimePicker 底部按钮 EP 是“取消 / 确定”，Arco 是“此刻 / 确定”。
