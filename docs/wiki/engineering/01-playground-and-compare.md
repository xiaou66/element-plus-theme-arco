# 对照 playground 与对比脚本

> 迁移质量靠一个闭环保证：同一页面左右放 EP（套主题）和 Arco 原版，脚本逐对测量样式差异，改到报告归零，再人工看截图。
> 关键文件：
>
> - 应用入口 `../../../playground/src/main.ts`、`../../../playground/src/App.vue`
> - 对照容器 `../../../playground/src/components/CompareCase.vue`
> - 用例 `../../../playground/src/demos/`
> - 模式配置 `../../../playground/vite.config.ts`
> - 对比脚本 `../../../scripts/screenshot.mjs`
> - 规则 [`verification.md`](../../rules/core/verification.md)

---

## 1. 四种运行方式

| 命令 | 端口 | EP 样式来源 | 用途 |
| --- | --- | --- | --- |
| `pnpm dev` | 5180 | 直接编译 `src/index.scss` 和 `src/dark/css-vars.scss` | 日常迁移，改主题源码有 HMR |
| `pnpm dev` + `?theme=raw` | 5180 | EP 原版 `dist/index.css` | 看主题改动前的样子 |
| `pnpm dev:ondemand` | 5181 | resolver 加 `arcoTheme()` 插件重定向到构建好的镜像 | 按使用方的真实方式验证；改源码后要重新 `pnpm build` |
| 任一方式 + `?dark=1` | — | 同上，再加暗色 | 两侧同时切暗色：EP 加 `html.dark`，Arco 加 `body[arco-theme=dark]` |

页面顶部有暗色切换按钮，状态写在 URL 的 `?dark=1` 上，截图脚本直接用这个参数。

## 毛玻璃预览

页面顶部还有「毛玻璃」按钮，状态写在 `?glass=1` 上，给 `<html>` 加 `glass` 类（可和 `?dark=1` 叠加）。它只作用于左侧的 EP 主题，Arco 原版没有毛玻璃；预览用的壁纸和半透明的用例卡片在 `playground.css`，主题本身不画背景。毛玻璃没有 Arco 对照项，所以 `pnpm shot` 不比较它，玻璃外观用 `?glass=1` 截图对照设计稿。

对比脚本用的是不带 `glass` 的默认外观。另外 Select 下拉、Dropdown 的选项带 4px 内边距（`--arco-option-inset`）是相对 Arco 的有意差异，`playground.css` 在默认状态下把它设成 0，让对比只比其余部分，毛玻璃下按默认的 4px 显示，见 [Select](../components/27-select.md)。

按需模式下不会 `app.use(ElementPlus)`，组件全靠 resolver 自动导入。Arco 一侧始终全量注册，它只是参照物。

完整回归用 `pnpm shot:all`（`scripts/shot-all.mjs`）：先构建，再起好两个 dev server，然后并行跑四组对比和变量校验，最后只关掉它自己起的 server。

- 为什么要先起 server：`screenshot.mjs` 发现端口上没有 server 时会自己起一个，并在结束时关掉。几组对比各自起、各自关，先跑完的一组会把另一组还在用的 server 关掉。
- 为什么要预热：冷启动时 Vite 要预构建依赖，首次访问可能中途整页刷新；几组并行时更慢，第一个用例等 20 秒还没出现就会失败。`screenshot.mjs` 开始比较前先打开一次页面，最多等 2 分钟，直到用例渲染出来、网络空闲。

## 2. 用例写法

```vue
<CompareCase id="button-types" title="基础类型" note="EP 默认按钮 ↔ Arco secondary">
  <template #ep>
    <span data-pair="primary"><el-button type="primary">Primary</el-button></span>
  </template>
  <template #arco>
    <span data-pair="primary"><a-button type="primary">Primary</a-button></span>
  </template>
</CompareCase>
```

- 同一个 `.case` 里，`.side-ep` 和 `.side-arco` 下 `data-pair` 相同的两个元素是一对。
- 外面包一层 `span` 是因为 `el-input` 会把 `data-*` 透传给内部的 `<input>`，不包的话标记会落到错误的元素上。
- 两侧单元格都用 `gap` 排布，并去掉了 EP 自带的 `.el-button + .el-button` 间距，保证比较公平。
- EP 一侧可以写 `data-skip="focus"`，跳过两边行为本来就不同的状态。

### 弹出层、对话框、消息

这类组件平时要触发才出现、并且渲染到 body，对比脚本测不到。用例里让两侧都**常开、渲染在 wrapper 内部**：

| 组件 | EP | Arco |
| --- | --- | --- |
| Tooltip / Popover / Popconfirm | `:visible="true" :teleported="false"` | `popup-visible popup-container="#id"`，加 `:auto-fit-position="false"` 防止翻转 |
| Dropdown / Select | `:teleported="false"`，挂载后调用 ref 的 `handleOpen()` / `toggleMenu()` | `popup-visible popup-container="#id"`（Select 用 `:trigger-props`） |
| Dialog / Drawer | 默认不 append-to-body，加 `:modal="false"` | `:render-to-body="false" :mask="false"` |
| MessageBox | `ElMessageBox.confirm(..., { appendTo: '#id', modal: false })` | `<a-modal simple ...>` |
| Message / Notification | 直接渲染内部组件 `message2.mjs` / `notification2.mjs` | 直接渲染 `es/message/message.js` / `es/notification/notification.js` |

fixed 定位的容器在 playground.css 里改成相对格子定位（`.pop-box`、`.static-dialog`、`.static-pop`），只影响 playground，不影响主题。

## 3. 对比脚本做了什么

`pnpm shot [demo...] [--dark] [--mode ondemand]`：

1. 端口上没有 server 时自己启动一个，退出时整组杀掉。冷启动最多等 60 秒；页面加载失败会重试一次，因为 Vite 首次访问时可能重新预构建依赖并刷新页面。
2. 每个 `.case` 截一张图。
3. 对每一对元素，在 default、hover、focus 三种状态下测量样式，不一致的写进报告。
4. 产物写到 `.compare/`；按需模式加 `-ondemand` 后缀，暗色加 `-dark` 后缀。

### 测量什么

默认测量目标是 wrapper 里第一个匹配 `TARGET` 的组件本体（`.el-button`、`.arco-btn`、`.el-input__wrapper`、`.arco-input-wrapper` 等）。wrapper 上的几个属性可以调整测量方式：

| 属性 | 写在 | 作用 |
| --- | --- | --- |
| `data-target=".a|.b"` | 两侧各写各的选择器，数量相同 | 按顺序逐个测量组件内部的部件（Radio 的圆圈和文字、Tag 的关闭按钮等） |
| `data-pos` | EP 一侧 | 额外比较部件相对 wrapper 的位置（`left` / `top`），用于绝对定位的部件和布局 |
| `data-width` | EP 一侧 | 比较宽度。默认只有按钮类 pair 比较宽度，输入框的宽度由容器决定 |
| `data-skip="focus"` | EP 一侧 | 跳过两边行为本来就不同的状态 |

| 字段 | 说明 |
| --- | --- |
| `width` / `height` | 只对文字相同、宽度有意义的 pair 比较宽度 |
| `contentX` | 内容起点相对组件左边缘的偏移：有可见输入框时取输入框，否则取第一段可见文字的实际位置，再否则取 padding + border |
| `fontSize` / `fontWeight` / `color` | 有可见输入框时取输入框，否则取第一段可见文字所在的元素；没有文字也没有图标时不比较，只有图标时不比较字重 |
| `background` | 合成到实际背景之后的颜色 |
| `edge` | 边框：真实 border 和 inset box-shadow 统一折算；取第一条可见的边 |
| `ring` | 外扩的 box-shadow（focus 环） |
| `radius` | 超过半高的统一截断为半高 |

### 归一化：为什么这样测

每一项都是为了消除“写法不同但看起来一样”造成的误报：

- **边框**：EP 输入框用 `inset box-shadow` 画边框，Arco 用 `border`，直接比两个属性永远不相等。分割线一类组件 EP 画上边框、Arco 画下边框，视觉上是同一根线，所以取第一条可见的边。
- **内容偏移**：EP 的 box-shadow 边框不占位置，只比 padding 会差 1px；Arco 的 radio-button 把 padding 写在内层的 content 上。真正影响视觉的是文字从哪里开始，所以按第一段可见文字的位置算。
- **隐藏的元素**：Radio / Checkbox 里隐藏的原生 input、InputTag 用来测宽度的隐藏镜像、Arco Switch 里 `opacity: 0` 的 text-holder，都不算“输入区”或“文字”。`font-size: 0` 的文字（EP ColorPicker 触发器里的无障碍文字）、`display: none` 的图标也不算，判断“有没有文字 / 图标”时只看可见的。
- **文字色取文字所在的元素**：Arco Switch 的根节点是 `<button>`（UA 默认黑色），文字色写在内层。
- **颜色合成**：Arco 暗色下大量使用半透明色，EP 用的是合成后的不透明色。脚本按元素中心点取下面所有可见的层（`elementsFromPoint`）依次合成，而不是只看祖先：EP InputNumber 的按钮是叠在输入框上的兄弟节点。纯色渐变（`linear-gradient(c, c)`）按一层颜色计入。
- **胶囊圆角**：`9999px` 和 `16px` 在 32px 高的按钮上看起来完全一样。

容差：数值 ±0.5px，颜色每个通道 ±2。

### 等待动画

- 页面加载后等所有有限时长的动画结束再截图测量：EP 的 Tag 挂载时有 `el-zoom-in-center` 入场动画，第一对会测到动画中途的尺寸。
- 每次切换状态后等 CSS 过渡结束：上一个 pair 失焦后的背景色过渡还没走完时，下一个 pair 的 default 态会测到中间色。
- 测量前只滚动窗口，不用 `scrollIntoView`：它会连带滚动 `overflow: hidden` 的内部容器（Arco InputNumber 的按钮列），把元素挪位 1px。

### 报告测不到的

伪元素、遮罩、图标形状、文字格式、resize 手柄都不在测量范围内。Button 的 loading 遮罩和 Input 字数统计的白底都是看截图才发现的，所以报告归零后必须看截图。

弹出层（Autocomplete 的下拉面板）和需要滚动才出现的组件（Backtop）也不在自动测量范围内，迁移时用临时脚本打开 / 滚动后逐项核对几何和颜色，结论记在对应的组件篇里。

## 失焦就关闭的弹出层

对比脚本测每个状态前会先让焦点失焦（`document.activeElement.blur()`），在失焦时关闭并卸载面板的组件测不到：
TreeSelect、Mention 的下拉，ElTimePicker 的面板。处理方式：

- 能单独渲染面板的就单独渲染：DatePicker 用 `ElDatePickerPanel`，ColorPicker 用 `ElColorPickerPanel`，
  TimePicker 用 EP 导出的 `TimePickPanel` 并自己提供 `PICKER_BASE_INJECTION_KEY`（`playground/src/components/TimePanelHost.vue`）。
- 不能单独渲染的只看截图，并在用例的说明里写清楚原因。
- 同一页上打开一个下拉会让另一个失焦关闭（TreeSelect 和 Cascader），这种用例分页放。
