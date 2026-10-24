# 链接 Link

<p class="page-desc">对应 Arco 的 Link：默认保留 Element Plus 的灰色链接，<code>type="primary"</code> 对应 Arco 默认主色链接。 属性用法见 <a href="https://element-plus.org/zh-CN/component/link.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础类型

默认灰色与主色、状态色链接；悬停时显示 Arco 风格的浅色背景。

::: demo link/basic
:::

## 禁用与图标

`disabled` 禁止交互，`icon` 使用 Element Plus 图标。

::: demo link/disabled
:::

## 下划线

Arco 没有下划线配置，这里保留 Element Plus 的 `hover`、`always` 和 `never` 语义。

::: demo link/underline
:::

## 与 Arco 的差异

- 默认链接为灰色；使用 `type="primary"` 得到 Arco 的默认主色链接。
- `underline` 保留 Element Plus 语义；要统一关闭下划线，可用 ConfigProvider 的 `link.underline = 'never'`。
