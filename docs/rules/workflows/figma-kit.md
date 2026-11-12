# 工作流：维护 Figma 组件库与设计稿转代码

适用于修改 Figma 组件库「Arco for Element Plus · UI Kit」（fileKey `poAXj8MRPolt3HKremBdRA`），或修改 [`packages/figma`](../../../packages/figma/) 里的模板、执行器、命令行。原理和设计取舍见 [wiki：Figma 组件库与设计稿转代码](../../wiki/engineering/03-figma.md)。

## 1. 改 Figma 组件库

- 颜色、圆角、间距必须绑定变量，禁止写死；数值以主题构建产物（`packages/theme-arco/dist` 的 CSS 变量）为准。新增的颜色变量要给四个模式（Light / Dark / Glass Light / Glass Dark）都填值，并写 Web code syntax（`var(--el-*)`）。
- 主题 token 或组件样式变化后，同步更新组件库里对应的变量和组件（原地修改，不重建），保证两边一致。
- 只改源文件（fileKey `poAXj8MRPolt3HKremBdRA`），改完在 Figma 里对 [Community 页面](https://www.figma.com/community/file/1702742375809666570) 发布更新（Publish update）；使用者复制出的文件不会自动更新，更新说明里要写清改了什么。
- 每画完或改完一批组件都要截图检查：文字是否截断、图标是否对齐、组件是否随内容自适应（auto layout 的 `resize()` 要在设置 `AUTO` 之前调用）、四个主题模式下颜色是否正确（不能出现写死的浅色）。
- 改了组件属性（名称、变体取值、新增或删除属性）时，必须同步改对应模板，见第 2 步。属性改名不会影响已有实例，但模板按名字取值。

## 2. 改模板或执行器

- 模板文件 `templates/<分组>/<组件>.figma.ts`，文件头必须有 `// figma=<Figma 组件集或组件名>`（与 Figma 里的名字完全一致）、`url`、`source`、`component`。
- 属性名必须与 Figma 完全一致（区分大小写），用 Figma MCP 的 `get_context_for_code_connect` 查，禁止凭记忆。
- 变体用 `getEnum`，必须列全所有取值。纯交互态（Hover / Focus / Active）映射为无输出；EP 没有对应 prop 的属性直接省略，并在模板里写注释说明原因。禁止生成 EP 组件没有的属性。
- 生成的代码必须是使用者可以直接复制的正常写法；代码里的注释用英文。
- 先拼出代码字符串 `code`，`example` 和 `metadata.props.code` 都用它；父模板只通过子模板的 `metadata.props` 取值，不拼接模板结果。
- 新增组件时，在 `test/` 里加一份覆盖它的实例数据。

## 3. 验证（必须）

```bash
pnpm --filter element-plus-theme-arco-figma test   # 执行全部模板、编译生成的 Vue 模板、比对快照、REST 解析测试
```

- 快照有变化时，逐段看过输出确认是预期改动，再执行 `node test/run-tests.mjs --update`（在 `packages/figma` 下）。
- 改了 `lib/rest.mjs` 或 `extract.js` 时，用真实设计稿各跑一次 REST 直连和 MCP 导出，确认两者的精简实例树一致。
- 改了模板格式相关的内容时，执行 `pnpm --filter element-plus-theme-arco-figma parse` 确认官方 Code Connect CLI 仍能解析。

## 4. 同步文档

- 使用方式、命令、输出格式变化：同步 [`packages/figma/README.md`](../../../packages/figma/README.md)、文档站 `site/guide/figma.md` 与 `site/en/guide/figma.md`、Claude Code skill（[`plugins/element-plus-theme-arco/skills/figma-to-code/SKILL.md`](../../../plugins/element-plus-theme-arco/skills/figma-to-code/SKILL.md)）。
- skill 正文保持简短（只写 AI 执行所需的步骤），它会进入使用者的 AI 上下文。
- 设计取舍或已知边界变化：同步 wiki 篇章。

## 交付模板

```md
## 改动
- Figma：<改了哪些组件 / 变量>（截图检查：<结果>）
- 模板：<新增 / 修改的模板>

## 验证
- pnpm --filter element-plus-theme-arco-figma test：<结果>
- REST / MCP 实测：<是否执行、结果>

## 文档
- <同步了哪些文档>
```
