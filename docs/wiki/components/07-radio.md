# Radio / RadioButton

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_radio.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_radio-button.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_radio-button.scss`
> - 对照用例 `../../../playground/src/demos/RadioDemo.vue`（`#radio`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `el-radio` | Radio：label 不随选中变色 |
| `size` small / large | Arco 没有尺寸：default 由内容撑开（同 Arco），large / small 保留 EP 的固定高度 36 / 28px，small 的圆圈和文字 12px |
| `border` | 无对应，沿用 EP |
| `el-radio-button` | `type="button"`；small / default / large ↔ 组尺寸 small / medium / large |

## 2. 关键实现

- 圆圈 14px、2px 描边；hover 不改描边色，而是在圆圈后面出现 24px 的 fill-2 圆底（画在 `.el-radio__input::before` 上）；获得焦点（EP 的 `.is-focus`）时同样出现。
- 去掉 EP 的固定高度（32 / 36 / 28px），由内容撑开；表单里 `.el-form-item__content` 自带行高与垂直居中，不受影响。带边框形态保留固定高度。
- 覆盖 hover / focus 的描边时必须排除 `.is-checked` / `.is-disabled`：覆盖选择器的优先级比 EP 的选中规则高，不排除会把选中态的主色描边改回灰色。
- 未选中的禁用态：Arco 圆圈本身透明，中间是 10px 的 fill-2 圆。
- 按钮组：EP 的 `.el-radio-group` 同时用于普通 Radio，不能给它加灰底；改为每个 `.el-radio-button` 各自带一段灰底和留白（上下 3px、左右 1.5px，首尾 3px），拼成一整条。分隔线画在 `__inner::before`，hover / 选中项两侧隐藏。
- 暗色：选中 / hover 项是 fill-3 叠在 fill-2 组底色上（`dark/_fill.scss` 让组件内的填充变回半透明），禁用选中项文字是 50% 主色。

## 3. 已知差异

- Arco 组内最后一个 Radio 也有 20px 右外边距，EP 是 0；保留 EP 的行为（不影响组件本身的外观）。
- Arco 按钮组没有键盘焦点样式；这里保留一个收在按钮内侧的焦点框。
