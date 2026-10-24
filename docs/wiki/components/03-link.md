# Link

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_link.scss`
> - 对照用例 `../../../playground/src/demos/LinkDemo.vue`（`#link`）

---

## 1. 变体映射

| Element Plus | Arco | 外观 |
| --- | --- | --- |
| `<el-link>`（default） | 无对应 | 保持 EP 的 text-2 灰色文字，交互按 Arco |
| `type="primary"` | 默认 Link | link-6 主色 |
| `type="success / warning / danger"` | `status` 同名 | 6 级色 |
| `disabled` | `disabled` | 3 级色（warning 是 2 级） |

Arco 没有中性色链接，这里保留 EP 的灰色默认链接（与用户确认过）。

## 2. 关键实现

- Arco hover 不变色、不出下划线，而是出现 fill-2 灰底（active fill-3），内边距 `1px 4px`、行高 1.5715。
- `underline` 保留 EP 的语义（默认 `"hover"` 时 hover 出下划线）。CSS 区分不了默认值和显式传 `"hover"`，要和 Arco 一样 hover 不出下划线，用 `<el-config-provider :link="{ underline: 'never' }">` 把默认值改成 never。
- EP 的图标与文字间距规则 `[class*='el-icon-'] + span` 匹配不到 `.el-icon`，实际没有间距；按 Arco 补 6px。

## 3. 已知差异

- 无。
