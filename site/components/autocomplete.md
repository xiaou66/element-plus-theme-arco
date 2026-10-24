# 自动补全 Autocomplete

<p class="page-desc">对应 Arco AutoComplete：输入框沿用 Input，下拉选项使用 Arco 风格。 属性用法见 <a href="https://element-plus.org/zh-CN/component/autocomplete.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 候选建议

点击输入框展开候选项，输入内容过滤英文城市名。

<ClientOnly>

::: demo autocomplete/basic
:::

</ClientOnly>

## 与 Arco 的差异

- 默认保留 Element Plus 弹层箭头，传 `:show-arrow="false"` 更接近 Arco。
- Arco 自动高亮第一项，Element Plus 需要键盘移动。
