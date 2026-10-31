# CLAUDE.md

本文件为 Claude Code 在本仓库工作时提供指引。

## 先读

- `AGENTS.md` 是入口。开始任何任务前先读 `docs/rules/README.md`（规则路由），它会按任务类型指定一个主工作流（`docs/rules/workflows/*.md`）和需要读取的规则（`docs/rules/core/*.md`）。只读路由要求的文件，不要全量加载 `docs/rules/`。
- 原理和背景在 `docs/wiki/README.md`，迁移一个新组件前建议先读 `architecture/01-theming-layers.md` 和 `engineering/01-playground-and-compare.md`。

## 命令

```bash
pnpm install
pnpm dev              # 对照 playground，全量模式 http://localhost:5180（?theme=raw 看 EP 原版，?dark=1 暗色，?glass=1 毛玻璃）
pnpm dev:ondemand     # 按需模式 http://localhost:5181（先构建镜像）
pnpm build            # 生成 Arco 兼容变量并构建 packages/theme-arco/dist
pnpm shot [demo...]   # 截图并对比样式，报告在 .compare/report.md
pnpm shot --dark      # 暗色对比；可与 --mode ondemand 组合
pnpm shot:ondemand    # 按需模式对比（含构建）
pnpm shot:all [demo...] # 构建后并行跑四种组合和变量校验，输出汇总
pnpm verify:vars      # 校验 Arco 兼容变量与 Arco 原版一致（需先 build）
pnpm site:dev         # 本地预览文档站
pnpm site:build       # 构建文档站
pnpm site:check       # 检查文档站页面（需先构建并启动生产 preview）
```

## 结构

- `packages/theme-arco/`：主题包。`src/tokens/` 是 Arco token，`src/common/var.scss` 配置 EP 的 SCSS 变量，`src/components/_<x>.scss` 是与 EP 同名的组件覆盖，`src/dark/` 是暗色，`src/generated/` 由脚本生成（不要手改），`vite.mjs` 是按需引入插件。
- `playground/`：左边 EP 加主题、右边 Arco 原版的对照页面，用例在 `src/demos/`。
- `scripts/`：对比脚本 `screenshot.mjs`，Arco 变量校验 `verify-arco-vars.mjs`。
