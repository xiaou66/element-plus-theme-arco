# InputTag

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_input-tag.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_fill.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_text.scss`
> - 对照用例 `../../../playground/src/demos/InputTagDemo.vue`（`#input-tag`）

---

## 1. 关键实现

- 和 Input 一样是填充式：fill-2 底、hover fill-3、聚焦白底主色边、禁用保持灰底。
- 标签在灰底里是白底（bg-2）+ fill-3 描边，聚焦后变 fill-2 底；标签间距 4px。有标签时左右内边距 4px（加 1px 边框），没有标签时文字起点 13px。
- 只改默认的 info + light 标签（`tag-type` / `tag-effect` 的其它取值沿用 Tag 的映射）；EP 的标签选择器是 `.el-input-tag__inner .el-tag`（0,2,0），覆盖时加一层外层类。
- 暗色：禁用标签的底色叠在输入框的灰底上，需要半透明填充。

## 2. 已知差异

- 关闭图标的笔画粗细不同（图标集）。
