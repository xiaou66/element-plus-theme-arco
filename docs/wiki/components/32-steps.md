# Steps

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_step.scss`
> - 对照用例 `../../../playground/src/demos/StepsDemo.vue`（`#steps`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `align-center` | `label-placement="vertical"` |
| 默认（图标在上、靠左） | Arco 没有对应项（Arco 默认是图标和标题横排，EP 的结构做不到），按 Arco token 着色 |
| status wait / process / finish / error | 同名；success 同 finish 的形态、用成功色 |
| `simple` / `direction="vertical"` | 沿用 EP 布局；simple 保留 EP 的描边小圆圈 |

## 2. 关键实现

- 图标 28px 实心圆：wait fill-2 底 text-2、process 主色底白字、finish 浅主色底主色字、error 危险色底白字。
- 连线 1px，两端与图标之间各留 12px（直接偏移连线两端，不依赖背景色）。EP 的进度线是 2px 高的行内样式盒子，用 overflow 裁成 1px。

## 3. 已知差异

- EP 的 finish 状态显示数字，Arco 显示对勾（JS 渲染）。
- 连线进度：EP 只在下一步也完成时才填满上一段（行内样式），Arco 当前步完成就填满。
- 两边的排布宽度算法不同（EP 百分比、Arco 固定 140px 内容区），位置无法逐像素对齐。
