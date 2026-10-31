# docs/wiki/ 项目知识库索引

> 本目录是 element-plus-theme-arco 的知识库：面向人的叙述性长文，讲清每一块“是什么、为什么这样设计、关键文件在哪”。
> 约束类内容（迁移时必须遵守什么）在 [`docs/rules/`](../rules/README.md)，本库不重复，只链接。

## 索引

### architecture/ —— 主题架构

| 文档 | 描述 |
| --- | --- |
| [01-theming-layers.md](./architecture/01-theming-layers.md) | 主题的分层：EP 的 SCSS 变量配置机制、Arco 10 级色板如何钉到 EP 色阶、组件覆盖层只改 CSS 变量的原因、可行性边界 |
| [02-build-and-mirror.md](./architecture/02-build-and-mirror.md) | 构建产物与 `theme-chalk` 镜像：逐文件编译、覆盖按文件名拼接、`meta.json`、文件清单校验、为什么必须串行编译 |
| [03-on-demand.md](./architecture/03-on-demand.md) | 按需引入：EP 的样式依赖链、为什么不能只在 resolver 上追加样式、镜像加 alias 的方案、为什么不用 `resolveId`、回落与版本警告 |
| [04-dark-mode.md](./architecture/04-dark-mode.md) | 暗色主题：EP 暗色的结构、Arco 半透明色与 EP 合成色的差异、`html.dark` 优先级陷阱、组件作用域内的半透明文字 |
| [05-arco-vars.md](./architecture/05-arco-vars.md) | Arco 兼容变量：从 `arco.css` 生成、为什么不引用 `--el-*`、与 EP 变量的关系、隔离校验 |
| [06-glass.md](./architecture/06-glass.md) | 毛玻璃主题：为什么是独立的 `glass.css`、`html.glass` 开关、`--glass-opacity`、普通面 / 输入类 / 浮层三类面的做法、聚焦态不画高光的原因、已知边界 |

### engineering/ —— 工程与工具

| 文档 | 描述 |
| --- | --- |
| [01-playground-and-compare.md](./engineering/01-playground-and-compare.md) | 对照 playground 的模式（全量 / 按需 / 原版 / 暗色）与对比脚本：成对规则、测量字段的归一化（边框、内容偏移、颜色合成、胶囊圆角）、产物目录 |

| [02-docs-site.md](./engineering/02-docs-site.md) | 文档站的页面与示例结构、生产检查、主题切换与服务端渲染、正文污染及已知边界 |

### components/ —— 组件迁移记录

| 文档 | 描述 |
| --- | --- |
| [01-button.md](./components/01-button.md) | Button：变体映射、Arco token 来源、规则顺序与优先级、暗色修正、已知差异 |
| [02-input.md](./components/02-input.md) | Input / Textarea：填充式输入框、box-shadow 边框补偿、错误态、前后缀与 addon、已知差异 |
| [03-link.md](./components/03-link.md) | Link：灰色默认链接的取舍、hover 灰底代替下划线 |
| [04-tag.md](./components/04-tag.md) | Tag / CheckTag：按颜色映射、light / plain / dark 的规则顺序、关闭按钮的 16px 圆底 |
| [05-badge.md](./components/05-badge.md) | Badge：20px 角标、2px bg-2 外圈、按 Arco 的中心点重新定位 |
| [06-divider.md](./components/06-divider.md) | Divider：改用下边框让文字居中落在线上 |
| [07-radio.md](./components/07-radio.md) | Radio / RadioButton：24px hover 圆底、按钮组的拼接灰底、选中态优先级陷阱 |
| [08-checkbox.md](./components/08-checkbox.md) | Checkbox / CheckboxButton：hover 整项、半选禁用、CheckboxGroup 的 line-height: 0 |
| [09-switch.md](./components/09-switch.md) | Switch：两档尺寸、无边框、禁用换色不降透明度 |
| [10-alert.md](./components/10-alert.md) | Alert：primary ↔ info、info ↔ normal、关闭按钮绝对定位 |
| [11-card.md](./components/11-card.md) | Card：always 也无阴影、hover 阴影、暗色底色 |
| [12-avatar.md](./components/12-avatar.md) | Avatar / AvatarGroup：字号取尺寸一半、叠放描边 |
| [13-breadcrumb.md](./components/13-breadcrumb.md) | Breadcrumb：24px 行高、可点击项灰底 |
| [14-progress.md](./components/14-progress.md) | Progress：行内字号的绕法、SVG stroke 属性选择器 |
| [15-skeleton.md](./components/15-skeleton.md) | Skeleton：按 Arco Vue 的实际行高行距对齐 |
| [16-statistic.md](./components/16-statistic.md) | Statistic：标题、数值、前后缀 |
| [17-input-number.md](./components/17-input-number.md) | InputNumber：两侧按钮 ↔ button、右侧按钮 ↔ embed、暗色 secondary 叠加 |
| [18-input-tag.md](./components/18-input-tag.md) | InputTag：填充式输入框里的白底标签 |
| [19-descriptions.md](./components/19-descriptions.md) | Descriptions：inline-horizontal、border-style: hidden 去外圈边框 |
| [20-timeline.md](./components/20-timeline.md) | Timeline：6px 圆点与 1px 连线的定位 |
| [21-page-header.md](./components/21-page-header.md) | PageHeader：内容 ↔ 标题、返回文字的取舍 |
| [22-text.md](./components/22-text.md) | Text：默认文字 text-1 |
| [23-backtop.md](./components/23-backtop.md) | Backtop：主色实心圆 |
| [24-autocomplete.md](./components/24-autocomplete.md) | Autocomplete：下拉面板的描边宽度与弹出距离 |
| [25-popper.md](./components/25-popper.md) | Tooltip / Popover / Popconfirm（弹出层） |
| [26-dropdown.md](./components/26-dropdown.md) | Dropdown |
| [27-select.md](./components/27-select.md) | Select |
| [28-message.md](./components/28-message.md) | Message / Notification |
| [29-dialog.md](./components/29-dialog.md) | Dialog / Drawer / MessageBox |
| [30-tabs.md](./components/30-tabs.md) | Tabs |
| [31-collapse.md](./components/31-collapse.md) | Collapse |
| [32-steps.md](./components/32-steps.md) | Steps |
| [33-pagination.md](./components/33-pagination.md) | Pagination |
| [34-slider-rate.md](./components/34-slider-rate.md) | Slider / Rate |
| [35-menu.md](./components/35-menu.md) | Menu |
| [36-feedback.md](./components/36-feedback.md) | Empty / Result / Loading |
| [37-form.md](./components/37-form.md) | Form |
| [38-misc.md](./components/38-misc.md) | Input OTP / Scrollbar / Mention |
| [39-tree-cascader-upload.md](./components/39-tree-cascader-upload.md) | Tree / TreeSelect / Cascader / Upload |
| [40-table.md](./components/40-table.md) | Table |
| [41-segmented-anchor.md](./components/41-segmented-anchor.md) | Segmented / Anchor |
| [42-image-carousel.md](./components/42-image-carousel.md) | Image / ImageViewer / Carousel |
| [43-transfer-color-calendar.md](./components/43-transfer-color-calendar.md) | Transfer / ColorPicker / Calendar |
| [44-date-time-picker.md](./components/44-date-time-picker.md) | DatePicker / TimePicker / TimeSelect |
| [45-tour-virtual.md](./components/45-tour-virtual.md) | Tour / SelectV2 / TableV2 / TreeSelect / Mention |
| [46-button-group-splitter.md](./components/46-button-group-splitter.md) | ButtonGroup / Splitter |

### troubleshooting/ —— 排障

| 文档 | 描述 |
| --- | --- |
| [01-common-issues.md](./troubleshooting/01-common-issues.md) | 常见问题：端口被孤儿 vite 占用、桌面 Chromium 卡在 keyring、按需模式冷启动、Sass 并发卡死、样式没生效的排查顺序 |

---

## 维护约定

- **新增文档**：新建 `docs/wiki/<分组>/<NN>-<名称>.md`，并在本文件对应分组登记一行索引。每迁移一个组件，在 `components/` 下新增一篇。
- **更新文档**：构建、插件、命令、playground 或对比口径变化时，同步修正对应篇章；标题或职责变化时同步索引描述。
- **收录边界**：讲“知识与原理”进本库；讲“迁移时必须遵守”进 `docs/rules/`。互相链接，不互相复制。
- **关键文件链接**：正文引用源码用相对路径（`../../../packages/...`），方便一键跳转。
