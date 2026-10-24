# 数字输入框 InputNumber

<p class="page-desc">对应 Arco InputNumber：默认两侧按钮对应 <code>mode="button"</code>，右侧按钮对应 embed。 属性用法见 <a href="https://element-plus.org/zh-CN/component/input-number.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 两侧按钮

默认形态对应 Arco 的 `button` 模式；这里使用 `align="left"` 对齐数值。

::: demo input-number/basic
:::

## 右侧按钮

`controls-position="right"` 对应 Arco 默认 embed，悬停或聚焦时显示按钮。

::: demo input-number/right
:::

## 隐藏按钮

`:controls="false"` 对应 Arco 的 `hide-button`。

::: demo input-number/no-controls
:::

## 与 Arco 的差异

- Element Plus 默认居中；需要 Arco 的左对齐时传 `align="left"`。
- 按钮图标和键盘聚焦行为与 Arco 不同。
