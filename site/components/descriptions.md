# 描述列表 Descriptions

<p class="page-desc">无边框对应 Arco inline-horizontal，<code>border</code> 对应 bordered。 属性用法见 <a href="https://element-plus.org/zh-CN/component/descriptions.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础描述

标签和内容在同一格，默认无外框。

::: demo descriptions/basic
:::

## 带边框

`border` 增加单元格边框与标签背景。

::: demo descriptions/bordered
:::

## 纵向布局

`direction="vertical"` 将标签放在内容上方。

::: demo descriptions/vertical
:::

## 与 Arco 的差异

- 当前主题的无边框纵向布局存在已知问题：标签和内容会挤在一起；带边框纵向布局不受影响。该问题来自主题覆盖，待主题包单独修复。
