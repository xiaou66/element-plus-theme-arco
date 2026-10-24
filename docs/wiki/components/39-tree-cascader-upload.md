# Tree / TreeSelect / Cascader / Upload

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_tree.scss`、`_tree-select.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_cascader.scss`、`_cascader-panel.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_upload.scss`
> - 对照用例 `../../../playground/src/demos/TreeDemo.vue`（`#tree`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| Tree 默认 / `show-checkbox` | Tree 默认 / `checkable` |
| Tree `highlight-current` 的当前节点 | 选中节点（主色字，不加整行底色） |
| TreeSelect | TreeSelect：选择框和面板外壳同 Select，树同 Tree |
| Cascader / CascaderPanel | Cascader |
| Upload `drag` | Upload `draggable` |
| Upload `list-type="picture-card"` | Upload `list-type="picture-card"` |

## 2. 关键实现

- Tree：节点 32px；只有标题有 hover 底色（fill-2、2px 圆角、左右 4px，用 -4px 外边距抵消），整行不加底色；展开图标 12px、左 2px 右 10px；复选框右侧 10px，去掉复选框给 hover 圆底留的左侧空间（Arco 在树里也是这样）。
- Cascader：EP 的 Cascader 没有 `show-arrow` 属性，箭头固定显示，这里直接隐藏并把弹出距离改成 Arco 的 4px；外框用面板的 fill-3 描边（popper 默认的 border-color-light 在暗色下是合成好的不透明色）。面板连边框 200px 高，列最小 120px，选项 36px、从列顶部开始；展开路径和选中项 fill-2 底、text-1、不加粗。EP 选中的叶子节点有一个绝对定位在左侧 10px 的勾，Arco 没有，而且文字按 Arco 从 12px 开始后会和它重叠，所以隐藏（多选的复选框、`check-strictly` 的单选框不受影响）。
- Upload 拖拽区：Arco 是 content-box 的 `width: 100%` 再加 1px 边框（比容器宽 2px），按 Arco 的实际效果排；图标按 Arco 的加号缩到 14px、基线下移 2px（Arco 是行内 svg）。图片卡片 Arco 是 80px 加边框共 82px。
- Upload 文件列表：Arco 列表本身没有外边距、有文件时第一项上方 24px；EP 列表固定 `margin-top: 10px`，空列表也占位，这里改成和 Arco 一致。

## 3. 已知差异

- Tree 的 `indent` 默认 18px，写在行内样式上，Arco 每层缩进 22px（需要一致时传 `:indent="22"`）。
- EP 的 disabled 节点不带任何类，只有 `show-checkbox` 时能从禁用的复选框识别出来并显示 text-4；不带复选框时保持 EP 原样（没有禁用样式）。
- EP 展开图标旋转整个图标元素，Arco 只旋转里面的 svg，对比脚本只比较未展开的节点。
- Upload 拖拽区的图标形状不同（EP 用户自己放的图标，Arco 固定是加号）。
- 用例里 EP 的 Cascader 用 ref 打开，没有聚焦；实际点击打开时输入框也是聚焦态，两边一致。Arco 打开时不会按值展开路径，用例两侧都不带值。
