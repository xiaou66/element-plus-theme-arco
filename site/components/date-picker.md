# 日期选择器 DatePicker

<p class="page-desc">对应 Arco DatePicker 和 RangePicker：输入框填充式，日历图标位于右侧。 属性用法见 <a href="https://element-plus.org/zh-CN/component/date-picker.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础与尺寸

`size` 对应三档尺寸，点击输入框打开英文日期面板。

::: demo date-picker/basic client-only
:::

## 日期范围

`type="daterange"` 对应 Arco RangePicker，可分别选择起止日期。

::: demo date-picker/range client-only
:::

## 月份、年份与日期时间

`month`、`year` 和 `datetime` 对应月份、年份和日期时间选择，面板结构保留 Element Plus。

::: demo date-picker/types client-only
:::

## 内联面板

`el-date-picker-panel` 可在页面内直接选择日期。

::: demo date-picker/panel client-only
:::

## 与 Arco 的差异

- 普通日期面板没有 Arco 默认的“今天”底栏，标题格式由 Element Plus 的语言包决定。
- 月份和年份面板为四列，年份面板显示 10 年；Arco 使用三列和 12 年。
- 日期时间面板保留 Element Plus 的上下布局，Arco 为左右布局。
