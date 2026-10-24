# 锚点 Anchor

<p class="page-desc">默认形态对应 Arco line-less，<code>type="underline"</code> 对应 Arco 默认轨道。 属性用法见 <a href="https://element-plus.org/zh-CN/component/anchor.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 无轨道锚点

默认对应 Arco line-less；点击链接滚动示例自己的容器。

::: demo anchor/basic
:::

## 轨道锚点

`type="underline"` 对应 Arco 默认轨道；滚动时标记跟随章节。

::: demo anchor/underline
:::

## 横向锚点

`direction="horizontal"` 将链接横向排列，仍定位到示例容器内。

::: demo anchor/horizontal
:::

## 与 Arco 的差异

- 宽度由外部容器决定，不固定为 Arco 的 150px。
- 点击链接保留 Element Plus 更新 URL hash 的行为。
