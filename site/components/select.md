# 选择器 Select

<p class="page-desc">对应 Arco Select：选择框使用灰底填充，默认多选标签为浅色描边。 属性用法见 <a href="https://element-plus.org/zh-CN/component/select.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础与尺寸

`size` 对应三档尺寸，点击输入框打开列表。

::: demo select/basic client-only
:::

## 多选

`multiple` 展示 Arco 风格的标签，`clearable` 支持清空。

::: demo select/multiple client-only
:::

## 分组与禁用选项

`el-option-group` 展示分组，关闭箭头后面板更接近 Arco。

::: demo select/groups client-only
:::

## 自定义标签形态

`tag-type`、`tag-effect` 在 Arco 中没有对应项，按主题的 Tag 风格延伸。

::: demo select/tag-props client-only
:::

## 与 Arco 的差异

- 展开时已选值的颜色和当前项高亮保留 Element Plus 行为。
- 多选选项右侧显示对勾，Arco 在左侧显示复选框。
- 默认箭头、`tag-type` 和 `tag-effect` 保留 Element Plus 配置语义。
