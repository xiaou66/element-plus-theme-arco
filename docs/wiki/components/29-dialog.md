# Dialog / Drawer / MessageBox

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_dialog.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_drawer.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_message-box.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_overlay.scss`
> - 对照用例 `../../../playground/src/demos/DialogDemo.vue / MessageBoxDemo.vue`（`#dialog`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| Dialog 默认（标题靠左） | Modal `title-align="start"` |
| Dialog `center` | Modal 居中（保留 EP 语义：两种对齐都能用 EP 原生属性切换，与用户确认过） |
| Dialog `align-center` | Modal 默认的垂直居中；EP 默认距顶部 15vh（保留） |
| MessageBox `center: true` | `Modal.confirm`（simple 形态）：图标在标题里、标题和按钮居中、内容靠左 |
| MessageBox 默认 | 尺寸、颜色同 simple 形态，对齐保持 EP 的（图标在内容里、按钮靠右） |
| Drawer | Drawer：标题栏 48px、左右 16px；内容 12px 16px；底部 16px |

## 2. 关键实现

- Dialog：520px、4px 圆角、无阴影；标题栏 48px、下方分割线、标题 16px / 500；内容 24px 20px；底部 16px 20px、上方分割线、按钮间距 12px。
- 关闭按钮 12px、text-1，hover 时 20px 的 fill-2 圆底；Arco 的关闭按钮用负外边距叠在标题区上，标题区仍然占满。
- MessageBox：EP 是 border-box，宽度写 464px（Arco 内容区 400px + 左右 32px）。标题图标照 Arco 的结构排（块级、行高 1.5715，svg `vertical-align: -2px`）。
- 遮罩：Arco `--color-mask-bg`，在 token 层 `$overlay-color` 配置；暗色下弹窗底色是 bg-3（#2a2a2b），弹窗里的 secondary 按钮按 bg-3 重新合成（`dark/_overlay.scss`）。

## 3. 已知差异

- Drawer 的宽度：EP 默认 30%、Arco 250px，写在行内样式上。
- MessageBox 默认显示关闭按钮（EP `show-close`），Arco simple 形态没有。
