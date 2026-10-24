# 虚拟化选择器 SelectV2

<p class="page-desc">大数据选择沿用 Arco Select 的外观，列表使用 Element Plus 的虚拟滚动。 属性用法见 <a href="https://element-plus.org/zh-CN/component/select-v2.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 大量选项

生成 1000 个选项，通过虚拟滚动减少同时渲染的节点。

::: demo select-v2/basic client-only
:::

## 与 Arco 的差异

- 每项默认高度为 34px；传 `:item-height="36"` 可与 Arco 一致。
- 展开时键盘高亮定位到已选项，保留 Element Plus 行为。
