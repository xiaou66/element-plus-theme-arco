# Autocomplete

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_autocomplete.scss`
> - 对照用例 `../../../playground/src/demos/AutocompleteDemo.vue`（`#autocomplete`）

---

## 1. 关键实现

- 输入框沿用 Input。下拉面板按 Arco Select 下拉：1px fill-3 描边、4px 圆角、shadow2；EP 默认 `show-arrow`，保留箭头（距离 10px，同带箭头的弹出层），传 `:show-arrow="false"` 时距离 4px（同 Arco）；上下 4px 内边距、最大高度 200px；选项 36px 行高、左右 12px、text-1，hover / 高亮 fill-2。
- EP 把面板宽度写在内层的行内样式上，外层的 1px 边框会让面板比输入框宽 2px；改用内阴影画描边，并给列表多留 1px，选项的 hover 底色才不会盖住描边。
- EP 的弹出距离（含箭头）是 12px，位置由 JS 写在行内样式上；用外边距按 `data-popper-placement` 往回挪（有箭头 2px，没箭头 8px）。

## 2. 已知差异

- 对比脚本不会打开下拉面板，面板是用临时脚本打开后逐项核对几何和颜色的。
- Arco 打开时会自动高亮第一项，EP 要用键盘移动后才高亮（行为差异）。
