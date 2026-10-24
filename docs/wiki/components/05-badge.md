# Badge

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_badge.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_badge.scss`
> - 对照用例 `../../../playground/src/demos/BadgeDemo.vue`（`#badge`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `value` / `max` | `count` / `max-count` |
| `is-dot` | `dot` |
| `type` primary / success / warning / info / danger | 圆点 `color` arcoblue / green / orange / gray / red |

## 2. 关键实现

- 角标 20px 高（`$badge` 的 size），字重 500；外圈是 2px 的 bg-2 外扩阴影（EP 是 1px 实线边框）。
- 定位：EP 是 `right: calc(1px + size / 2)` 再 `translateX(100%)`，宽度变化时中心会漂移；改成 Arco 的“中心点在右上角内缩 2px”（`top: 2px; right: 2px; translate(50%, -50%)`）。
- 小圆点 6px。info 用 fill-4（亮色）；暗色下 Arco 用的是色板 gray-4，单独修正。

## 3. 已知差异

- 无。
