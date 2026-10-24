# 卡片 Card

<p class="page-desc"><code>shadow="never"</code> 对应 Arco 默认卡片，<code>shadow="hover"</code> 对应 hoverable。 属性用法见 <a href="https://element-plus.org/zh-CN/component/card.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 标题与内容

使用 `shadow="never"` 展示 Arco 默认无阴影卡片。

::: demo card/basic
:::

## 阴影配置

Arco 没有三档 shadow 配置，这里保留各取值区别，悬停卡片可查看 hover 阴影。

::: demo card/shadow
:::

## 与 Arco 的差异

- Element Plus 默认 `shadow="always"`，与 Arco 默认无阴影不同；可用 ConfigProvider 的 `card.shadow = 'never'` 统一默认值。
- `footer` 没有 Arco 对应项，按标题栏的间距延伸。
