# 进度条 Progress

<p class="page-desc">对应 Arco Progress，支持线形、环形及状态颜色。 属性用法见 <a href="https://element-plus.org/zh-CN/component/progress.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 线形进度

`stroke-width="4"` 与 Arco 线宽一致，`exception` 对应 Arco danger。

::: demo progress/basic
:::

## 环形进度

环的尺寸与线宽由属性决定，状态颜色对应 Arco。

::: demo progress/circle
:::

## 与 Arco 的差异

- 默认线宽保留 Element Plus 的 6px；需要 Arco 的 4px 时传 `:stroke-width="4"`。
- 设置状态时只显示状态图标，Arco 同时显示百分比和图标。
