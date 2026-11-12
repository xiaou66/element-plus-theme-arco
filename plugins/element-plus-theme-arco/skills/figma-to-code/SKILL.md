---
name: figma-to-code
description: Turn a Figma design built with the "Arco for Element Plus" UI Kit into Element Plus (Vue) code. Use when the user gives a figma.com link and wants a page, form, dialog or component implemented with Element Plus / element-plus-theme-arco. 用户给出 Figma 链接、要求用 Element Plus 实现设计稿时使用。
---

# Figma → Element Plus

设计稿里的组件来自「Arco for Element Plus · UI Kit」。组件代码由 `element-plus-theme-arco-figma` 按属性映射生成，**直接采用它的输出，不要改写组件写法**。

## 1. 生成组件代码

先试直连（只占用最终代码的上下文）：

```bash
npx -y element-plus-theme-arco-figma "<Figma 链接（带 node-id）>"
```

- 成功：stdout 就是 import + 组件代码，进入第 2 步。
- 退出码 2（没有 Figma 令牌）或 429（额度不够）：改走 Figma MCP：
  1. `npx -y element-plus-theme-arco-figma extract "<链接>"`，输出是一段只读脚本。
  2. 先对文件调用 `create_session`，再用 `use_figma` 原样执行这段脚本。
  3. 把返回的 JSON 原样传给 `npx -y element-plus-theme-arco-figma run -`（通过 stdin）。
- 链接里没有 `node-id` 时，请用户在 Figma 里选中要实现的 Frame 后复制链接。

## 2. 组装

- `<!-- 名称 -->` 注释对应设计稿里的分组 Frame。布局（排列、间距、尺寸）用 `get_screenshot` 看设计稿，按项目现有的布局写法实现，间距优先用项目已有的工具类或 CSS 变量。
- `v-model="value"`、`:data="data"`、`@click="confirm"` 等是占位绑定，改成业务里的真实变量和方法；`<!-- xxx initial value: ... -->` 给出了设计稿里的选中状态。
- 颜色、圆角写 CSS 变量（`var(--el-color-primary)` 等），不写色值。
- stderr 里列出的「没有模板的组件」需要对照截图手写；设计稿里不是组件实例的部分（自绘图形、纯文字）同样对照截图实现。
- 尺寸：设计稿用「Control Size」变量模式区分 Small / Large，看截图判断，需要时加 `size`，或在 `el-config-provider` 上统一设置。
- 暗色、毛玻璃由 `html.dark` / `html.glass` 控制，不要写进组件。
