# 走马灯 Carousel

<p class="page-desc">对应 Arco Carousel，默认指示器映射为圆点。 属性用法见 <a href="https://element-plus.org/zh-CN/component/carousel.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础轮播

使用纯色块展示轮播，通过箭头或指示器切换。

::: demo carousel/basic
:::

## 外部指示器

`indicator-position="outside"` 对应 Arco 的 outer。

::: demo carousel/outside
:::

## 卡片模式

`type="card"` 对应 Arco 的 card 动画场景，保留 Element Plus 的缩放计算。

::: demo carousel/card
:::

## 与 Arco 的差异

- 箭头默认悬停显示，指示器默认悬停切换，沿用 Element Plus 默认值。
- 卡片模式的位置和缩放保留 Element Plus 计算方式，与 Arco 透视效果不同。
