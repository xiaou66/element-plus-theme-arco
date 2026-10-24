# 工作流：编写文档站的组件页 / 指南页

适用于在 `site/`（VitePress 文档站）里新增或修改组件页、指南页。站点框架本身（布局、切换、侧栏、搜索、设计变量表）已经定型，本工作流只管页面内容；要改框架按 `infrastructure-change.md` 执行。

文档站给使用主题的人看：每个组件页展示该组件在主题下的样子，并说明和 Arco 的对应关系、已知差异。不重复 Element Plus 的 API 文档，只链接过去。

## 0. 先了解框架（只读）

| 文件 | 作用 |
| --- | --- |
| `site/.vitepress/config.mts` | 导航、侧栏、搜索、`demo` 容器（构建时读示例源码生成代码块）、启动脚本（Arco / EP 样式切换、收起状态） |
| `site/.vitepress/catalog.ts` | 组件目录：分组、名称、`ready`。`ready: true` 的组件才进侧栏 |
| `site/.vitepress/theme/components/Demo.vue` | 示例框：预览区 + “显示代码 / 复制代码”按钮 |
| `site/examples/<slug>/<case>.vue` | 示例组件，`import.meta.glob` 自动收集，不用手动注册 |
| `site/components/button.md`、`site/en/components/button.md` | 组件页的标准样例，新页面照着写 |
| `site/.vitepress/theme/custom.css` | 站点样式。示例需要的布局辅助类加在这里，统一放在 `/* 示例布局辅助类 */` 段 |

## 1. 页面结构（必须）

中文页 `site/components/<slug>.md`，英文页 `site/en/components/<slug>.md`，两页结构完全一致，只是语言不同。

```md
# 输入框 Input                      ← 中文：“中文名 英文名”；英文页只写英文名

<p class="page-desc">一句话：对应 Arco 的哪个组件、默认形态对应 Arco 的哪个变体。属性用法见 <a href="https://element-plus.org/zh-CN/component/input.html" target="_blank" rel="noreferrer">Element Plus 文档</a>。</p>

## 基础用法                          ← 每个示例一个 h2，会进右侧目录

一句话说明这个示例展示什么，EP 的哪个属性对应 Arco 的哪个效果。

::: demo input/basic
:::

## 与 Arco 的差异                    ← 固定为最后一节；英文页为 “Differences from Arco”

- 列表，一条一个差异。
```

- 页首说明必须用 `<p class="page-desc">…</p>`（带分割线）。里面的代码用 `<code>`，链接用 `<a>`，因为 HTML 块里不解析 Markdown。
- EP 文档链接：中文页用 `zh-CN`，英文页用 `en-US`，路径用 EP 官网的真实路径（大多和 slug 相同）。写完要确认链接能打开，不要凭猜测拼。
- `::: demo` 后面只写示例路径，标题和说明写在容器外面，否则不会进入右侧目录和搜索。
- 示例说明只写一句，最多两句。不写 API 表格。
- “与 Arco 的差异”的来源：`docs/wiki/components/` 里对应文档的“已知差异”一节，以及组件覆盖文件 `packages/theme-arco/src/components/_<x>.scss` 头部的“变体映射”注释。只写使用者能感知到的差异，不写实现细节（选择器、优先级）。确实没有差异时写“无明显差异。” / “No notable differences.”
- 页面写完后，在 `catalog.ts` 里把这个组件标成 `ready: true`。

## 2. 示例文件（必须）

- 路径 `site/examples/<slug>/<case>.vue`，`<case>` 用 kebab-case 短名（`basic`、`sizes`、`disabled`、`affix`）。
- 中英文页共用同一个示例文件，所以**示例里的文字一律用英文**（按钮文字、placeholder、表格数据、对话框内容），和 Arco 官网示例一致。
- 一个示例只展示一个主题，规模和 `site/examples/button/*.vue` 相当：模板一般不超过 40 行，代码块展开后要一眼看懂。
- 必须是用户能直接复制使用的正常写法：
  - 禁止出现 playground 的测量用标记：`data-pair`、`data-target`、`data-pos`、`data-width`、`data-skip` 等任何 `data-*`，以及只为配对而套的 `<span>`。
  - 禁止依赖 playground 的样式类（`static-dialog`、`static-pop`、`pop-box`、`sel-box`、`table-box`、`card-box`、`desc-box` 等），不要把 `playground/src/playground.css` 搬进站点。
  - 弹出类组件用正常的交互方式展示：点按钮打开 Dialog / Drawer / MessageBox / Tour，按钮调用 `ElMessage` / `ElNotification`，Tooltip / Popover / Popconfirm / Dropdown 悬停或点击触发，Select / Cascader / DatePicker 等点击输入框展开。不要用 `:visible="true"`、`persistent`、`:teleported="false"` 之类强制展开。
  - EP 本身就有内联面板组件的（`el-date-picker-panel`、`el-cascader-panel`，以及 EP 提供的其它 `*-panel`），可以额外加一个“面板”示例直接渲染，方便看面板样式。
- 图标从 `@element-plus/icons-vue` 引入。站点没有安装 `@arco-design/web-vue`，**禁止**引入 Arco 的任何东西。
- 示例必须能 SSR：`<script setup>` 顶层不能访问 `window` / `document`；需要浏览器 API 的放进 `onMounted` 或事件回调。如果组件在 SSR 下报错，或预渲染结果和浏览器里对不上（弹出层、日期、Steps 等），在容器上加标记：`::: demo date-picker/basic client-only`，只让预览区在浏览器里渲染。不要在页面里手写 `<ClientOnly>` 包住整个 demo（代码块也会跟着不预渲染）。
- 需要容器尺寸时（例如 Loading 区域、Splitter、Scrollbar、Backtop 的滚动区），优先在示例里写行内 `style`；同一种布局要在多个示例里复用时，才在 `custom.css` 的“示例布局辅助类”段加类，类名用 `demo-` 前缀。
- 图片示例（Image、Carousel、Avatar 等）不能用外链图片：把图片放到 `site/examples/assets/`（体积尽量小，单张 < 50KB），在示例里 `import landscape from '../assets/landscape.svg'` 引用；不要写 `/images/...` 这种根路径（站点部署到子路径时会失效），也不要用 VitePress 的 `withBase`（用户复制到自己项目里用不了）。或者用纯色块代替。
- 示例代码在中英文页面上都会显示，**注释用英文**，只写使用者需要知道的内容（为什么这样调用），不写维护说明。
- “Arco 没有对应项”的 EP 属性也要给示例（例如 `checkbox` 的按钮组、`tabs` 的 `border-card`），在说明里注明“Arco 没有对应项，按 Arco 风格延伸”或“保留 EP 形态”。用户依赖的 EP 配置都必须能正常显示（见 `core/principles.md`）。

## 3. 指南页

- 中文 `site/guide/<page>.md`，英文 `site/en/guide/<page>.md`，在 `config.mts` 的 `sidebar()` 里 `guide` 数组登记，中英文都要加。
- 用法、命令、导入路径必须以 `README.md` 和 `packages/theme-arco/package.json` 的 `exports` 为准，不能凭记忆写。
- 指南页要有右侧目录（不要写 `aside: false`）；`aside: false` 只用于设计变量、全局变量这类宽表格页。

## 4. 验证（必须）

每完成一批页面：

1. `pnpm site:build` 通过，输出里没有 error 和 Vue 的 SSR 告警（`[Vue warn]`）。
2. 用页面检查脚本（`site/scripts/check-pages.mjs`，见 `docs/plans/site-components.md` 的阶段 0）跑本批页面，覆盖“亮色 / 暗色 × Arco 主题 / EP 原版 × 中文 / 英文”。要求：
   - 控制台没有报错，没有 `[Vue warn]`；
   - 每个示例的预览区有内容（高度 > 0，且没有“组件未找到”）；
   - 切到 EP 原版时示例确实变成 EP 样式（脚本会抽查）。
3. 打开截图看一遍：示例不溢出预览框、不和下一节重叠，弹出类示例点开后位置正常，暗色下文字可读。
4. 右侧目录、面包屑（“组件 / 分组”）、侧栏选中项正确；搜索能搜到新页面的标题。

## 5. 交付

- 说明本次完成了哪些页面、哪些示例做了交互改写、有哪些已知问题没解决。
- 提交、推送只在用户授权后进行；提交作者邮箱用 `xiaoi66@icloud.com`，提交信息里不加 AI 署名或 `Co-Authored-By`。
