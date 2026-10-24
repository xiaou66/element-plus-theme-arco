# Segmented / Anchor

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_segmented.scss`、`_anchor.scss`
> - 对照用例 `../../../playground/src/demos/NavDemo.vue`（`#nav`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| Segmented | Arco 没有，保留 EP 的结构（主色实心选中块），只换圆角和字号（用户确认） |
| Anchor 默认（无轨道） | `line-less`：激活项主色字、500、fill-2 底；不显示 EP 的圆角标记块 |
| Anchor `type="underline"` | Arco 默认：2px fill-3 轨道 + 2px × 12px 主色滑块；激活项 text-1 / 500 |
| Anchor `direction="horizontal"` | `direction="horizontal"`：项之间 16px，滑块左右缩进 8px |

按结构对应是用户确认的：EP 的 underline 和 Arco 默认几乎一样，如果把 EP 默认也对应到 Arco 默认，EP 的两种形态就分不开了。

## 2. 关键实现

- Segmented：EP 的圆角按 `border-radius-base` 往下减（外框 base、选中块 base − 2px），主题里 base 是 2px，减完选中块是直角、小尺寸甚至是负数；外框改用 4px、选中块 2px。高度跟着 `$input-height`，已经是 36 / 32 / 28；large 的字号从 16px 改成 14px。
- Anchor：
  - EP 的项是 flex 列，外边距不合并；Arco 是块，链接和项的 2px 下外边距会合并。项改成 `display: block`。
  - EP 的标记块按它自己的实际高度居中，改成 12px 不影响定位。
  - 横向时 EP 的标记线和链接等宽（JS 写的行内宽度），用 8px 透明左右边框加 `background-clip: padding-box` 缩进。
  - EP 的 hover 和 focus 共用 `--el-hover-color`；hover 单独写，focus 时不变色（Arco 没有），键盘的 focus-visible 轮廓保留。

## 3. 已知差异

- Arco 的 Anchor 自带 `width: 150px`，EP 填满容器；宽度属于布局，不强加。
- EP 的锚点链接点击时不阻止默认跳转，会改 URL 的 hash（EP 本身的行为）。
