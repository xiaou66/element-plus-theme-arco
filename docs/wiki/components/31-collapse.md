# Collapse

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_collapse.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_collapse-item.scss`
> - 对照用例 `../../../playground/src/demos/CollapseDemo.vue`（`#collapse`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `expand-icon-position="right"`（EP 默认） | `expand-icon-position="right"`（EP 没有全局配置，默认值保留 EP 的） |
| `expand-icon-position="left"` | Arco 默认 |

## 2. 关键实现

- 整体 border-2 描边、4px 圆角；标题栏 40px、14px、展开后 500；箭头 14px、neutral-7、距边 13px；内容区 fill-1、8px 13px（箭头一侧 34px）。
- 分割线结构照 Arco：项本身画下边框（最后一项没有），标题栏的下边框展开后才显示。

## 3. 已知差异

- 箭头图标不同（EP 线形 chevron、Arco 实心三角）。
- EP 键盘聚焦时标题变主色（Arco 没有焦点样式，保留 EP 的）。
