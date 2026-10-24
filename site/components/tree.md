# 树 Tree

<p class="page-desc">对应 Arco Tree，节点标题使用局部悬停背景，选中节点使用主色文字。 属性用法见 <a href="https://element-plus.org/zh-CN/component/tree.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础树

`highlight-current` 标识当前节点，`indent="22"` 对齐 Arco 缩进。

::: demo tree/basic
:::

## 复选树

`show-checkbox` 对应 Arco 的 checkable，禁用节点不能勾选。

::: demo tree/checkbox
:::

## 与 Arco 的差异

- 默认缩进为 18px，需要 Arco 的缩进时传 `:indent="22"`。
- 没有复选框的禁用节点保留 Element Plus 原始外观；展开图标形状与 Arco 不同。
