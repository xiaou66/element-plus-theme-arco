# 毛玻璃主题

> 在亮色 / 暗色之上叠加 `html.glass`，得到亮色玻璃和暗色玻璃两套。
> 关键文件：
>
> - token `../../../packages/theme-arco/src/glass/_tokens.scss`
> - 普通面 `../../../packages/theme-arco/src/glass/_surfaces.scss`
> - 输入类与按钮 `../../../packages/theme-arco/src/glass/_controls.scss`
> - 浮层 `../../../packages/theme-arco/src/glass/_overlays.scss`
> - 入口与产物：`src/glass/index.scss` → `dist/glass.css`（`scripts/build.mjs`）
> - 规则 [`glass-mode.md`](../../rules/core/glass-mode.md)

---

## 1. 为什么单独一份 `glass.css`

沿用暗色的做法：亮色覆盖放在 `src/components/` 会按文件名拼进每个组件的 CSS，玻璃规则如果放进去，每个文件都要带一段不开玻璃就永远用不上的规则。所以玻璃是独立产物，所有规则挂在 `html.glass` 下：

- 不开 `glass` class，对任何组件都没有影响，全量和按需模式下默认外观不变。
- 和 `dark.css` 一样是全局单份，不走 resolver 和 `arcoTheme()` 的 alias。按需模式下直接 `import 'element-plus-theme-arco/glass'` 即可。
- 必须在 `index.css` / `dark.css` 之后引入：玻璃规则的优先级和 EP 的 `html.dark …` 规则同级（`html.glass .el-x` 是 (0,2,1)），靠顺序取胜。

## 2. 背景由应用提供

玻璃要叠在壁纸、渐变、背景图或透明窗口上才看得出来。主题只画"面"，不画背景，也不提供背景图 / 窗口透明的设置。playground 的壁纸在 `playground.css` 的 `html.glass body`，仅用于预览。

使用方可调的入口只有 `--glass-opacity`（0 ~ 1，默认 0.55），它是"普通面"的 alpha，其余面按固定比例从它派生：

| token | 亮色 | 暗色 |
| --- | --- | --- |
| `--glass-surface` | 白 × a | `#232324` × a |
| `--glass-surface-strong`（浮层） | 白 × (a + 0.17) | `#373739` × (a + 0.17) |
| `--glass-input-bg` | 白 × a × 0.65 | 白 × a × 0.09 |
| `--glass-button-bg`（次要按钮） | 白 × a | 白 × a × 0.18 |

悬停、选中、分隔线、填充是固定的色调叠层，不随 `--glass-opacity` 变；选中色用 `color-mix(var(--el-color-primary) …)`，所以使用方改主色时选中态、聚焦光晕会跟着变。

## 3. 亮色玻璃与暗色玻璃共用一份结构

只有 `_tokens.scss` 里有 `html.glass.dark` 的取值差异，其余文件不写任何暗色分支。这样亮、暗两套不会出现结构不一致，设计稿里"暗色页是亮色页复制后切换变量模式"也是同一个思路。

## 4. 把 EP 变量接到玻璃 token

`_tokens.scss` 末尾把 EP 的中性色变量整体接到玻璃 token 上（`--el-bg-color`、`--el-fill-color-*`、`--el-border-color-*`、`--el-mask-color`、`--el-box-shadow-*`）。绝大多数组件因此不用单独改；`_surfaces.scss` 只补变量覆盖不到的部分（描边、圆角、状态色浅色底的叠层）。

## 5. 三类面

| 类别 | 组件 | 做法 |
| --- | --- | --- |
| 普通面 | Card、Menu、Table、Collapse、Descriptions、Alert、Segmented、Tag | 半透明填充 + 1px 描边，**不模糊**（模糊有性能代价，且普通面叠在玻璃窗口里，再模糊没有意义） |
| 输入类 | Input、Textarea、Select、InputTag、日期输入、未选中的 Checkbox / Radio、次要按钮 | 无边框，底色比普通面更透，顶部 1px 内阴影高光；聚焦 / 错误态保留完整描边 + 光晕 |
| 浮层 | Dialog、Drawer、MessageBox、Popper 系、Message、Notification、Tour | `--glass-surface-strong` + `backdrop-filter: blur(40px)` + 描边 + 阴影 |

### 为什么聚焦 / 错误态不画高光

高光是 `inset 0 1px 0` 的内阴影，画在描边之上。聚焦态如果也带高光，主色描边的上沿会被白色盖淡，看起来"上面突然没有了"（设计评审时发现的问题）。所以只有默认 / 悬停 / 禁用态带高光。

### 浮层里的子面板底色必须置空

日期面板、下拉列表等自己的底色默认是 `--el-bg-color-overlay`。如果浮层面（强）再叠一层子面板的强色，alpha 叠加后接近不透明，模糊就看不出来了。`overlay` mixin 在浮层作用域内把 `--el-bg-color` / `--el-bg-color-overlay` 设为 `transparent`，由浮层自己的 `background-color` 负责。

## 6. EP 属性仍然生效

- Tooltip 的 `effect="dark"`（默认）与 `"light"` 必须有区别：`dark` 是深色玻璃（`--glass-tooltip-dark`），`light` 是浅色玻璃。设计稿里只画了浅色玻璃的 Tooltip，这是实现时按规则补的。
- 按钮圆角统一改 8，但 `round` / `circle` 和按钮组首尾圆角不动：`:not(.is-round, .is-circle):not(.el-button-group > .el-button)`。
- 次要按钮只匹配 EP 的无 type、非 plain / dashed / text / link 按钮，带 type 的按钮保持实色。
- Alert、Tag 的状态色浅色底用 `color-mix(状态色, transparent)`，各类型仍然可区分。

## 7. 验证

玻璃没有 Arco 原版可比，`pnpm shot` 不适用于它。验证分两部分：

1. **默认外观不变**：不加 `glass` class 时，四种组合的对比报告必须保持 0 差异。
2. **玻璃外观**：playground 加 `?glass=1`（可叠加 `?dark=1`）用 Playwright 截图，对照设计稿逐项看：输入框、按钮、Checkbox / Radio、Card、Table、Alert、Collapse、Dialog / Drawer、Popover / Tooltip、Message / Notification、Select 下拉、DatePicker。弹出层需要点开后截图。

## 8. 已知边界

- 浏览器不支持 `backdrop-filter` 时，浮层没有模糊，只剩半透明底色，可读性取决于背景。
- 箭头（Popover / Tooltip）是半透明色块，不能单独模糊，叠在浮层上沿处颜色略深。
- 设计稿里 Menu 在独立面板里有底色，实现里 Menu 自身是透明的（侧边栏通常已在玻璃窗口里，再叠一层会变厚）；需要面板时由使用方放进 Card 或自己的玻璃容器。
