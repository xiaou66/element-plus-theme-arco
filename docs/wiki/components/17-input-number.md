# InputNumber

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_input-number.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_input-number.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_fill.scss`
> - 对照用例 `../../../playground/src/demos/InputNumberDemo.vue`（`#input-number`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| 默认（两侧按钮） | `mode="button"` |
| `controls-position="right"` | 默认 `mode="embed"` |
| `align` | Arco 数字靠左；EP 默认居中，需要一致时传 `align="left"` |
| `size` small / default / large | small / medium / large（28 / 32 / 36） |

## 2. 关键实现

- 两侧按钮：与输入框等高、fill-2 灰底，中间 1px border-2 分隔线；输入区夹在按钮中间（`margin: 0 <按钮宽>`），聚焦边框只包住输入区。去掉 EP hover 按钮时给输入框加主色边框的行为。
- 右侧按钮：18px 宽、距边 4px 的上下按钮，只在 hover / 聚焦时出现；未聚焦时 hover 按钮 fill-4、聚焦后 fill-3。Arco 的按钮在输入框内部，hover 按钮时输入框也处于 hover，EP 要从外层 `.el-input-number:hover` 判断。
- 尺寸规则优先级相同、靠出现顺序覆盖，`$sizes` 里 default 必须在最前。
- `:controls="false"`：输入区占满整宽（Arco `hide-button`）。
- 暗色：Arco 两侧按钮是 secondary Button 叠在 fill-2 的前后置区上；底色用半透明 fill，再用纯色渐变（`linear-gradient(c, c)`）叠一层 secondary 的颜色。

## 3. 已知差异

- EP 的按钮是不可聚焦的 span，Arco 是 button；按钮本身没有 Arco 的焦点环。
- 图标集不同（加减号、上下箭头）。
