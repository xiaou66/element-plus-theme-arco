# ButtonGroup / Splitter

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_button-group.scss`、`_splitter.scss`
> - 对照用例 `../../../playground/src/demos/ButtonDemo.vue`（`#button` 的 ButtonGroup）、`SplitterDemo.vue`（`#splitter`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| ButtonGroup（默认 / type / plain） | ButtonGroup（secondary / primary / status / outline） |
| ButtonGroup `direction="vertical"` | Arco 没有，保留 EP 形态（颜色同横向） |
| Splitter | 结构保留 EP，只换颜色（用户确认的方案 A），右侧用 Arco Split 作参照 |

## 2. 关键实现

- ButtonGroup：
  - 实心按钮直接相邻、不重叠（EP 是所有按钮都重叠 1px），最后一个以外每个按钮的右边框是分隔线：secondary 用 `--color-secondary-hover`，primary / 状态色用 `-light-3`（Arco 的 -5）；左边框保持按钮自己的颜色（透明）。
  - 描边（plain）、虚线（dashed）按钮重叠 1px；EP 把相邻的左右边框改成了分隔色，这里恢复成按钮自己的边框色（变量，hover 时跟着变）。
- Splitter（方案 A）：

  | 部位 | 颜色 |
  | --- | --- |
  | 分隔线 | 默认 neutral-3，hover neutral-4，拖动中主色 |
  | lazy 预览线 | 主色、40% 透明（EP 原有的透明度） |
  | 折叠按钮 | neutral-3 底、text-1 图标，hover neutral-4 |

  暗色下 neutral 用 Arco 的暗色值（不透明灰），主色用暗色主色。

## 3. 已知差异

- Splitter 和 Arco Split 结构不同（EP 是 2px 细线 + hover 出现的折叠按钮，Arco 是带拖拽点图标的分隔条），按用户的要求只统一颜色。
