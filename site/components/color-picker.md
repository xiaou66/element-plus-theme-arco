# 颜色选择器 ColorPicker

<p class="page-desc">对应 Arco ColorPicker 的触发器配色，面板保留 Element Plus 布局。 属性用法见 <a href="https://element-plus.org/zh-CN/component/color-picker.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 触发器与尺寸

点击色块打开面板，`size` 提供三档尺寸。

::: demo color-picker/basic client-only
:::

## 透明度与内联面板

`el-color-picker-panel` 可在页面内直接展示透明度和预设色。

::: demo color-picker/panel client-only
:::

## 与 Arco 的差异

- 色相条竖排，底部为颜色输入框和 Clear / Confirm，与 Arco 面板布局不同。
- 禁用时保留 Element Plus 色块透明度以区分状态。
