# Input OTP / Scrollbar / Mention

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_input-otp.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_scrollbar.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_mention.scss`
> - 对照用例 `../../../playground/src/demos/MiscDemo.vue`（`#misc`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| InputOtp `type="filled"` | VerificationCode |
| InputOtp `outlined`（默认）/ `underlined` | Arco 没有；保留 EP 的形态，格子尺寸同 Arco |
| Scrollbar | Scrollbar `type="embed"` |
| Mention | Mention：输入框同 Input，面板同 Select 下拉 |

## 2. 关键实现

- InputOtp：格子宽 = 高（28 / 32 / 36）、间距 4px、text-1；输入框加 1px 左右内边距，对齐 Arco 格子的 1px 真实边框。
- Scrollbar：滑块 9px、距边 3px、6px 圆角、gray-4，hover gray-6，不透明。

## 3. 已知差异

- Arco 的 VerificationCode 撑满容器、格子平均分布，EP 是固定间距。
- Arco 聚焦已填格子时会把焦点转到第一个空格（JS 行为）。
- 滚动条滑块长度由两边的 JS 各自计算。
- Mention 的下拉面板在输入框失焦时就会关闭，对比脚本测不到；手动输入“@”核对过，样式同 Select 下拉，位置跟着光标（见 [45-tour-virtual.md](./45-tour-virtual.md)）。
