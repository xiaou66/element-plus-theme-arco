# AGENTS.md

## 仓库规则

- [规则路由](docs/rules/README.md)：每次开始任务前先读，按任务类型选出主工作流和必须读取的规则。
- [知识库](docs/wiki/README.md)：主题分层、构建与镜像、按需引入、暗色、Arco 兼容变量、对照工具、各组件的迁移记录与排障。

## 约定

- 文档和代码注释用中文，注释解释“为什么”。
- 样式数值以 Arco 和 Element Plus 的源码为准，不凭记忆。
- 组件样式改动的完成标准：`pnpm shot`、`pnpm shot --dark`、`pnpm shot:ondemand`、`pnpm shot --mode ondemand --dark` 四种组合的对比报告都是 0 处差异（可以用 `pnpm shot:all` 一次并行跑完），并且看过截图。
- 提交、推送只在用户授权后进行。
