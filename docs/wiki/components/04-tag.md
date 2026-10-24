# Tag / CheckTag

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_tag.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_check-tag.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_check-tag.scss`
> - 对照用例 `../../../playground/src/demos/TagDemo.vue`（`#tag`）

---

## 1. 变体映射（按颜色对应，与用户确认过）

| Element Plus | Arco |
| --- | --- |
| `type` primary / success / warning / danger | `color` arcoblue / green / orange / red |
| `type="info"` | 默认 tag（fill-2 灰底、text-1） |
| `effect="light"`（默认） | 有色 tag：浅色底、无边框 |
| `effect="plain"` | `bordered`：浅色底 + 6 级描边 |
| `effect="dark"` | 自定义色：实心 6 级底、白字 |
| `size` small / default / large | small / medium / large（20 / 24 / 32） |
| `el-check-tag` | `checkable`：未选中透明底，选中后同 light 形态；info 选中是 fill-2 |

## 2. 关键实现

- 三档内边距都是 8px，`$tag-padding` 写 9px（EP 会减去 1px 边框）；可关闭时右侧仍是 8px。
- 规则顺序 light → dark → plain：三者优先级相同（0,2,0），靠出现顺序覆盖。
- 关闭按钮：Arco 图标 12px，hover 时是比图标大 4px 的圆底；用 `box-shadow: 0 0 0 2px` 画，不改变占位。
- EP 的 Tag 挂载时有 `el-zoom-in-center` 入场动画，对比脚本会等有限时长的动画结束再测（见[对照工具](../engineering/01-playground-and-compare.md)）。
- 暗色：实心 tag 的白字是 90% 白（`dark/_white.scss`）；checkable 选中 hover 用色板第 2 级（Arco 自己的高优先级规则盖掉了它的暗色规则，见 `dark/_check-tag.scss`）。

## 3. 已知差异

- 关闭图标的笔画粗细不同（图标集）。
