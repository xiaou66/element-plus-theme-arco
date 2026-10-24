# Dropdown

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_dropdown.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_fill.scss`
> - 对照用例 `../../../playground/src/demos/DropdownDemo.vue`（`#dropdown`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `el-dropdown-item` | doption：36px 行高、左右 12px、text-1，hover fill-2（EP 是浅主色） |
| `show-arrow`（默认 true） | 保留箭头（与用户确认），距离 10px；`:show-arrow="false"` 时 4px（同 Arco） |
| `size` large / small | Arco 没有；按 EP 的档差延伸（40 / 28px 行高，左右 16 / 8px） |
| `divided` | Arco 没有分割线选项，保留 EP 的，颜色改为 fill-3 |

## 2. 关键实现

- EP 的 `.el-dropdown-menu` 规则写在 `dropdown.scss` 里（`dropdown-menu.scss` 是空的），覆盖也放在 `_dropdown.scss`，保证按需模式下排在 EP 规则之后。
- 用 `:not(:has(> .el-popper__arrow))` 判断有没有箭头，决定挪回 2px 还是 8px。
- 暗色：描边和禁用文字是半透明色叠在弹出层底色上（`dark/_fill.scss`、`_text.scss`）。

## 3. 已知差异

- EP 的选项可以键盘聚焦，Arco 不能（对照用例不比较 focus）。
