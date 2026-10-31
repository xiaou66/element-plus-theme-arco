# AI 开发规则路由

本目录是本仓库开发流程与样式迁移规范的唯一事实源。开始任务时先完成本页路由，再读取对应文件；不要默认全量加载 `rules/`。

讲“为什么这样设计、原理是什么”的内容在 [`docs/wiki/`](../wiki/README.md)，本目录只写必须遵守的约束。

## 执行顺序

1. 识别主要交付目标，选择且只选择一个主工作流。
2. 读取路由表列出的公共规则和主工作流。
3. 按主工作流实施，迭代到验证规则要求的结果。
4. 交付时使用工作流里的交付模板；规则、wiki 需要同步的一并同步。

完成标准：适用规则已全部读取，主工作流唯一，验证范围已经确定。

## 任务路由

| 主要交付目标 | 必读公共规则 | 主工作流 |
| --- | --- | --- |
| 迁移一个新组件的 Arco 样式 | `core/principles.md`、`core/token-mapping.md`、`core/component-override.md`、`core/dark-mode.md`、`core/verification.md` | `workflows/component-migration.md` |
| 修正已迁移组件的样式差异 | 同上 | `workflows/component-migration.md`（从第 3 步开始） |
| 调整全局 token、构建脚本、Vite 插件、Arco 兼容变量、playground 或对比脚本 | `core/principles.md`、`core/token-mapping.md`、`core/verification.md` | `workflows/infrastructure-change.md` |
| 编写文档站（`site/`）的组件页或指南页 | `core/principles.md` | `workflows/site-component-page.md` |
| 只创建或修改文档 | `core/principles.md` | 无；按 [wiki 维护约定](../wiki/README.md#维护约定) 执行 |

条件规则：

| 触发条件 | 补读 |
| --- | --- |
| 写组件覆盖时遇到选择器优先级、规则顺序或 EP 原有选择器的问题 | [`examples/component-override.examples.md`](examples/component-override.examples.md) |
| 改动涉及暗色（`src/dark/`、`_arco-dark.scss`、半透明色） | `core/dark-mode.md` 全文与示例中的暗色部分 |
| 改动涉及毛玻璃（`src/glass/`、`html.glass`、`--glass-*`） | `core/glass-mode.md` |

## 面向 AI 的执行约定

- 规则中的“必须”“禁止”是硬约束；“默认”只有在规则写明的例外成立时才能改变。
- 样式数值一律以 Arco 源码（`@arco-design/web-vue/es/**/style/token.less`、`index.less`、`dist/arco.css`）和 EP 源码（`element-plus/theme-chalk/src/**`）为准。禁止凭记忆或截图目测给出色值、尺寸。
- 对比报告是验收依据，但不是唯一依据：数值归零后必须看截图。报告测不到的差异（图标、遮罩、伪元素等）同样要处理或登记为已知差异。
- 遇到 CSS 无法消除的差异（DOM 结构、JS 渲染的文本、图标集），登记为已知差异，不要用 hack 硬凑。

## 提问规则

仓库与源码能确认的事实先自行核实。确实需要提问时，一次只问一个会实质改变结果的问题，并给出选项和推荐项。典型需要提问的场景：EP 和 Arco 的变体语义无法一一对应（例如 EP 的 `plain` 对应 Arco 的 `outline` 还是 `secondary` + status），需要用户决定映射关系。

## 规则优先级

`用户当前明确指令 > docs/rules 开发规则 > AGENTS.md 入口说明 > AI 默认习惯`

规则与用户指令冲突时，列出冲突并请求确认，不自行加兼容路径或静默降级。

## 规则变更

规则只在流程、约束或约定真实变化时修改。修改时同步正文、示例和相关 wiki 篇章，并在交付说明里写出变更点。
