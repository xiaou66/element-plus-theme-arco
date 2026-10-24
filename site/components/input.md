# 输入框 Input

<p class="page-desc">对应 Arco 的 Input，默认使用灰底填充，聚焦时显示主色边框。 属性用法见 <a href="https://element-plus.org/zh-CN/component/input.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础与尺寸

`size` 对应 Arco 三档尺寸，`disabled` 保留禁用态。

::: demo input/basic
:::

## 表单错误态

`el-form-item` 的 `error` 展示 Arco 风格的浅红填充错误态。

::: demo input/error
:::

## 图标与组合输入

前后缀、清除按钮、密码和附加标签沿用 Input 的填充式外观。

::: demo input/affix
:::

## 文本域与字数限制

`type="textarea"` 支持多行输入，`show-word-limit` 展示字数统计。

::: demo input/textarea
:::

## 与 Arco 的差异

- 密码可见性图标使用 Element Plus 图标。
- 字数统计的分隔空格及文本域的缩放手柄保留 Element Plus 行为。
