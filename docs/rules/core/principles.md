# 迁移原则

## 只改样式，不改组件

- 必须只通过 CSS / SCSS 改变外观，禁止修改 Element Plus 的 DOM 结构、组件逻辑或 Props 行为。
- 禁止要求使用方改写模板来配合主题（例如额外包一层元素）。确实只能靠 class 表达的状态（如 `class="is-error"`），必须在 playground 的用例 `note` 和 wiki 组件篇里写明。
- CSS 改不了的差异（图标集、JS 渲染的文本格式、组件没有的 DOM 节点）登记为已知差异，写进 [`README.md`](../../../README.md) 的“已知差异”和对应的 wiki 组件篇。

## EP 原有的配置必须继续生效

主题只改外观，不能让 EP 的任何配置失效：

- 组件的每个属性取不同值时，外观必须仍然有区别，并且符合该属性的语义。禁止把不同的取值做成一样（例如把 `size` 的三档都改成同一尺寸、把 `shadow="always"` 和 `"never"` 做成一样、把 `plain` 做成和默认一样）。
- Arco 没有对应档位或形态时，按 EP 原有的级差在 Arco 的基础上延伸（例如 Arco 只有两档尺寸，EP 的第三档按 EP 原来的档差放大或缩小），并在组件文件注释和 wiki 组件篇里写明推导方式。
- 使用者通过行内样式、CSS 变量、颜色类属性（`color`、`icon-color`、`fill`、`text-color`、`width` 等）传入的值必须优先于主题。覆盖 EP 写死的默认值时，只能匹配默认值本身（例如属性选择器 `[stroke='#20a0ff']`），不能连使用者传入的值一起盖掉。
- 覆盖某个变体时，选择器必须只命中该变体。例如只改 info 类型 light 效果的标签，要写 `.el-tag--info.el-tag--light`，不能写成 `.el-tag--info`，否则 `effect="dark"` / `"plain"` 的标签也会被改掉。
- 属性的默认值与某个显式取值相同、CSS 无法区分时（例如 `underline` 默认就是 `"hover"`），处理顺序：
  1. EP 提供了全局配置（ConfigProvider）的，保留 EP 对每个取值的原样语义，在 README 写明“要得到 Arco 外观，用 ConfigProvider 把默认值设为 xxx”；
  2. 没有全局配置的，先问用户，决定后写进 README 的已知差异。
- 每迁移一个组件，必须对照 EP 文档的属性表逐项确认：每个影响外观的属性在主题下仍然生效。用例里至少覆盖这些属性的非默认取值各一次。

## 分层与优先顺序

改动必须落在正确的层，能在上层解决的不往下层写：

1. **Token 层**：[`src/tokens/_arco.scss`](../../../packages/theme-arco/src/tokens/_arco.scss) 与 [`src/common/var.scss`](../../../packages/theme-arco/src/common/var.scss)。EP 有对应 SCSS 变量的，必须用 `@forward ... with` 配置，禁止在组件覆盖里重复写同一个值。
2. **组件覆盖层**：`src/components/_<x>.scss`。优先重设 EP 的组件变量（`--el-button-*`、`--el-input-*`），只有变量覆盖不到的属性才写具体样式。
3. **暗色层**：`src/dark/`。只放暗色下亮色覆盖无法自动生效的修正，见 [`dark-mode.md`](dark-mode.md)。

## 颜色必须引用变量

- 组件覆盖里的颜色必须引用 `--el-*` CSS 变量（`var(--el-fill-color)`、`var(--el-color-primary-light-3)`），禁止写死 hex 或 rgb。这样暗色模式和运行时换主色才能生效。
- token 层的 SCSS map 里，凡是会被 EP 原样输出为 `:root` 变量、且暗色下需要变化的值，也必须写成 CSS 变量引用。反例：把 `$disabled` 的 `bg-color` 写成 `#f7f8fa`，暗色下就不会切换。
- 例外：暗色层里预先合成的不透明色（`arco.over(...)` 的结果）可以写成具体色值，因为它本身只在 `html.dark` 下生效。

## 变体映射必须显式

EP 与 Arco 的变体不是一一对应的。映射关系（例如 `<el-button>` → Arco `secondary`，`plain` → `outline`）必须：

- 写在组件覆盖文件顶部的注释里；
- 写进 [`README.md`](../../../README.md) 的“变体映射”表；
- 在 playground 用例的 `title` / `note` 上标明。

映射存在两种合理选择时，先问用户，不自行决定。

## 禁止

- 禁止使用 `!important`，优先级问题按 [`component-override.md`](component-override.md) 的方法解决。
- 禁止修改 `node_modules` 或复制 EP 源码到仓库里改。
- 禁止手改 `src/generated/` 下的文件，它们由 `scripts/gen-arco-vars.mjs` 生成。
- 禁止为了让报告归零而修改对比脚本的判定口径，见 [`verification.md`](verification.md)。

完成标准：每处改动都能说出它在哪一层、为什么不能在更上层解决、数值来自 Arco 源码的哪个 token；EP 的每个外观属性在主题下仍然生效。
