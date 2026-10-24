# Divider

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_divider.scss`
> - 对照用例 `../../../playground/src/demos/DividerDemo.vue`（`#divider`）

---

## 1. 变体映射

方向、文字位置与 Arco 一一对应（`content-position` ↔ `orientation`）。

## 2. 关键实现

- EP 水平线是 1px 高再加 1px 上边框（总高 2px），改成 Arco 的 0 高 + 1px 下边框。这样文字的定位原点（padding box 顶部）落在线上，`translateY(-50%)` 才居中。
- 上下 20px；文字 16px 内边距、靠边时距边缘 24px、行高 2；垂直线左右 12px。

## 3. 已知差异

- 无。
