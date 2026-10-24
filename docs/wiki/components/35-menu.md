# Menu

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_menu.scss`
> - 对照用例 `../../../playground/src/demos/MenuDemo.vue`（`#menu`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| 纵向（默认） | `mode="vertical"`：外层 4px 8px，项 40px、2px 圆角、间距 4px；图标 14px text-3、距文字 16px；选中 fill-2 底、主色 / 500 |
| `mode="horizontal"` | `mode="horizontal"`：外层 14px 20px、无底边线；项 30px、左右 12px；选中项底部 3px 主色条 |
| `background-color` / `text-color` / `active-text-color` | EP 写在行内 CSS 变量上，仍然优先 |

## 2. 关键实现

- 尺寸、颜色在 `$menu` 配置；禁用改为 text-4（EP 是 0.25 透明度）。
- Arco 横向菜单的第一个子元素是计算溢出用的隐藏镜像，实际渲染时每一项（包括第一项）左侧都有 12px，EP 照这个效果排。

## 3. 已知差异

- EP 的菜单项可键盘聚焦（显示 hover 样式），Arco 不可聚焦。
