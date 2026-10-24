# 计划：补齐文档站的组件页和指南页

> 执行者先读：`AGENTS.md` → `docs/rules/README.md`（本任务的主工作流是 `docs/rules/workflows/site-component-page.md`，公共规则读 `core/principles.md`）。本计划只写“这次要做什么、按什么顺序、每个组件要注意什么”，通用约束以工作流为准，冲突时以工作流为准。

## 执行进度（2026-10-24）

- [x] 阶段 0：准备检查工具，Button 八种组合验证（生产构建通过，8/8 无错误、无空示例，切换正常；截图已查看）
- [x] 阶段 1：通用与布局组件（4 页双语、10 个示例；生产构建通过，32/32 组合无错误、无空示例，切换正常；截图已查看）
- [x] 阶段 2：文本输入与选择组件（10 页双语、22 个示例；生产构建通过，80/80 组合无错误、无空示例，切换与导航正常；12 次弹层交互通过，截图已查看）
- [x] 阶段 3：其他数据输入组件（13 页双语、28 个示例；生产构建通过，104/104 组合无错误，日期与滑块修正后 16/16 复验通过；12 次交互检查通过，截图已查看）
- [x] 阶段 4：数据展示组件（20 页双语、40 个示例；生产构建通过，160/160 组合通过，样式重置后 48/48 复验通过；14 次交互通过，截图已查看；Descriptions 主题问题已登记）
- [x] 阶段 5：反馈组件（8 页双语、14 个示例；生产构建通过，64/64 组合通过，14 次亮暗交互通过；截图已查看）
- [x] 阶段 6：导航与其他组件（11 页双语、27 个示例；生产构建通过，88/88 组合通过，Steps 初始状态修正后 8/8 复验通过；14 次亮暗交互通过，截图已查看）
- [x] 阶段 7：指南页与入口（3 页双语；生产构建通过，24/24 组合通过；双语首页入口、指南目录与亮暗截图已复核）
- [x] 阶段 8：全量验收、知识库和命令同步、服务清理（用户授权的变量表最小修复通过；最终生产构建通过，576/576 组合 0 错误、0 空示例，切换正常；搜索、截图与变量值刷新已复核，服务已停止）

本次仅在用户授权后提交或推送；逐阶段记录验证结果。

已确认的执行修正：

- 暗色主色依据主题源码验证为 `rgb(60, 126, 255)`，不使用亮色值误判。
- 每次生产构建前停掉 preview，构建后重启，避免预览服务缓存旧构建资源。
- Autocomplete、Mention、Select、SelectV2、Cascader、TreeSelect 的生产页面存在服务端与客户端渲染不一致；在 Markdown 页面层用 `ClientOnly` 隔离，示例源码保持正常 Vue 写法。
- 1280px 宽度抽查时发现现有框架侧栏遮挡正文；本次按约定不修改框架，标准验收视口为 1440px。
- 主题包已知问题：Descriptions 的无边框纵向布局中，标签和内容被主题统一设为 inline-block，导致列挤在一起。保留真实示例并在双语页面和 wiki 登记，本次不修改主题包。
- 已验证 `var.scss` 的 `$colors` 不能用 `@use ... with` 覆盖（未声明 `!default`）；主题定制指南不提供这类配置示例。
- Steps 在服务端渲染后初始三步都显示为已完成，更新 active 后恢复；在 Markdown 层使用 `ClientOnly` 确保初始状态正确。

阶段 8 首轮全量检查：576 种组合中 560 通过；已有设计变量与全局变量页共 16 种组合报告 `Hydration completed but contains mismatches.`。两个变量表的 watcher 在浏览器初始化时立即读取样式，与服务端的默认值 / 空行不一致；最小修复是让现有挂载后样式刷新负责首次读取。用户已授权仅修复这两个变量表的首次读取时机；现已移除两处立即读取，生产构建及 16/16 组合复验通过，亮暗和 EP 切换后的变量刷新正常；最终全量 576/576 组合通过。

## 初始现状

- 文档站在 `site/`，VitePress 1.6，仿 arco.design 的布局。框架已经完成并经用户确认，**本次不要改框架**（布局、顶栏、侧栏、搜索、收起按钮、Arco / EP 切换、设计变量页、全局变量页）。
- 已完成的页面：首页、设计变量（`guide/token`）、全局变量（`guide/variables`）、Button（`components/button`），中英文各一份。
- `site/.vitepress/catalog.ts` 里列出了 67 个组件，初始只有 `button` 是 `ready: true`。本次按阶段明细把其余 66 个都写完并打开（原计划的 65 / 64 为计数笔误）。
- 示例素材：`playground/src/demos/*.vue` 有 138 个对照用例（左 EP、右 Arco），已经过样式对比验证。**只取 `<template #ep>` 部分作参考**，按工作流第 2 节改写成正常用法，不能原样复制。
- 差异说明素材：`docs/wiki/components/*.md` 的“已知差异”一节，`packages/theme-arco/src/components/_<x>.scss` 头部的“变体映射”注释。

## 关键约定（本次统一执行）

1. **示例文字用英文**，中英文页共用示例文件。EP 组件本身的内置文字（日期面板的月份、分页的 “Go to”、“No Data”）保持 EP 默认的英文，不加 `el-config-provider` 的 locale。
2. **每个组件 1～4 个示例**。playground 用例多的组件（Table、DatePicker、Input）可以合并，只保留最能体现 Arco 外观的几种；用例只有 1 个的组件，可以按 EP 官方文档的常见用法再补 1 个（例如 Tooltip 的不同方向）。
3. **页面里的说明文字中英文对应**：先写中文页，再写英文页；英文要是自然的英文，不要逐字翻译。
4. **不改主题包**：本次只动 `site/`、`docs/`、`README.md`、`CLAUDE.md`、根 `package.json` 和 `.gitignore`。如果发现主题样式本身有 bug，记录到交付说明里，不要顺手改 `packages/theme-arco/`。
5. **提交**：每个阶段完成后在交付说明里汇报，等用户授权再提交。作者邮箱 `xiaoi66@icloud.com`，提交信息不加 AI 署名或 `Co-Authored-By`。

## 阶段 0：准备检查工具

1. 新建 `site/scripts/check-pages.mjs`（Playwright 已在根目录的依赖里，用 `createRequire` 从 `scripts/` 解析，参考 `scripts/screenshot.mjs` 的写法）：
   - 参数：页面 slug 列表（不传则检查 `catalog.ts` 里所有 `ready` 的组件和全部指南页）；`--base`，默认 `http://localhost:5191`。
   - 每个页面跑 8 种组合：中文 / 英文 × 亮色 / 暗色 × Arco 主题 / EP 原版。用 `addInitScript` 在加载前写 localStorage：`site-theme` = `arco` / `ep`，`vitepress-theme-appearance` = `light` / `dark`。
   - 每次：`goto` 后等 `networkidle`，再等 500ms；收集 `pageerror`、`console` 的 error，以及包含 `[Vue warn]` 的 warning。
   - 检查每个 `.demo-preview` 的高度 > 0 且有子元素；检查 `getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary')`：Arco 亮色主题下应为 `#165dff`，暗色应为 `rgb(60, 126, 255)`（来源：`src/tokens/_arco-dark.scss` 的 arcoblue-6），EP 原版下应为 `#409eff`（大小写不敏感，忽略 RGB 空格），不符就记为“样式切换失效”。
   - 整页截图存到 `site/.check/<lang>-<slug>-<light|dark>-<arco|ep>.png`，汇总写 `site/.check/report.md`（每页一行：错误数、空示例数、切换是否正常）。
2. `.gitignore` 加 `site/.check`；根 `package.json` 加脚本 `"site:check": "node site/scripts/check-pages.mjs"`。
3. 检查用生产构建：`pnpm site:build`，然后在 `site/` 下 `npx vitepress preview --port 5191` 后台运行，再跑检查脚本。开发服务器（`vitepress dev`）和生产构建处理 `<head>` 的逻辑不同，最终验收必须用 preview。
4. 先用 `button` 跑一遍，确认脚本本身没有误报：8 种组合 0 错误，切换都正常。

## 阶段 1～6：组件页

按分组分批，每批做完跑一次第 4 节的验证（工作流第 4 节），通过后再做下一批。顺序：

| 阶段 | 组件 |
| --- | --- |
| 1 | link、text、divider、splitter |
| 2 | input、input-number、input-tag、input-otp、autocomplete、mention、select、select-v2、cascader、tree-select |
| 3 | checkbox、radio、switch、segmented、slider、rate、date-picker、time-picker、time-select、color-picker、transfer、upload、form |
| 4 | avatar、badge、calendar、card、carousel、collapse、descriptions、empty、image、progress、result、skeleton、statistic、table、table-v2、tag、timeline、tree、tooltip、popover |
| 5 | alert、dialog、drawer、loading、message、message-box、notification、popconfirm |
| 6 | anchor、backtop、breadcrumb、dropdown、menu、page-header、pagination、steps、tabs、scrollbar、tour |

每个组件的步骤：

1. 读素材：表里列出的 playground 文件中对应用例的 `#ep` 部分和 `note`；wiki 文档；组件覆盖文件头部注释。
2. 写示例 `site/examples/<slug>/*.vue`（工作流第 2 节）。
3. 写中文页、英文页（工作流第 1 节）。
4. `catalog.ts` 里改成 `ready: true`。

### 组件明细

“改写要点”是相对 playground 用例要特别处理的地方；没写的按工作流第 2 节的通用规则处理。

#### 通用 / 布局

| slug | playground 用例 | wiki | 改写要点 |
| --- | --- | --- | --- |
| link | LinkDemo：`link-types` `link-disabled` `link-icon` `link-underline` | 03-link | 默认链接是灰色（Arco 风格），在说明里点出来；`underline` 是 Arco 没有的属性 |
| text | TextDemo：`text-types` | 22-text | 可以补一个 `truncated` / `size` 示例 |
| divider | DividerDemo：`divider-horizontal` `divider-vertical` | 06-divider | 竖线示例放在一行文字里 |
| splitter | SplitterDemo：`splitter` | 46-button-group-splitter | 保留 EP 结构、颜色用 Arco（用户确认过的方案 A）；容器写行内 `style="height: 200px"`，面板内放文字；可加一个可折叠（`collapsible`）示例 |

#### 数据输入

| slug | playground 用例 | wiki | 改写要点 |
| --- | --- | --- | --- |
| input | InputDemo：`input-basic` `input-error` `input-sizes` `input-affix` `input-addon` `input-textarea` | 02-input | 错误态不要写 `class="is-error"`，改成 `el-form-item` 的 `error` 属性或校验失败的表单项（这是用户的真实用法）；输入框给固定宽度（如 `style="width: 240px"`） |
| input-number | InputNumberDemo：`input-number-button` `input-number-focus` `input-number-embed` `input-number-no-controls` | 17-input-number | “聚焦”用例只是强制聚焦状态，去掉；其余三种保留 |
| input-tag | InputTagDemo：`input-tag-basic` `input-tag-props` | 18-input-tag | `tag-type` / `tag-effect` 是 Arco 没有的属性 |
| input-otp | MiscDemo：`input-otp` | 38-misc | — |
| autocomplete | AutocompleteDemo：`autocomplete-basic` | 24-autocomplete | 用 `fetch-suggestions` 返回英文候选项，点击输入框展开，不强制打开 |
| mention | MiscDemo：`mention` | 38-misc、45-tour-virtual | 输入 `@` 弹出候选，说明里写清楚怎么触发 |
| select | SelectDemo：`select-view` `select-multiple` `select-dropdown` `select-tag-props` | 27-select | `select-dropdown` 是强制展开的面板，改成普通 Select，选项里放分组（`el-option-group`）和禁用项来展示面板样式 |
| select-v2 | VirtualDemo：`select-v2` | 45-tour-virtual | 用循环生成 1000 个选项，体现虚拟滚动 |
| cascader | TreeDemo：`cascader-panel` `cascader-selected` | 39-tree-cascader-upload | 一个普通 Cascader + 一个 `el-cascader-panel` 内联面板 |
| tree-select | TreeSelectDemo：`tree-select` | 39、45 | 可以再加一个多选（`multiple` + `show-checkbox`） |
| checkbox | CheckboxDemo：`checkbox-basic` `checkbox-disabled` `checkbox-button` `checkbox-sizes` | 08-checkbox | 按钮组、尺寸是 Arco 没有的形态 |
| radio | RadioDemo：`radio-basic` `radio-button` `radio-sizes` | 07-radio | 同上 |
| switch | SwitchDemo：`switch-basic` `switch-small` `switch-text` `switch-large` | 09-switch | `large` 是 Arco 没有的尺寸 |
| segmented | NavDemo：`segmented` | 41-segmented-anchor | 保留 EP 结构、只换 token（用户确认过） |
| slider | SliderDemo：`slider-basic` | 34-slider-rate | 可以补 `range` 或 `show-stops` |
| rate | SliderDemo：`rate-basic` | 34-slider-rate | — |
| date-picker | DateDemo：`date-input` `date-range-input` `date-panel` `date-range-panel` `date-month-year` `date-time-panel` | 44-date-time-picker | 合并成 4 个：基础（含尺寸、禁用）、范围、月份 / 年份 / 日期时间类型、`el-date-picker-panel` 内联面板。去掉 `el-config-provider :locale="zhCn"` |
| time-picker | TimeDemo：`time-panel` `time-input` | 44-date-time-picker | 面板用例改成可交互的普通 TimePicker；加一个范围（`is-range`） |
| time-select | TimeDemo：`time-select` | 44-date-time-picker | — |
| color-picker | ColorDemo：`color-trigger` `color-panel` | 43-transfer-color-calendar | 先确认 EP 2.14 是否导出颜色面板的内联组件（看 `node_modules/element-plus/es/components/` 下有没有 `color-picker-panel`），有就做内联面板示例，没有就只做普通触发器（可加 `show-alpha`、`predefine`） |
| transfer | TransferDemo：`transfer-basic` `transfer-filter` | 43 | — |
| upload | TreeDemo：`upload-drag` | 39 | 不能真的上传：`action="#"` + `:auto-upload="false"`；拖拽区和 `list-type="picture-card"` 各一个示例；图片卡片用 `site/public/images/` 里的小图作为默认 `file-list` |
| form | FormDemo：`form-basic` | 37-form | 做成真实可用的表单：`rules` + 提交按钮触发校验；再加一个 `label-position="top"` 或行内表单 |

#### 数据展示

| slug | playground 用例 | wiki | 改写要点 |
| --- | --- | --- | --- |
| avatar | AvatarDemo：`avatar-basic` `avatar-group` | 12-avatar | 不用外链图片，用文字或图标头像，最多用一张本地小图 |
| badge | BadgeDemo：`badge-count` `badge-dot` | 05-badge | `badge-box` 是 playground 的占位方块，改成按钮或头像 |
| calendar | CalendarDemo：`calendar-month` | 43 | 日历很高，可以只放一个示例 |
| card | CardDemo：`card-basic` `card-hover` `card-shadow` | 11-card | `shadow` 的三种取值是 Arco 没有的；卡片给固定宽度并排显示 |
| carousel | MediaDemo：`carousel-basic` | 42-image-carousel | 用纯色块或本地图片做幻灯片，高度 `height="200px"` |
| collapse | CollapseDemo：`collapse-right` `collapse-left` | 31-collapse | — |
| descriptions | DescriptionsDemo：`descriptions-plain` `descriptions-bordered` `descriptions-vertical` | 19-descriptions | 内容改成英文 |
| empty | ResultDemo：`empty-basic` | 36-feedback | — |
| image | MediaDemo：`image-basic` `image-viewer` | 42 | 图片放 `site/public/images/`；预览用 `preview-src-list`（点图片打开 ImageViewer），不要强制渲染 ImageViewer；`fit` 的几种取值可以做一个示例 |
| progress | ProgressDemo：`progress-line` `progress-circle` | 14-progress | — |
| result | ResultDemo：`result-basic` | 36-feedback | 四种 `icon` 并排或分开 |
| skeleton | SkeletonDemo：`skeleton-basic` | 15-skeleton | 可加 `animated` |
| statistic | StatisticDemo：`statistic-basic` | 16-statistic | 可加 `el-countdown` |
| table | TableDemo：`table-basic` `table-variant` `table-sort` `table-props` `table-ep-only` `table-filter` | 40-table | 合并成 4 个：基础（默认 / `border`）、斑马纹 + 尺寸 + 合计行、排序 + 筛选 + 多选、固定列 + 多级表头。`table-ep-only` 里 Arco 没有的属性放进“与 Arco 的差异”说明。数据改成英文，行数控制在 4～6 行 |
| table-v2 | VirtualDemo：`table-v2` | 40、45 | 用循环生成数据，`:height="300"` |
| tag | TagDemo：`tag-light` `tag-plain` `tag-dark` `tag-sizes` `tag-checkable` | 04-tag | light / plain / dark 可以合成一个示例三行展示 |
| timeline | TimelineDemo：`timeline-basic` `timeline-types` `timeline-props` | 20-timeline | — |
| tree | TreeDemo：`tree-basic` | 39 | 可加 `show-checkbox` |
| tooltip | PopoverDemo：`tooltip-basic` | 25-popper | 悬停触发；补一个不同方向（`placement`）的示例 |
| popover | PopoverDemo：`popover-basic` | 25-popper | 点击或悬停触发，带 `title` |

#### 反馈

| slug | playground 用例 | wiki | 改写要点 |
| --- | --- | --- | --- |
| alert | AlertDemo：`alert-types` `alert-description` `alert-closable` | 10-alert | 竖着排列（预览区默认是横向换行，Alert 需要整行宽度，用 `style="width: 100%"` 或 flex 列方向的辅助类） |
| dialog | DialogDemo：`dialog-basic` | 29-dialog | 按钮打开；再加一个 `center` 示例 |
| drawer | DialogDemo：`drawer-basic` | 29-dialog | 按钮打开；可以加 `direction` 切换 |
| loading | LoadingDemo：`loading-basic` | 36-feedback | `v-loading` 加在一个有内容的区域上，旁边一个 Switch 控制开关；再加一个按钮调用 `ElLoading.service({ fullscreen: true })`，2 秒后关闭 |
| message | MessageDemo：`message-types` `message-plain` | 28-message | 一排按钮分别调用 `ElMessage` 的各种 `type`；`plain` 单独一个示例 |
| message-box | MessageBoxDemo：`message-box-center` `message-box-default` | 28、29 | 按钮分别打开 `ElMessageBox.alert` / `confirm` / `prompt`；`center` 单独一个 |
| notification | MessageDemo：`notification-types` | 28-message | 按钮分别调用 `ElNotification` 的各种 `type` |
| popconfirm | PopoverDemo：`popconfirm-basic` | 25-popper | 点击按钮触发 |

#### 导航 / 其他

| slug | playground 用例 | wiki | 改写要点 |
| --- | --- | --- | --- |
| anchor | NavDemo：`anchor-default` `anchor-underline` `anchor-horizontal` | 41-segmented-anchor | Anchor 需要可滚动的目标区域：做一个固定高度的滚动容器（`container` 属性指向它），里面放几段内容；对应关系：EP 默认 ↔ Arco line-less，`type="underline"` ↔ Arco 默认 |
| backtop | BacktopDemo：`backtop-basic` | 23-backtop | 用 `target` 指向示例里的固定高度滚动容器，不要挂到整个页面上（否则会和站点的滚动冲突） |
| breadcrumb | BreadcrumbDemo：`breadcrumb-basic` | 13-breadcrumb | 加一个 `separator-icon` 示例 |
| dropdown | DropdownDemo：`dropdown-basic` `dropdown-props` | 26-dropdown | 悬停 / 点击触发；默认箭头、尺寸是 Arco 没有的 |
| menu | MenuDemo：`menu-vertical` `menu-horizontal` | 35-menu | 纵向菜单给固定宽度（如 240px）；可加 `collapse` 折叠示例 |
| page-header | PageHeaderDemo：`page-header-basic` `page-header-back-text` | 21-page-header | — |
| pagination | PaginationDemo：`pagination-basic` `pagination-props` | 33-pagination | `background`、完整 `layout` 是 Arco 没有的 |
| steps | StepsDemo：`steps-center` `steps-props` | 32-steps | — |
| tabs | TabsDemo：`tabs-line` `tabs-card` `tabs-props` | 30-tabs | `border-card`、`closable`、位置是 Arco 没有的 |
| scrollbar | MiscDemo：`scrollbar` | 38-misc | 固定高度容器里放一列条目 |
| tour | TourDemo：`tour-basic` | 45-tour-virtual | 按钮打开，`el-tour-step` 的 `target` 指向示例里的几个按钮（用模板 ref，在 `onMounted` 之后才有值）；外壳按 Arco Popover（用户确认过） |

## 阶段 7：指南页

新增以下页面（中英文各一份），侧栏“指南”的顺序改为：快速开始、暗色模式、主题定制、设计变量、全局变量。

1. **快速开始**（`guide/quick-start`）：安装（`pnpm add element-plus element-plus-theme-arco`）、全量引入（`import 'element-plus-theme-arco'` 替换 `element-plus/dist/index.css`）、按需引入（Vite 插件 `arcoTheme()`，配合 `unplugin-vue-components` 的 `ElementPlusResolver`），以及按需引入的三条注意事项（回落警告、版本警告、只支持 `importStyle: 'css'`）。内容以 `README.md` 的“使用”一节为准。
2. **暗色模式**（`guide/dark`）：全量和按需两种写法，`html.dark` 切换，Arco 半透明色合成到 `#232324` 的说明。以 README 为准。
3. **主题定制**（`guide/theming`）：使用 Arco 的颜色变量（README 的“使用 Arco 的颜色变量”一节）、引用全局变量（链接到全局变量页）；如果 `packages/theme-arco/src/common/var.scss` 支持用户用 SCSS 覆盖（`package.json` 导出了 `./var.scss`），先读源码和 `docs/wiki/architecture/01-theming-layers.md` 确认用法再写，确认不了就不写这一部分，在交付说明里提出来问用户。
4. 顶栏“指南”的链接和首页“设计变量”旁边的入口：顶栏“指南”改为指向快速开始；首页主按钮保留“浏览组件”，第二个按钮改成“快速开始”（`HomeHero.vue` 里的文字和链接，中英文都改）。

## 阶段 8：收尾

1. 全量检查：`pnpm site:build` + preview + `pnpm site:check`（不带参数跑全部页面），报告里全部 0 错误、0 空示例、切换全部正常；把截图大致翻一遍。
2. 搜索：顶栏搜索能搜到几个抽查的组件名（如 “Table”、“日期”）。
3. 文档同步：
   - `README.md` 和 `CLAUDE.md` 的命令列表加上 `pnpm site:dev`（本地预览文档站）、`pnpm site:build`（构建文档站）、`pnpm site:check`（检查文档站页面）。
   - `docs/rules/README.md` 的路由表已登记本工作流，确认无误。
   - 新增 `docs/wiki/engineering/02-docs-site.md`，记录文档站的结构和下面“已知陷阱”里的决策，并在 `docs/wiki/README.md` 的索引里加一行。
4. 停掉自己启动的 preview / dev 服务。
5. 交付说明：完成的页面清单、做了交互改写的示例、发现但没处理的主题样式问题、需要用户决定的事项。

## 已知陷阱（框架里已经处理，写页面时不要破坏）

- **Arco / EP 样式切换**：四个 `<link data-site-style>` 的属性必须保持不变，切换靠 `link.sheet.disabled`（`config.mts` 的启动脚本 `window.__siteApplyTheme`）。原因：VitePress 换页时按配置比对 `<head>` 标签的全部属性，属性一变就会重新插入默认的 `<link>`，切换失效；`link.disabled` 在 Chrome 里对未加载完的样式表不生效。**不要在页面或示例里增删、修改这几个 `<link>`。**
- **示例的 SSR**：VitePress 构建时会在 Node 里渲染页面。`ElMessage`、`ElLoading.service` 等只能在事件回调里调用；Teleport 类组件（Dialog、Drawer、Tour、ImageViewer）默认挂到 `body`，SSR 时通常没问题，出告警就用 `<ClientOnly>`。
- **`id` 注入**：`theme/index.ts` 已经 `provide` 了 `ID_INJECTION_KEY` 和 `ZINDEX_INJECTION_KEY`，示例里不用再处理 EP 的 SSR id 问题。
- **正文样式污染**：VitePress 的 `.vp-doc` 会给 `p`、`ul`、`table`、`button` 加边距和样式，`custom.css` 已经在 `.demo-preview` 里重置了 `p / ul / ol / table / button`。如果新示例里出现别的被污染的元素（例如 `h3`、`a`、`img`、`li`），在同一段重置规则里补上，不要在示例里写 `!important`。
- **预览区布局**：`.demo-preview` 是 `display: flex; flex-wrap: wrap; gap: 12px; align-items: center`。需要整行宽度或纵向排列的示例（Alert、Table、Form、Menu、Collapse、Descriptions），最外层放一个 `style="width: 100%"` 的容器。

## 附：组件页验收清单（每页逐项确认）

- [ ] 中文页、英文页都存在，标题格式正确，页首说明带 EP 文档链接且链接可打开
- [ ] 每个示例有 h2 标题和一句说明；示例代码里没有 `data-*` 测量标记、没有 playground 样式类、没有 Arco 依赖
- [ ] 示例文字是英文；弹出类组件是正常交互方式
- [ ] “与 Arco 的差异”一节存在
- [ ] `catalog.ts` 中 `ready: true`，侧栏和面包屑显示在正确的分组下
- [ ] 8 种组合下无报错、无空示例，切换正常；截图看过

## 本次交付记录

- 新增 66 组双语组件页，连同已有 Button，目录内 67 个组件全部启用；逐项清单见上方阶段 1～6。
- 新增 141 个共享示例，连同原有 Button 的 4 个，共 145 个。中英文页引用相同示例，内容使用英文。
- 新增快速开始、暗色模式、主题定制三组双语指南；保留设计变量、全局变量。双语指南导航和首页第二入口均已更新。
- 用户授权后最小修复已有设计变量与全局变量表的首次读取时机，避免初始渲染不一致；布局、变量映射与主题切换保持原有设计。
- 补充生产页面检查命令、README / CLAUDE 命令说明和 [文档站维护记录](../wiki/engineering/02-docs-site.md)。

交互改写包括：

- Dialog / Drawer / Tour / 图片预览改为点击打开；Tooltip / Popover / Popconfirm / Dropdown 通过悬停或点击触发。
- Message / Notification / MessageBox / Loading 通过按钮事件调用；全屏 Loading 自动关闭并在卸载时清理。
- Select / Cascader / 日期、时间、颜色选择器通过输入框打开；额外面板使用组件自身的内联形式。
- Form 展示真实校验，Upload 使用本地选择与列表、不向远程服务上传；Anchor / Backtop 使用各自独立的滚动容器。
- 发现服务端渲染告警或 Steps 初始状态异常时，仅在 Markdown 页面层添加 ClientOnly，示例源码保留正常应用写法。

最终验证：

- 生产构建通过，无 Vue 告警或 ElementPlusError；构建工具保留现有的大文件体积提示。
- 全部 72 个目标（67 组件 + 5 指南）× 8 种组合，共 576 次检查：0 错误、0 空示例，样式切换全部正常；报告在 `site/.check/report.md`，截图不纳入 Git。
- 各阶段已复核截图及交互，最终补看英文亮色 Arco / 暗色 EP 页面；搜索“日期”“Table”“Tour”及主题切换后换页检查通过。
- 145 个示例编译、双语章节对应、134 个官方文档链接、变更空白检查通过。主题包源码未改动。
- 本次启动的预览服务已停止；用户已授权提交与推送，执行结果以 Git 记录为准。

仍有明确边界：

- Descriptions 无边框纵向布局的主题缺陷、1280px 下现有框架侧栏遮挡问题已登记，本次按范围保留。
- `var.scss` 的 `$colors` 不支持 `@use ... with` 覆盖，指南不提供未经支持的配置方式；若后续需要该能力，需独立修改主题包。
