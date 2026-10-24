# Switch

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_switch.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_switch.scss`
> - 暗色修正 `../../../packages/theme-arco/src/dark/_white.scss`
> - 对照用例 `../../../playground/src/demos/SwitchDemo.vue`（`#switch`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| `size` default | default（24px 高、40px 宽） |
| `size="large"` | Arco 没有；按 EP 的档差（高 +4、宽 +10、圆钮 +4）延伸为 28px 高、50px 宽、20px 圆钮 |
| `size="small"` | small（16px 高、28px 宽） |
| `inline-prompt` + `active-text` | `checked-text` / `unchecked-text` |
| `active-text` 等外部文字 | 无对应，沿用 EP 布局，颜色改为 text-1 |

## 2. 关键实现

- 去掉 EP 的 1px 同色边框，圆钮距边 4px（small 2px）；关闭 fill-4、打开主色。
- 禁用不降低透明度，而是换成 fill-2 / primary-light-3。
- 内嵌文字：圆钮一侧留 26px、另一侧 8px，12px 白字。
- 暗色：圆钮是 Arco 的 `--color-bg-white`（#f6f6f6），内嵌文字是 90% 白。

## 3. 已知差异

- loading 图标不同（图标集）。
