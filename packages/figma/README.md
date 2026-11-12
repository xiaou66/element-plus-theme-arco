# element-plus-theme-arco-figma

把用「Arco for Element Plus · UI Kit」画的 Figma 设计稿转成 Element Plus（Vue）代码。配合主题包 [element-plus-theme-arco](https://github.com/xiaou66/element-plus-theme-arco) 使用。

```bash
npx element-plus-theme-arco-figma "https://www.figma.com/design/xxx/yyy?node-id=12-345"
```

```vue
import { Search } from '@element-plus/icons-vue'

<!-- Form -->
<el-input v-model="input" placeholder="Username" :prefix-icon="Search" />

<el-button type="primary">Sign in</el-button>
```

- 设计稿里的每个组件实例按属性生成对应的 `<el-xxx>` 写法（`type`、`plain`、`disabled`、`:icon` 等），组合组件（Dialog、Tabs、Table、Menu……）连同子组件一起生成。
- 支持 92 个组件和 58 个图标：`npx element-plus-theme-arco-figma list`。
- 不需要 Figma Organization 套餐；Figma 个人访问令牌或 Figma MCP 二选一即可。

## 两种读取方式

### 方式一：Figma 令牌直连（推荐，AI 上下文只出现最终代码）

1. Figma → Settings → Security → Personal access tokens → Generate new token，权限勾选 **File content: Read only**。所有套餐都能生成。
2. 保存令牌（二选一）：

   ```bash
   export FIGMA_ACCESS_TOKEN=figd_xxx                            # 环境变量
   (umask 077; printf '%s' 'figd_xxx' > ~/.figma-token)           # 或写入只有自己可读的文件
   ```

3. 执行：`npx element-plus-theme-arco-figma "<Figma 链接>"`。链接要带 `node-id`（在 Figma 里选中图层后复制链接）。

读取一次只发 1 个请求。额度取决于你在文件所在团队里的席位：Full / Dev 席位每分钟 10～20 次；View / Collab 席位每月约 20 次，额度不够时用方式二。

### 方式二：Figma MCP（不需要令牌）

```bash
npx element-plus-theme-arco-figma extract "<Figma 链接>"   # 打印一段只读脚本
```

把脚本交给 Figma MCP 的 `use_figma` 执行，返回的 JSON 存成文件，再执行：

```bash
npx element-plus-theme-arco-figma run tree.json            # 或通过 stdin：... | npx element-plus-theme-arco-figma run -
```

没有令牌时直接用方式一，命令以退出码 `2` 结束并提示改用方式二，AI 可以据此自动切换。

## 在 AI 工具里使用

- **Claude Code**：安装插件，之后给 AI 一个 Figma 链接即可，AI 会自动调用本工具：

  ```
  /plugin marketplace add xiaou66/element-plus-theme-arco
  /plugin install element-plus-theme-arco@element-plus-theme-arco
  ```

- **其他 AI 工具**（Cursor、Codex 等）：把 [文档站「Figma 设计稿转代码」](https://github.com/xiaou66/element-plus-theme-arco/blob/main/site/guide/figma.md) 里给出的说明粘贴进项目的 `AGENTS.md` / `.cursor/rules`。

## 输出说明

- 开头是合并后的 import，之后每个组件一段代码；`<!-- 名称 -->` 对应设计稿里的分组 Frame。
- `v-model="value"`、`:data="data"` 等是占位绑定，按业务改成真实变量；`<!-- xxx initial value: ... -->` 给出设计稿里的选中状态。
- 不生成：交互态（Hover / Focus / Active）；尺寸（设计稿用变量模式切换 Small / Large，需要时手动加 `size`）；布局和间距（对照设计稿实现）。
- stderr 会列出没有模板的组件，这些需要对照设计稿手写。

## 作为库使用

```js
import { generate } from 'element-plus-theme-arco-figma'

const { text, imports, unmatched } = generate(tree) // tree：extract / --json 输出的实例树
```

## 开发

模板在 `templates/**/*.figma.ts`，与 Figma 官方 Code Connect 格式兼容（有 Organization 套餐时可以 `npx @figma/code-connect connect publish` 直接发布到 Dev Mode）。

```bash
pnpm --filter element-plus-theme-arco-figma test          # 执行全部模板、编译生成的 Vue 模板、比对快照
node test/run-tests.mjs --update                          # 确认输出改动无误后更新快照
```

新增组件：用 Figma MCP 的 `get_context_for_code_connect` 查组件属性，按现有模板写 `ComponentName.figma.ts`（文件头 `// figma=<组件名>`；先拼出 `code` 字符串，`example` 与 `metadata.props.code` 都用它；变体用 `getEnum` 且列全取值），再在 `test/` 里加实例数据。
