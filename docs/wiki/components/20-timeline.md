# Timeline

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_timeline.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_timeline-item.scss`
> - 对照用例 `../../../playground/src/demos/TimelineDemo.vue`（`#timeline`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| 默认节点 | 默认：6px 主色实心圆点（EP 默认的浅灰节点只是默认样式，没有独立语义） |
| `type` | `dot-color`（6 级色） |
| `hollow` | `dot-type="hollow"` |
| `size="large"` | Arco 没有；按 EP 的档差（+2px）延伸为 8px |
| `icon` | 节点保留 EP 的 12 / 14px，放得下图标 |
| `timestamp`（`placement="bottom"`） | `label` |

## 2. 关键实现

- 每项最少 78px、无底部内边距；连线 1px border-2，从圆点下方开始、延伸到下一项顶部再往下 4px；内容距左 22px。
- EP 的 `mode="start"`（默认）给列表加了 40px 左内边距，Arco 没有。

## 3. 已知差异

- `placement="top"` 的时间戳 Arco 没有对应项，沿用 EP 的布局。
