# Backtop

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_backtop.scss`
> - 对照用例 `../../../playground/src/demos/BacktopDemo.vue`（`#backtop`）

---

## 1. 关键实现

- 40px 主色实心圆、白色 14px 图标，hover 变 primary-5（light-3），没有阴影。

## 2. 已知差异

- 位置：EP 的 `right` / `bottom`（默认 40px）写在行内样式上，主题改不了；Arco 默认 24px。
- 对比脚本不会滚动容器，这个用例的报告是空的；需要滚动后看截图核对。
