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
| `--glass-surface-strong`（浮层） | 白 × (a + 0.12) | `#373739` × (a + 0.12) |
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
| 普通面 | Card、Menu、Table、Collapse、Descriptions、Alert、Segmented、Tag、Splitter | 半透明填充 + 1px 描边，**不模糊**（模糊有性能代价，且普通面叠在玻璃窗口里，再模糊没有意义） |
| 输入类 | Input、Textarea、Select、InputTag、日期输入、未选中的 Checkbox / Radio、次要按钮 | 无边框、无高光，底色比普通面更透；聚焦 / 错误态保留完整描边 + 光晕 |
| 浮层 | Dialog、Drawer、MessageBox、Popper 系、Message、Notification、Tour | `--glass-surface-strong` + `backdrop-filter: blur(40px) saturate(1.6)` + 描边 + 阴影 |

### 为什么输入类没有顶部高光

设计评审时试过顶部 1px 内阴影高光（`inset 0 1px 0`），最后去掉了：它画在描边之上，聚焦态的主色描边上沿会被白色盖淡，看起来"上面突然没有了"；去掉后默认态也更干净。输入框现在只靠底色（比普通面更透）和 8px 圆角和卡片区分。

### 选项列表是圆角行

Select 下拉、Dropdown 的选项是设计稿里的圆角行：面板内边距 4、行间距 2、行圆角 4。这套几何由基础层的 `--arco-option-inset` 提供（普通模式也有，评审时要求的，见 [27-select.md](../components/27-select.md)），玻璃层只负责颜色：悬停是 `--glass-hover` 叠层，选中是 `--glass-selected` 淡底 + 主色字 + 右侧对勾。Arco 原样的通栏行会让悬停 / 选中底色顶到面板边缘，在玻璃面上显得很硬。EP 只在多选时画对勾，单选的对勾是用同一个遮罩图标补的伪元素，不改 DOM。

浮层的 `saturate(1.6)` 是评审时加的：背后只有平滑渐变时，单纯模糊几乎看不出效果，面板像一块白板；提高饱和度后背后的颜色会透出来。同时浮层面的不透明度从 a + 0.17 降到 a + 0.12（设计稿定的是 0.17，这是评审后的调整）。

### 所有弹层面板必须是同一块底

Select 下拉（含 SelectV2、TimeSelect、TreeSelect）、Dropdown、Autocomplete、Mention、Cascader、ColorPicker、TimePicker、DatePicker、Popover 的面板，底色、模糊、描边、阴影都来自 `_overlays.scss` 的同一个 `overlay` mixin（亮色 `rgba(255,255,255,.67)`、暗色 `rgba(55,55,57,.67)`，`blur(40px) saturate(1.6)`）。评审时明确要求这些面板背景尽可能一致，所以：

- 新增弹层类组件时只能挂到 `overlay` 上，禁止单独写底色；
- 内部面板（`.el-picker-panel`、`.el-cascader-panel`、`.el-color-picker-panel` 等）的底色不能再叠一层，靠 `overlay` 里把 `--el-bg-color` / `--el-bg-color-overlay` 置空来保证；
- 圆角：下拉列表类 6，带内容的面板（Cascader、ColorPicker、TreeSelect、日期 / 时间面板）8，和设计稿一致；
- 可以用 Playwright 打开各弹层，读取 `.el-popper` 的 `background-color` 和 `backdrop-filter` 比对，它们必须相同。

`_extras.scss` 是设计稿「补充」两块画板对应的实现：Autocomplete / Mention / Cascader 的圆角选项行、无底的 Tree、ColorPicker、TimePicker、Upload、Anchor、TableV2、Tabs 的 card / border-card。

### 浮层里的子面板底色必须置空

日期面板、下拉列表等自己的底色默认是 `--el-bg-color-overlay`。如果浮层面（强）再叠一层子面板的强色，alpha 叠加后接近不透明，模糊就看不出来了。`overlay` mixin 在浮层作用域内把 `--el-bg-color` / `--el-bg-color-overlay` 设为 `transparent`，由浮层自己的 `background-color` 负责。

## 6. EP 属性仍然生效

- Tooltip 的 `effect="dark"`（默认）与 `"light"` 必须有区别：`dark` 是深色玻璃（`--glass-tooltip-dark`），`light` 是浅色玻璃。设计稿里只画了浅色玻璃的 Tooltip，这是实现时按规则补的。
- 按钮圆角统一改 8，但 `round` / `circle` 和按钮组首尾圆角不动：`:not(.is-round, .is-circle):not(.el-button-group > .el-button)`。
- 次要按钮只匹配 EP 的无 type、非 plain / dashed / text / link 按钮，带 type 的按钮保持实色。
- 输入类控件（Input、Select、InputTag、InputNumber、日期输入、ColorPicker 触发块）的圆角沿用主题，和非玻璃一致（设计稿原来画的是 8，评审时要求改回去）。曾经为了画 8 而覆盖 EP 的圆角变量，会把 InputNumber 两侧按钮之间的输入区、前置 / 后置内容的"某一侧圆角为 0"盖掉；现在不再覆盖，所以规则是：玻璃层不要改输入类的圆角。
- Alert、Tag 的状态色浅色底用 `color-mix(状态色, transparent)`，各类型仍然可区分。

## 7. 验证

玻璃没有 Arco 原版可比，`pnpm shot` 不适用于它。验证分两部分：

1. **默认外观不变**：不加 `glass` class 时，四种组合的对比报告必须保持 0 差异。
2. **玻璃外观**：playground 加 `?glass=1`（可叠加 `?dark=1`）用 Playwright 截图，对照设计稿逐项看：输入框、按钮、Checkbox / Radio、Card、Table、Alert、Collapse、Dialog / Drawer、Popover / Tooltip、Message / Notification、Select 下拉、DatePicker。弹出层需要点开后截图。

## 8. 已知边界

- 浏览器不支持 `backdrop-filter` 时，浮层没有模糊，只剩半透明底色，可读性取决于背景。
- 箭头（Popover / Tooltip）是旋转 45° 的小方块。原来有一半压在面板里，半透明的底叠了两层、还多一圈白描边，和面板有色差（评审时发现并用像素取色确认：亮色下箭头 `253,252,255`、面板 `248,246,255`）。现在用 `clip-path` 只画伸出面板外的半个三角形（四个放置方向各一条，`_overlays.scss`），压在里面的色差和白线都没有了。
- 剩下的差别是平台限制：箭头在面板内部，面板自己带 `backdrop-filter`，浏览器不让它单独再做背景模糊，所以箭头透出的是没模糊的背景。亮色下肉眼看不出；深色 Tooltip 用 92% 不透明来压住（78% 时箭头肉眼可见地更深）。
- 设计稿里 Menu 在独立面板里有底色，实现里 Menu 自身是透明的（侧边栏通常已在玻璃窗口里，再叠一层会变厚）；需要面板时由使用方放进 Card 或自己的玻璃容器。
