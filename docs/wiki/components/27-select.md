# Select

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_select.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_select-dropdown.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_option.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_option-group.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_fill.scss`
> - 对照用例 `../../../playground/src/demos/SelectDemo.vue`（`#select`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| 单选 / 多选 | select-view single / multiple：填充式（同 Input） |
| 多选标签（默认 info + light） | select-view-tag：白底 fill-3 描边，聚焦后 fill-2；`tag-type` / `tag-effect` 的其它取值沿用 Tag 的映射 |
| 下拉面板 | Select 下拉：fill-3 描边、4px 圆角；选项 36px、hover fill-2、选中 text-1 / 500（EP 是主色加粗） |
| `show-arrow`（默认 true） | 保留箭头（10px）；`:show-arrow="false"` 时 4px（同 Arco） |
| `size` small / default / large | 28 / 32 / 36 |

## 2. 关键实现

- 选择框内边距 13px（Arco 1px 边框 + 12px），有标签时用 EP 的 `is-near`（-8px）得到 Arco 的 5px；下拉箭头 12px、text-2，与内容间距 12px。
- EP 的 `select.scss` 用 `@use` 引入了 select-dropdown / option / option-group，`_select.scss` 同样引入对应的覆盖，保证按需模式下无论 `el-option.css` 先还是 `el-select.css` 先加载，覆盖都排在后面。
- 标签文字改为 22px 行高（EP 是 normal，含中文时字形偏低）。
- 禁用输入框的占位符是 text-4，在 token 层 `$input-disabled` 配置（Input 同样受益）。

## 3. 已知差异

- 下拉展开时 EP 把已选值显示成占位符色、并高亮当前选中项（JS 行为）。
- 多选时 EP 在选项右侧画对勾，Arco 是左侧复选框（DOM 不同）。
