# Alert

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_alert.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_alert.scss`
> - 对照用例 `../../../playground/src/demos/AlertDemo.vue`（`#alert`）

---

## 1. 变体映射（按颜色对应，与用户确认过）

| Element Plus | Arco |
| --- | --- |
| `type="primary"` | `info`（蓝） |
| `type="info"` | `normal`（neutral-2 灰底、无默认图标） |
| `success / warning / error` | 同名 |
| `description` | 带 `title` 的形态 |
| `effect="dark"` | 无对应，沿用 EP 的实心样式 |

## 2. 关键实现

- 文字一律 text-1，只有图标是类型色；描述文字 text-2。1px 透明边框 + `8px 15px` 内边距，行高 1.5715。
- 有描述时（`:has(.el-alert__description)`）：顶端对齐、15px 内边距、图标 18px、标题 16px / 500。
- 关闭按钮：EP 的关闭按钮在 `__content` 内部（纵向排列），不能像 Arco 那样排在内容后面；按 Arco 的实际位置绝对定位（右 15px，无描述时垂直居中，有描述时距顶 18px），并给内容留出 20px。
- 暗色：文字是半透明白叠在浅色底上（`dark/_text.scss`）；info 的底色在暗色下是不透明的 gray-2（`dark/_alert.scss`）。

## 3. 已知差异

- info / success 等图标的字形不同（图标集）。
