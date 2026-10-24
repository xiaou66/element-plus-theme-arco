# Avatar / AvatarGroup

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_avatar.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_avatar-group.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_white.scss`
> - 对照用例 `../../../playground/src/demos/AvatarDemo.vue`（`#avatar`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `shape` circle / square | circle / square（方形圆角 4px） |
| `size` small / default / large（24 / 40 / 56） | `:size` 同样的数值 |

## 2. 关键实现

- fill-4 底、白字、字重 500；字号和图标都是尺寸的一半（Arco 按 `size / 2` 写在行内样式上，这里用 `calc(var(--el-avatar-size) / 2)`）。
- 头像组：2px bg-2 描边，向左叠 10px。

## 3. 已知差异

- Arco 文字过长时会用 JS 缩放到头像内，EP 不会。
