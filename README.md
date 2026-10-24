<p align="center">
  <img src="site/public/logo.svg" alt="element-plus-theme-arco" width="120">
</p>

<h1 align="center">element-plus-theme-arco</h1>

<p align="center">给 Element Plus 套上 Arco Design 的视觉风格。</p>

```
packages/theme-arco/
  src/tokens/_arco.scss    Arco 原始色板，以及映射到 EP 变量结构的 token
  src/common/var.scss      用 token 配置 EP 的 SCSS 变量（@forward ... with）
  src/components/_<x>.scss 逐组件覆盖，文件名与 EP 的 theme-chalk/src/<x>.scss 对应
  src/index.scss           全量入口（开发时 playground 直接编译它，有 HMR）
  src/generated/           Arco 全局 CSS 变量（由 scripts/gen-arco-vars.mjs 从 Arco 的 arco.css 生成）
  scripts/build.mjs        构建 dist/
  vite.mjs                 Vite 插件 arcoTheme()
playground/              左右对照页：左边 EP + 主题，右边 Arco 原版
scripts/screenshot.mjs   截图并生成样式差异报告
```

构建产物：

```
dist/index.css           全量样式
dist/dark.css            暗色变量（Arco 暗色 token）
dist/theme-chalk/        与 element-plus/theme-chalk 同名同结构的镜像（121 个文件 + dark/css-vars.css）
                         每个文件 = EP 该组件样式（用 Arco token 编译）+ 我们的组件覆盖
dist/meta.json           镜像基于的 element-plus 版本
```

## 开发

```bash
pnpm install
pnpm dev              # 全量模式 http://localhost:5180 ，加 ?theme=raw 切回 EP 原版
pnpm dev:ondemand     # 按需模式 http://localhost:5181 ，先构建镜像，再按用户的真实用法跑
pnpm shot             # 全量模式截图对比，结果在 .compare/report.md
pnpm shot:ondemand    # 按需模式截图对比，结果在 .compare-ondemand/report.md
pnpm shot --dark      # 暗色对比（可与 --mode ondemand 组合），结果目录加 -dark 后缀
pnpm shot:all         # 构建后并行跑四种组合和变量校验，输出汇总（可跟 demo 名只跑部分）
pnpm build            # 构建 packages/theme-arco/dist
pnpm verify:vars      # 校验 Arco 兼容变量与 Arco 原版一致（需先 build）
pnpm site:dev         # 本地预览文档站
pnpm site:build       # 构建文档站
pnpm site:check       # 检查文档站页面（需先构建并启动生产 preview）
```

迁移规范和原理文档：[`docs/rules/`](docs/rules/README.md)（必须遵守的约束与流程）、[`docs/wiki/`](docs/wiki/README.md)（原理、决策、组件记录与排障）。

新增一个组件的流程：

1. 在 `playground/src/demos/` 写对照用例，两侧成对的元素用相同的 `data-pair` 包起来。
2. 新建 `packages/theme-arco/src/components/_<x>.scss`，`<x>` 要和 EP 的 `theme-chalk/src/<x>.scss` 同名（构建时据此拼进 `el-<x>.css`），并在 `src/index.scss` 里引入。
3. 反复执行 `pnpm shot`，直到报告里没有差异，再看一遍截图确认。
4. 如果组件在暗色下有需要单独修正的地方，写在 `src/dark/` 里（EP 的 `html.dark .el-xxx` 规则优先级是 (0,2,1)，比亮色覆盖高）。
5. 发布前跑一遍四种组合：`pnpm shot:all`（等同于构建后并行跑 `pnpm shot`、`pnpm shot --dark`、`pnpm shot --mode ondemand`、`pnpm shot --mode ondemand --dark` 和 `pnpm verify:vars`）。

## 使用

### 全量引入

```ts
import 'element-plus-theme-arco' // 替换掉 element-plus/dist/index.css
```

### 按需引入（Vite）

原有的 resolver 配置不用动，加一个插件就行：

```ts
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { arcoTheme } from 'element-plus-theme-arco/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [ElementPlusResolver()] }),
    arcoTheme(),
  ],
})
```

插件会把 `element-plus/theme-chalk/*.css` 的导入重定向到 Arco 镜像。所以不管样式是 resolver 引入的、组件之间间接引入的（例如 Popconfirm 会引入 Button 的样式），还是手写 `import 'element-plus/theme-chalk/el-message.css'`，拿到的都是 Arco 版。

- 镜像里没有的文件会回落到 EP 原版，启动时会给出警告。
- 安装的 element-plus 和主题构建时的版本不在同一个 minor 时也会警告。
- 只支持 resolver 默认的 `importStyle: 'css'`；`'sass'` 模式走的是 `theme-chalk/src/*.scss`，目前不会被重定向。

### 暗色主题

和 Element Plus 官方用法一样：引入暗色变量，然后给 `<html>` 加上 `dark` class。

```ts
// 全量
import 'element-plus-theme-arco'
import 'element-plus-theme-arco/dark'

// 按需（arcoTheme() 会把这行重定向到 Arco 版）
import 'element-plus/theme-chalk/dark/css-vars.css'
```

```ts
document.documentElement.classList.toggle('dark', isDark)
```

暗色 token 取自 Arco 的 `body[arco-theme='dark']`。Arco 暗色里的填充色、文字色是半透明的，这里沿用 EP 的做法，合成到容器背景 `#232324` 上变成不透明色。只有 Button、Input 内部的文字保留半透明，这样叠在灰色底上和 Arco 一致。

### 使用 Arco 的颜色变量

主题会同时输出 Arco 的全部全局 CSS 变量，名字和值与 Arco 完全一致，业务代码可以直接按 Arco 的写法取色。暗色下随 `html.dark` 一起切换。

```css
.card {
  color: var(--color-text-2);
  background: var(--color-bg-2);
  border: 1px solid var(--color-border-2);
}
.tag {
  color: rgb(var(--primary-6));
  background: var(--color-primary-light-1);
}
.badge {
  /* 扩展色板：red / orangered / orange / gold / yellow / lime / green / cyan / blue / arcoblue / purple / pinkpurple / magenta / gray，各 1~10 级 */
  background: rgb(var(--purple-1));
  color: rgb(var(--purple-6));
}
```

- 色板变量（如 `--arcoblue-6`、`--primary-6`）是 `r,g,b` 三元组，要写成 `rgb(var(--x))`，和 Arco 一致。
- 这些变量写在 `base.css` 里，全量引入和按需引入都会带上，不需要额外 import。
- 和 `--el-*` 是两套变量：EP 组件只读 `--el-*`。运行时改 `--el-color-primary` 不会影响 `--primary-6`，反过来也一样。
- Sass 用户也可以直接用色板：`@use 'element-plus-theme-arco/src/tokens/arco' as arco;`，然后写 `arco.shade('arcoblue', 6)`。

### webpack / Rspack（未实测）

```js
resolve: {
  alias: { 'element-plus/theme-chalk': 'element-plus-theme-arco/theme-chalk' },
}
```

注意这样写没有回落：EP 新增了镜像里没有的样式文件时会直接报找不到模块。

## 已迁移的组件

Button、Input / Textarea、Link、Tag / CheckTag、Badge、Divider、Radio / RadioButton、Checkbox / CheckboxButton、Switch、Alert、Card、Avatar / AvatarGroup、Breadcrumb、Progress、Skeleton、Statistic、InputNumber、InputTag、Autocomplete、Descriptions、Timeline、PageHeader、Text、Backtop、
Tooltip / Popover / Popconfirm、Dropdown、Select、Message、Notification、Dialog、Drawer、MessageBox、Tabs、Collapse、Steps、Pagination、Slider、Rate、Menu、Empty、Result、Loading、Form、InputOtp、Scrollbar、Mention、Tree / TreeSelect、Cascader、Upload、Table / TableV2、SelectV2、Segmented、Anchor、Image / ImageViewer、Carousel、Transfer、ColorPicker、Calendar、DatePicker、TimePicker、TimeSelect、Tour、ButtonGroup、Splitter。

EP 原有的所有配置在主题下都继续生效。默认值和 Arco 不同、又无法用 CSS 区分的几处，可以用 ConfigProvider 改成 Arco 的外观：

```vue
<el-config-provider :card="{ shadow: 'never' }" :link="{ underline: 'never' }">
  <App />
</el-config-provider>
```

每个组件的映射细节和实现说明见 [`docs/wiki/components/`](docs/wiki/README.md#components--组件迁移记录)。

## 变体映射

| Element Plus | Arco |
|---|---|
| `<el-button>` | `type="secondary"` |
| `<el-button type="primary">` | `type="primary"` |
| `<el-button type="x" plain>` | `type="outline" status="x"` |
| `<el-button dashed>` | `type="dashed"` |
| `<el-button text>` | `type="text"`（无类型时也是主色） |
| 组件 `size` small / default / large | small / medium / large（28 / 32 / 36） |
| `info` 类型（Button 等） | Arco 没有这个状态，用中性灰 |
| `<el-input class="is-error">` 或校验失败的 form-item | `error` |
| `<el-link>`（默认） | Arco 没有中性色链接，保持灰色文字，交互按 Arco |
| `<el-link type="primary">` | 默认 Link |
| `<el-tag type>` primary / success / warning / danger / info | `color` arcoblue / green / orange / red / 默认灰色 tag |
| `<el-tag effect>` light / plain / dark | 有色 tag / `bordered` / 自定义实心色 |
| `<el-check-tag>` | Tag `checkable` |
| `<el-badge type>` | 圆点 `color`（info → gray） |
| `<el-radio-button>` | Radio `type="button"` |
| `<el-checkbox-button>` | Arco 没有，按单选按钮组的样式做 |
| `<el-switch>` default / small / large | default / small / Arco 没有 large，按 EP 的档差延伸 |
| `<el-switch inline-prompt>` | `checked-text` / `unchecked-text` |
| `<el-alert type>` primary / info | Arco `info`（蓝）/ `normal`（灰） |
| `<el-alert description>` | 带 `title` 的形态 |
| `<el-card shadow>` never / hover / always | 默认（无阴影）/ `hoverable` / 一直有阴影（Arco 无） |
| `<el-input-number>` 默认 / `controls-position="right"` | `mode="button"` / 默认 `embed` |
| `<el-descriptions>` 无边框 / `border` | `layout="inline-horizontal"` / `bordered` |
| `<el-timeline-item>` 默认 / `type` / `hollow` | 默认主色圆点 / `dot-color` / `dot-type="hollow"` |
| `<el-page-header content>` | `title` |
| `<el-text>` 默认 | Typography.Text 默认（text-1） |
| `<el-tooltip>` / `<el-popover>` / `<el-popconfirm>` | Tooltip / Popover / Popconfirm（Popconfirm 的取消按钮保留 EP 的文字按钮） |
| `<el-dropdown>` / `<el-select>` / `<el-autocomplete>` 的下拉面板 | Select 下拉；EP 默认 `show-arrow` 保留箭头，`:show-arrow="false"` 与 Arco 一致 |
| `<el-dialog>` 默认 / `center` | Modal `title-align="start"` / 居中 |
| `ElMessageBox` `center: true` | `Modal.confirm`（simple 形态） |
| `<el-tabs>` 默认 / `card` | line / card（`border-card` Arco 无） |
| `<el-collapse>` 默认（箭头在右）/ `expand-icon-position="left"` | `expand-icon-position="right"` / 默认 |
| `<el-steps align-center>` | `label-placement="vertical"` |
| `<el-menu>` 纵向 / 横向 | `mode="vertical"` / `mode="horizontal"` |
| `<el-input-otp type="filled">` | VerificationCode |
| `<el-tree show-checkbox>` / `highlight-current` | `checkable` / 选中节点 |
| `<el-cascader>` | Cascader（EP 的面板箭头隐藏，距离 4px） |
| `<el-upload drag>` / `list-type="picture-card"` | `draggable` / `list-type="picture-card"` |
| `<el-table>` 默认 / `border` | `:bordered="false"` / `:bordered="{ cell: true }"` |
| `<el-table size>` default / small / large | large（默认）/ small / Arco 没有，按 EP 的档差延伸 |
| `<el-segmented>` | Arco 没有，保留 EP 结构，只换圆角和字号 |
| `<el-anchor>` 默认 / `type="underline"` | `line-less` / 默认 |
| `<el-carousel>` 默认指示器 | 默认 `dot` 圆点 |
| `<el-date-picker>` / `<el-time-picker>` | 图标在右侧（Arco 的 suffix） |
| `<el-tour>` | Arco 没有，按 Popover 外壳 |
| `<el-button-group>` | ButtonGroup：实心按钮直接相邻、右边框分隔线；描边按钮重叠 1px |
| `<el-splitter>` | 结构保留 EP，颜色按 Arco（neutral-3 分隔线，hover neutral-4，拖动中主色） |

## 已知差异（CSS 改不了的部分）

- 图标集不同：比如密码框的眼睛图标、loading 图标、Tag / InputTag 的关闭图标、Alert 的状态图标、PageHeader 的返回箭头。
- 字数统计 EP 显示为 `2 / 20`，Arco 显示为 `2/20`。文本是 JS 渲染的，CSS 改不了。
- EP 的 loading 按钮带 `disabled` 属性，不能获得焦点。
- 暗色下的填充色按容器背景 `#232324` 合成。如果把组件直接放在页面背景 `#17171A` 上，会比 Arco 略亮一点（Arco 的半透明色会跟着底色变）。
- Progress：线宽 EP 默认 6px、Arco 默认 4px，写在行内样式上（需要一致时传 `:stroke-width="4"`）；有状态时 EP 只显示图标，Arco 显示百分比加图标。
- InputNumber：EP 默认文字居中、Arco 靠左（需要一致时传 `align="left"`）；EP 的加减按钮不可聚焦，没有 Arco 的焦点环。
- Anchor：Arco 自带 `width: 150px`，EP 填满容器（宽度属于布局，不强加）。
- DatePicker / TimePicker：月份 / 年份表 EP 是 4 列、Arco 是 3 列；Arco 日期面板默认带“今天”底栏；EP 的色相条（ColorPicker）、日期时间面板的布局保留 EP 的结构。
- SelectV2 / TableV2：每项高度、行高是属性（默认 34px / 50px），需要一致时传 36 / 40。
- Table：筛选图标、展开图标形状不同；空数据 EP 只有文字（用 `#empty` 插槽放 `<el-empty>` 可以一致）；勾选列、展开列宽度 EP 默认 48px、Arco 40px（需要一致时传 `width="40"`）；多级表头时 EP 强制带边框。
- Tree：缩进 EP 默认 18px、Arco 22px，写在行内样式上（需要一致时传 `:indent="22"`）；不带复选框时 EP 的禁用节点没有可识别的类，保持 EP 原样。
- Backtop：EP 的 `right` / `bottom` 默认 40px，写在行内样式上；Arco 默认 24px。
- PageHeader：EP 始终显示“返回”文字和分割线，Arco 没有。
- Avatar：Arco 文字过长时会用 JS 缩放，EP 不会。
- Autocomplete：Arco 打开时自动高亮第一项，EP 要用键盘移动后才高亮。
- Select：下拉展开时 EP 把已选值显示成占位符色并高亮当前选中项；多选时 EP 在选项右侧画对勾，Arco 是左侧复选框。
- Popover：EP 默认宽度 150px（行内样式），需要一致时传 `width="auto"`。
- Steps：EP 的结构是图标在上、标题在下，Arco 默认横排（EP 的 `align-center` 对应 Arco `label-placement="vertical"`）；EP 已完成步骤显示数字、Arco 显示对勾；连线进度由 JS 计算。
- Drawer：EP 默认宽度 30%、Arco 250px（行内样式）。
- MessageBox：EP 默认显示关闭按钮，Arco simple 形态没有。
- InputOtp：Arco 撑满容器、格子平均分布，EP 是固定间距。
- Rate：未选中的星星 EP 是描边、Arco 是实心（可用 `void-icon` 换成实心）。
- Collapse / Menu / Dropdown：EP 的标题栏 / 菜单项可以键盘聚焦并显示焦点样式，Arco 不可聚焦，保留 EP 的。
