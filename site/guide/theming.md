# 主题定制

主题提供两套 CSS 变量（样式中的可复用值）：Element Plus 组件读取 `--el-*`，业务页面也可以使用 Arco 原名变量。两套变量各有职责，互不联动。

## 使用 Arco 颜色变量

全量与按需引入都会加载 `base.css` 中的 Arco 变量，无需单独导入。使用文字、容器、边框与状态变量可让业务界面跟随亮色和暗色切换。

```css
.project-card {
  color: var(--color-text-2);
  background: var(--color-bg-2);
  border: 1px solid var(--color-border-2);
}

.project-status {
  color: rgb(var(--primary-6));
  background: var(--color-primary-light-1);
}

.project-label {
  color: rgb(var(--purple-6));
  background: rgb(var(--purple-1));
}
```

色板变量如 `--primary-6`、`--purple-1` 的值是 RGB（红、绿、蓝）三元组，必须包在 `rgb()` 内；`--color-text-2` 等语义变量已经是完整颜色，可直接引用。

## 选择合适的变量

- 文字、背景、边框优先用 `--color-text-*`、`--color-bg-*`、`--color-border-*`，表达用途并自动适配暗色。
- 状态色使用 `--color-primary-light-1` 等语义变量。
- 需要具体色系时使用扩展色板，如 `--purple-1` 到 `--purple-10`。

完整名称、当前值和来源见 [设计变量](./token) 与 [全局变量](./variables)。

## Element Plus 变量的边界

Element Plus 组件只读取 `--el-*`。运行时修改 `--el-color-primary` 不会同步修改 `--primary-6`，修改 Arco 变量也不会同步重设 Element Plus 色阶。

只改主色基础值不会自动重算悬停、浅色和禁用色阶。需要覆盖这些状态时，应同时明确相关色阶，避免同一组件出现不一致的状态色。

组件的属性仍然优先表达具体需求；例如需要 Arco 默认无阴影卡片与无下划线链接，可用原生全局配置：

```vue
<template>
  <el-config-provider :card="{ shadow: 'never' }" :link="{ underline: 'never' }">
    <App />
  </el-config-provider>
</template>
```
