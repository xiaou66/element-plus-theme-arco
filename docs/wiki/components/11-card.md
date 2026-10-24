# Card

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_card.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_card.scss`
> - 对照用例 `../../../playground/src/demos/CardDemo.vue`（`#card`）

---

## 1. 变体映射

最初与用户确认的是“always 也无阴影”；后来规则要求 EP 的每个配置都必须继续生效（见 [迁移原则](../../rules/core/principles.md)），改为三种取值各自生效、用 ConfigProvider 得到 Arco 默认外观。

| Element Plus | Arco |
| --- | --- |
| `shadow="never"` | 默认：只有描边、无阴影 |
| `shadow="hover"` | `hoverable`：hover 时 `0 4px 10px` gray-2 阴影 |
| `shadow="always"`（EP 默认） | 一直显示同样的阴影。要和 Arco 默认一致，用 `<el-config-provider :card="{ shadow: 'never' }">` 把默认值改成 never |
| `header` | `title`：16px / 500 / text-1，标题栏 46px 高、`10px 16px` |
| `footer` | 无对应，与标题栏同样的内边距 |

## 2. 关键实现

- `$card` 配置描边 border-2、圆角 2px、内边距 16px；正文颜色 text-2。
- 暗色：EP 的 `html.dark .el-card`（0,2,1）把底色改成弹出层的 bg-5，Arco 卡片是 bg-2。

## 3. 已知差异

- 无。
