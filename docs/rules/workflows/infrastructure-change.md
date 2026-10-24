# 基础设施变更流程

适用于：全局 token、构建脚本（`packages/theme-arco/scripts/`）、Vite 插件（`vite.mjs`）、Arco 兼容变量生成、playground 配置、对比脚本。这类改动影响所有组件，回归范围比单组件迁移大。

## 1. 明确影响面

- 写出改动会影响哪些产物：`dist/index.css`、`dist/theme-chalk/*`、`dist/dark.css`、`src/generated/*`、playground 的哪种模式。
- 涉及公开用法（`package.json` 的 `exports`、插件 API、使用方需要 import 的路径）时，先说明影响并取得用户同意。

## 2. 实施

按改动类型遵守下列约束：

- **构建脚本**：Sass 必须串行同步编译（`sass.compile` / `compileString`），禁止并发 `compileStringAsync`，原因见 wiki [构建与镜像](../../wiki/architecture/02-build-and-mirror.md)。构建结束必须校验镜像文件清单和 EP 的 `theme-chalk/*.css` 一致，缺文件时直接失败。
- **Vite 插件**：重定向必须走 `resolve.alias`，禁止只用 `resolveId` 钩子（依赖预构建阶段不走插件钩子）。镜像里没有的文件必须回落到 EP 原版并警告，禁止静默。
- **Arco 兼容变量**：只能改生成脚本 `scripts/gen-arco-vars.mjs`，禁止手改 `src/generated/`。提取数量异常时脚本必须失败。
- **对比脚本**：只能修正误报，见 [`verification.md`](../core/verification.md)。脚本自己启动的 dev server 退出时必须整组杀掉（`detached` + `process.kill(-pid)`），不能留下孤儿进程占端口。
- **token**：按 [`token-mapping.md`](../core/token-mapping.md)。

## 3. 验证

- 四种组合全部执行（`pnpm shot:all`，或分别跑 `pnpm shot`、`pnpm shot --dark`、`pnpm shot:ondemand`、`pnpm shot --mode ondemand --dark`），所有已迁移组件归零。
- 改了构建或插件：用 `pnpm --filter playground build:ondemand` 做一次生产构建，确认产物 CSS 里是 Arco 的值，且没有混入未使用组件的样式。
- 改了插件的回落逻辑：临时移走镜像里的一个文件，确认出现警告且回落到 EP 原版，验证后放回。
- 改了 Arco 兼容变量：运行 `pnpm verify:vars`，亮色、暗色都必须 0 不一致、0 缺失。
- 冷启动相关的改动：删除 `playground/node_modules/.vite` 后再跑一次按需模式。

## 4. 文档同步

更新对应的 wiki 篇章（构建、插件、playground、排障），命令或用法变化时同步 [`README.md`](../../../README.md)。

## 交付模板

```markdown
## 基础设施变更交付

- 改动：
- 影响的产物 / 公开用法：
- 回归结果：亮色全量 N / 亮色按需 N / 暗色全量 N / 暗色按需 N
- 额外验证：生产构建 / 回落测试 / verify:vars / 冷启动
- 未执行项及原因：
- 文档同步：
```
