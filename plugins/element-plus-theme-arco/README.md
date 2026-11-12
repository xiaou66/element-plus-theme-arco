# element-plus-theme-arco（Claude Code 插件）

把用 Figma 组件库 [Arco for Element Plus · UI Kit](https://www.figma.com/community/file/1702742375809666570) 画的设计稿转成 Element Plus 代码。

## 安装

```
/plugin marketplace add xiaou66/element-plus-theme-arco
/plugin install element-plus-theme-arco@element-plus-theme-arco
```

Claude Code 2.1.275 及以上可以一步安装：

```
/plugin install element-plus-theme-arco --marketplace xiaou66/element-plus-theme-arco
```

## 使用

把带 `node-id` 的设计稿链接交给 AI 即可，例如：

```
按这个设计稿实现登录页：https://www.figma.com/design/xxx/yyy?node-id=12-345
```

skill `figma-to-code` 只在遇到 Figma 链接时加载。它调用 [`element-plus-theme-arco-figma`](../../packages/figma/) 生成组件代码：有 Figma 个人访问令牌（`FIGMA_ACCESS_TOKEN` 或 `~/.figma-token`）时直连 Figma，没有时改用 Figma MCP。令牌的生成方式和输出说明见文档站 Figma 页（[`site/guide/figma.md`](../../site/guide/figma.md)）。
