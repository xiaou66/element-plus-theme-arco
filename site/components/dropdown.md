# 下拉菜单 Dropdown

<p class="page-desc">对应 Arco Dropdown，选项使用浅色悬停背景，默认保留 Element Plus 箭头。 属性用法见 <a href="https://element-plus.org/zh-CN/component/dropdown.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 点击菜单

点击按钮打开菜单，关闭箭头后更接近 Arco 的面板。

::: demo dropdown/basic client-only
:::

## 悬停与扩展尺寸

悬停触发的三档尺寸在 Arco 中没有对应项，按 Element Plus 级差延伸；`divided` 保留分割线。

::: demo dropdown/sizes client-only
:::

## 与 Arco 的差异

- 选项相对面板有 4px 的内边距，选项行带圆角，Arco 是通栏的行。在根元素上设置 `--arco-option-inset: 0` 可以回到 Arco 的样子（Select 下拉同理）。
- 默认箭头、分割线选项与尺寸没有 Arco 对应项，保留配置语义并按主题延伸。
- 选项保留 Element Plus 键盘聚焦行为。
