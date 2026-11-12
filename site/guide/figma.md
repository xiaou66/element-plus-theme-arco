# Figma

主题配套一套 Figma 组件库「Arco for Element Plus · UI Kit」：组件、变体和设计变量都与本主题一一对应，变量支持亮色、暗色、毛玻璃四种模式。用这套组件库画的设计稿，可以用 `element-plus-theme-arco-figma` 直接转成 Element Plus 代码，最适合交给 AI 来做。

```vue
<!-- 设计稿里的 Button（Type=Primary，Style=Plain，State=Disabled，图标 Search）生成： -->
<el-button type="primary" plain disabled :icon="Search">Submit</el-button>
```

只有从组件库拖出来的组件实例能被识别；自己画的图形、纯文字仍需对照设计稿实现。

## 组件库

组件库在 Figma Community 免费提供：[Arco for Element Plus · UI Kit](https://www.figma.com/community/file/1702742375809666570)。在页面上点 Open in Figma，复制一份到自己的草稿或团队。要在多个设计稿里共用，把复制出的文件发布为组件库（Assets → Publish），再在设计稿里通过 Assets → Libraries 启用。

| 页面 | 内容 |
| --- | --- |
| Getting Started | 使用说明，同一组组件在四种主题模式下的实时预览、三种尺寸的对比 |
| Colors、Typography & Effects | 每个主题变量在四种模式下的色值；文字样式、阴影和玻璃效果样式、圆角与间距 |
| Icons | Element Plus 图标，组件里通过图标属性替换 |
| Basic、Form、Data Display、Navigation、Feedback、Others | 按 Element Plus 文档分组的组件，每个组件旁有对应的 EP 写法说明 |

### 主题与尺寸

组件的颜色和尺寸都绑定了变量，在 Figma 右侧面板给任意 Frame 切换变量模式即可：

| 变量集合 | 模式 | 对应代码 |
| --- | --- | --- |
| Theme | Light、Dark、Glass Light、Glass Dark | 默认、`html.dark`、`html.glass`、`html.dark.glass` |
| Control Size | Default、Small、Large | 组件的 `size`，或 `el-config-provider` 的全局 `size` |

- 玻璃模式的颜色是半透明的，要放在壁纸、渐变或图片背景上才看得出效果；浮层（Dialog、Popover、Dropdown 等）再加上效果样式 `Glass/Overlay`（背景模糊加阴影），因为 Figma 的效果不能随变量模式切换。
- Dialog、Drawer、MessageBox 与 Arco 一样没有阴影，靠遮罩和页面区分。

### 交给开发

开发者在 Dev Mode 里看到的颜色、圆角是主题的 CSS 变量名（如 `var(--el-color-primary)`），每个组件的描述里写了对应的 Element Plus 组件和属性。需要代码时，用下面的工具直接生成。

## 转代码：准备

读取设计稿有两种方式，任选其一：

| 方式 | 需要 | 特点 |
| --- | --- | --- |
| Figma 令牌直连 | Figma 个人访问令牌 | 一条命令出代码，AI 上下文里只出现最终代码；推荐 |
| Figma MCP | AI 工具已连接 Figma MCP | 不需要令牌；导出的数据会经过 AI 上下文，组件多时占用更多 |

两种方式都不需要 Figma Organization 套餐。

### 生成 Figma 令牌

1. Figma → Settings → Security → Personal access tokens → Generate new token，权限勾选 **File content: Read only**。任何套餐都能生成。
2. 保存到只有自己能读的文件（或设置环境变量 `FIGMA_ACCESS_TOKEN`）：

```bash
(umask 077; printf '%s' 'figd_xxx' > ~/.figma-token)
```

读取一次设计稿只发 1 个请求。额度取决于你在设计稿所在团队里的席位：Full、Dev 席位每分钟 10 到 20 次；View、Collab 席位每月约 20 次，不够用时改用 Figma MCP。

## 在 Claude Code 里使用

安装插件（只需一次，所有项目生效）：

```
/plugin marketplace add xiaou66/element-plus-theme-arco
/plugin install element-plus-theme-arco@element-plus-theme-arco
```

之后直接把设计稿链接交给 AI：

```
按这个设计稿实现登录页：https://www.figma.com/design/xxx/yyy?node-id=12-345
```

插件里的 skill 只在遇到 Figma 链接时加载。AI 会先用令牌直连；没有令牌时自动改用 Figma MCP，生成组件代码后再对照设计稿截图补布局、绑定数据。

链接要带 `node-id`：在 Figma 里选中要实现的 Frame，右键 → Copy link to selection。

## 在其他 AI 工具里使用

Cursor、Codex 等工具没有插件机制，把下面这段放进项目的 `AGENTS.md`、`.cursor/rules` 或同类文件：

````md
## Figma 设计稿转代码

用户给出 Figma 链接、要求用 Element Plus 实现设计稿时：

1. 执行 `npx -y element-plus-theme-arco-figma "<带 node-id 的链接>"`，输出就是 import + 组件代码。
   - 退出码 2（没有 Figma 令牌）时：执行 `npx -y element-plus-theme-arco-figma extract "<链接>"`，把输出的脚本交给 Figma MCP 的 `use_figma` 执行，返回的 JSON 通过 stdin 传给 `npx -y element-plus-theme-arco-figma run -`。
2. 组件代码直接采用输出，不要改写；`<!-- 名称 -->` 对应设计稿的分组，布局和间距对照设计稿截图实现。
3. `v-model="value"` 等是占位绑定，改成真实变量；颜色、圆角用 CSS 变量，不写色值。
````

## 手动使用

```bash
npx element-plus-theme-arco-figma "<Figma 链接>"          # 令牌直连，直接输出代码
npx element-plus-theme-arco-figma extract "<Figma 链接>"  # 打印 Figma MCP 导出脚本
npx element-plus-theme-arco-figma run tree.json          # 把导出的 JSON 转成代码
npx element-plus-theme-arco-figma list                   # 支持的组件
```

## 输出说明

- 开头是合并后的 import，之后每个组件一段代码；`<!-- 名称 -->` 是设计稿里的分组 Frame。
- 组合组件连同子组件一起生成：Dialog 带底部按钮，Tabs 带各个标签页并标出初始选中项，Table 按表头生成列，Menu、Steps 算出当前项。
- `v-model="value"`、`:data="data"`、`@click="confirm"` 是占位绑定；`<!-- xxx initial value: ... -->` 给出设计稿里的选中状态。

以下内容不会生成，需要对照设计稿处理：

- 交互态：设计稿里的 Hover、Focus、Active 只是展示，不对应任何属性。
- 尺寸：设计稿用「Control Size」变量模式切换 Small、Large，需要时加 `size`，或在 `el-config-provider` 上统一设置。
- 布局、间距和组件以外的内容。
- 主题：暗色、毛玻璃由 `html.dark`、`html.glass` 控制，参见 [暗色模式](./dark) 和 [毛玻璃](./glass)。
