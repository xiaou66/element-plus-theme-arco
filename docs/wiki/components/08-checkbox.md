# Checkbox / CheckboxButton

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_checkbox.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_checkbox-group.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_checkbox-button.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_fill.scss`
> - 对照用例 `../../../playground/src/demos/CheckboxDemo.vue`（`#checkbox`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `el-checkbox` | Checkbox：label 不随选中变色 |
| `indeterminate` | indeterminate：居中的 6 × 2px 白色短横 |
| `size` small / large | Arco 没有尺寸：default 由内容撑开（同 Arco），large / small 保留 EP 的固定高度 36 / 28px，small 的方框和文字 12px |
| `border` | 无对应，沿用 EP |
| `el-checkbox-button` | 无对应；按 Arco 单选按钮组的样式做（实现同 RadioButton） |

## 2. 关键实现

- 方框 14px、2px fill-3 描边，hover 整个选项（不只是方框）时描边变 fill-4 并出现 24px 圆底；选中、半选、禁用时不出现。对勾按 Arco 加粗到 2px。
- 半选 + 禁用：Arco 不按选中处理，是灰底、fill-3 描边、白色短横。
- EP 的 `.el-checkbox-group` 为了消除空白设置了 `font-size: 0; line-height: 0`，label 继承后高度变成 0；`_checkbox-group.scss` 把行高放回继承，label 的行高也改为继承（Arco 是 `line-height: unset`）。
- 暗色：禁用方框的描边叠在方框自己的底色上，需要半透明填充（`dark/_fill.scss`）。

## 3. 已知差异

- 无。
