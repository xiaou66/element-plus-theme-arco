# Token 映射规则

原理与推导过程见 wiki [主题分层](../../wiki/architecture/01-theming-layers.md)。本文只列必须遵守的映射口径。

## 状态色色阶（亮色）

EP 默认用“与白 / 黑混色”生成色阶，Arco 是手工调过的 10 级色板。必须按下表把 EP 用到的色阶钉到 Arco 级别上，禁止让 EP 自行混色：

| EP 色阶 | Arco 级别 | 语义 |
| --- | --- | --- |
| `base` | 6 | 主色 |
| `light-3` | 5 | hover |
| `light-4` | 4 | dashed active 边框 |
| `light-5` | 3 | disabled、focus 环 |
| `light-7` | 2 | dashed 边框 |
| `light-8` | 1 与 2 的中间值 | 描边按钮禁用边框 |
| `light-9` | 1 | 浅色背景 |
| `dark-2` | 7 | active |

`info` 没有 Arco 对应状态，用 `gray` 色板按同样的位置映射。

## 中性色

| EP 变量 | Arco token |
| --- | --- |
| `text-color` primary / regular / secondary / placeholder / disabled | text-1 / text-2 / text-3 / text-3 / text-4 |
| `fill-color` light / '' / dark / darker | fill-1 / fill-2 / fill-3 / fill-4 |
| `border-color` light / '' / dark / darker | border-1 / border-2 / border-3 / gray-5 |
| `bg-color` '' / page / overlay | 白 / gray-2 / 白 |

## 尺寸与字体

- 组件高度：EP `small / default / large` 对应 Arco `small / medium / large`，即 28 / 32 / 36px（`$common-component-size`）。Arco 的 mini（24px）没有 EP 对应项。
- 圆角：base / small 都是 2px，`round` 用 9999px 表示胶囊形。
- 字号：按钮和输入框三档都是 14px。
- 字体族使用 Arco 的 `@font-family`。

## 暗色色阶

暗色下 Arco 的浅色状态色是 `rgba(<6 级>, α)`。必须先用 `arco.over()` 合成到容器背景 `#232324` 上，得到不透明色，再赋给 EP 色阶：

| EP 色阶 | 暗色取值 |
| --- | --- |
| `base` / `light-3` / `dark-2` | 暗色色板 6 / 5 / 7 |
| `light-9` / `light-8` / `light-7` / `light-5` / `light-4` | 6 级 α = 0.2 / 0.275 / 0.35 / 0.5 / 0.65 |

文字、填充色传 Arco 原始 rgba 值，由 EP 的 `mix-overlay-color` 合成；边框是不透明的暗色灰阶，按亮色同样的位置映射。

## 修改 token 的约束

- 新增或修改 token 时，必须注明来源（Arco 的 less 变量名或 `arco.css` 里的选择器）。
- 修改全局 token 会影响所有组件，必须按 [`infrastructure-change.md`](../workflows/infrastructure-change.md) 跑完整回归。
- 禁止在 token 里引入 Arco 没有的“折中值”。EP 需要而 Arco 没有的色阶（如 `light-8`），用相邻两级的中间值，并写注释说明。

完成标准：映射表里每一项都能在 `_arco.scss` / `_arco-dark.scss` 中找到对应代码，且注释写了来源。
