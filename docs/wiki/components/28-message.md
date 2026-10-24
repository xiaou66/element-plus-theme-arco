# Message / Notification

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_message.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_notification.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_white.scss`
> - 对照用例 `../../../playground/src/demos/MessageDemo.vue`（`#message`）

---

## 1. 变体映射（同 Alert）

| Element Plus | Arco |
| --- | --- |
| `type` primary / success / warning / error | info / success / warning / error |
| `type="info"` | normal（保留 EP 的灰色图标） |
| Message `plain` | 保留 EP 的形态：无可见描边、只有阴影（与默认的描边形态区分） |

## 2. 关键实现

- Message：白底、border-2 描边、shadow2、10px 16px；文字 text-1，只有图标是类型色（20px）。Arco 的图标是放在块级 span 里的行内 svg，照同样的结构排，高度才在不同设备像素比下都一致。
- Notification：340px、20px 内边距、4px 圆角；标题 16px / 500，与内容 4px；标题和内容的行高继承外部；关闭按钮右上角 12px、12px 图标。
- 对照用例直接渲染两边内部的单条组件（EP `message2.mjs`、Arco `message/message.js`），在 playground.css 里取消 fixed 定位。

## 3. 已知差异

- 图标集不同（info 是斜体 i / 正体 i 等）。
