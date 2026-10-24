# 常见问题

## 样式没生效的排查顺序

1. **覆盖文件名对不上**：`src/components/_<x>.scss` 必须和 EP 的 `theme-chalk/src/<x>.scss` 同名，否则构建时不会拼进镜像。全量模式下还要确认已在 `src/index.scss` 里 `@use`。
2. **优先级不够**：在浏览器里遍历 `document.styleSheets`，找出所有匹配该元素且声明了目标属性或变量的规则，对照优先级。EP 的嵌套选择器（如 `.el-input .el-input__count ...`）和暗色下的 `html.dark .el-xxx`（0,2,1）最常见。
3. **变量在 `:root` 上已经解析**：派生变量（如 `--el-disabled-text-color: var(--el-text-color-disabled)`）在 `:root` 上就算出了值，组件内改源变量影响不到它。
4. **按需模式看的是旧镜像**：按需模式读的是 `dist/theme-chalk/`，改了源码要先 `pnpm build`（`pnpm shot:ondemand` 已包含）。

## 5180 / 5181 端口被占用

通常是之前的对比脚本或 dev server 留下的 vite 进程。用 `ss -ltnp | grep 518` 找到 pid，`ps -o pid,cmd -p <pid>` 确认是本仓库的 vite，再结束它。

对比脚本已经改成用 `detached` 启动、退出时 `process.kill(-pid)` 整组杀掉。早期版本只杀了外层的 pnpm，会留下孤儿 vite。

注意：对比脚本发现端口上已有 server 时会直接复用。改了 `vite.config.ts` 或插件以后，如果那个 server 是旧的，测出来的就是旧结果。

## 对比脚本说“缺少成对元素”或测到错误的元素

- 检查两侧 `data-pair` 是否同名。
- 新组件的本体选择器要加进 `scripts/screenshot.mjs` 的 `TARGET`。
- `data-pair` 要写在外层 `span` 上，不要直接写在 `el-input` 上：EP 会把它透传给内部的 `<input>`。

## 按需模式第一次跑偶尔失败

镜像刚重新构建、或 `.vite` 缓存被清掉时，Vite 第一次访问页面要做依赖预构建，中途可能刷新页面，导致等待超时。脚本现在等待 server 最多 60 秒，页面加载失败会重试一次。如果仍然失败，保留错误输出再排查，不要直接重跑了事。

## 构建卡住不动

如果有人把 `build.mjs` 改回了并发的 `sass.compileStringAsync`，121 个文件会卡死（CPU 很低、内存持续上涨）。必须串行同步编译，见 [构建与镜像](../architecture/02-build-and-mirror.md)。

## 按需模式拿到的是 EP 原版样式

- 确认 `vite.config.ts` 里加了 `arcoTheme()`。
- 确认插件是通过 `resolve.alias` 重定向的。只用 `resolveId` 的话，依赖预构建阶段不会经过插件，见 [按需引入](../architecture/03-on-demand.md)。
- 启动日志里有 `[element-plus-theme-arco] 以下样式不在主题镜像中` 的警告：说明对应文件回落到了 EP 原版，需要重新构建镜像，或者 EP 版本和主题不匹配。

## 桌面 Chromium 一直停在 Loading

XFCE 桌面上第一次启动 Chromium 会弹出 “Unlock Keyring” 对话框。Chromium 在 keyring 解锁之前不会发出请求，页面就一直停在 Loading。输入密码解锁，或者点 Cancel 都可以。这和 dev server 无关，可以先用无头浏览器确认页面本身正常。

## 报告里的差异其实是测量误差

先确认是不是下面几种情况，再决定改样式还是修正对比口径（修正口径要在交付说明里写原因，见[验证规则](../../rules/core/verification.md)）：

- **入场动画**：EP 的 Tag 等组件挂载时有动画，第一对元素的尺寸偏小。脚本已经会等待有限时长的动画。
- **失焦过渡**：上一个 pair 失焦后的背景色过渡没走完，下一个 pair 的 default 态测到中间色。脚本已经会等待 CSS 过渡结束。
- **flex 子项被拉伸**：playground 的 wrapper 是 `inline-flex`，只设了 `min-height` 的元素（Arco 竖分割线）会被拉伸；给 wrapper 加 `inline-flow` 类改成普通行内排版。
- **隐藏的文字**：测宽度用的隐藏镜像、`opacity: 0` 的占位文字会被当成“第一段文字”。脚本已经跳过这些节点。
- **兄弟节点叠在下面**：颜色合成按 `elementsFromPoint` 取下面的所有层；如果测出来的底色比肉眼看到的浅，检查元素是不是被导航栏或别的元素盖住了。

## 用例里的 EP 组件没有渲染

- **Pagination**：只传 `current-page`、不监听 `update:current-page`，EP 视为废弃用法，直接不渲染（控制台有 Deprecated 警告）。用 `default-current-page` 或 `v-model:current-page`。
- **页面直接崩溃（Target crashed）**：`container-type: inline-size` 配合 `font-size: 100cqw` 会让 Chromium 崩溃，不要用容器查询单位去推导字号。
- **对比脚本报 `Element is not visible`**：EP 的 Rate 在 hover 时会替换内层图标，提前拿到的元素句柄失效。测量目标选不会被替换的外层元素。脚本出错时会带上 demo / 用例 / pair / 状态，方便定位。
