# 按钮 Button

<p class="page-desc">对应 Arco 的 Button：默认按钮是 Arco 的 secondary（灰底无边框），<code>plain</code> 对应 outline，<code>dashed</code> 对应 dashed，<code>text</code> 对应 text。属性用法见 <a href="https://element-plus.org/zh-CN/component/button.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础类型

默认按钮是灰底的 secondary；`plain` 是描边，`dashed` 是虚线，`text` 和 `link` 是文字按钮。

::: demo button/basic
:::

## 状态颜色

`success` / `warning` / `danger` 对应 Arco 的 status；Arco 没有 info 状态，`info` 用中性灰。

::: demo button/status
:::

## 尺寸与状态

`small` / 默认 / `large` 对应 Arco 的 small / medium / large（28 / 32 / 36px）；图标、圆角、加载和禁用。

::: demo button/size
:::

## 按钮组

实心按钮直接相邻，右边框是分隔线；描边按钮重叠 1px；只有两端有圆角。

::: demo button/group
:::

## 与 Arco 的差异

- 图标集不同：加载图标等使用 Element Plus 的图标。
- 加载中的按钮带 `disabled` 属性，不能获得焦点（Element Plus 的行为）。
- `direction="vertical"` 的按钮组 Arco 没有，保留 Element Plus 的形态。
