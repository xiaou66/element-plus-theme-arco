# Image / ImageViewer / Carousel

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_image.scss`、`_image-viewer.scss`、`_carousel.scss`、`_carousel-item.scss`
> - 暗色 `../../../packages/theme-arco/src/dark/_carousel.scss`
> - 对照用例 `../../../playground/src/demos/MediaDemo.vue`（`#media`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| Image | Image：2px 圆角；加载失败对齐颜色和字号 |
| ImageViewer | ImagePreview：遮罩 mask 色，关闭 / 切换 32px 圆，工具栏 bg-2 底、操作 40px 见方 |
| Carousel 默认指示器 | 默认 `dot`：6px 圆点、底部 48px 渐变阴影（用户确认对应 Arco 默认） |
| `indicator-position="outside"` | `indicator-position="outer"` |
| `direction="vertical"` | `indicator-position="right"` |
| `type="card"` | `animation-name="card"`：侧边卡片露出 40% |

## 2. 关键实现

- Carousel：
  - EP 用透明度区分圆点状态（.48 / .72 / 1），改成 Arco 的底色。
  - EP 的 `li` 是 inline-block，按基线排会往上偏 3px，加 `vertical-align: top`。
  - 竖排时 Arco 的圆点中心距右 12px（EP 是右边缘距右 12px），左右内边距改成 9px。
  - 底部渐变阴影用 `:has(> .el-carousel__indicators--horizontal:not(--outside))` 判断指示器在容器里面时才加。
  - 卡片模式：EP 侧边卡片的遮罩改成页面底色、60%，看起来就是露出 40%，暗色下也成立；hover 时遮罩变淡的交互保留。
- 暗色：Arco 的 `--color-white` 是 90% 白，EP 写死的 `#fff` 改用变量；箭头和未激活圆点用 rgba(23,23,26,…)；outer 的激活圆点仍是 fill-4（按 Arco 实际渲染）。

## 3. 已知差异

- 图片预览工具栏的图标种类和数量不同。
- 卡片模式侧边卡片的缩放和位置由 EP 的 JS 计算，和 Arco 的 3D 透视不同。
- Carousel 的 `arrow` 默认 hover 才显示（Arco 默认一直显示），`trigger` 默认 hover 切换（Arco 是点击）——都是 EP 的属性默认值，保留。
- 加载失败 EP 只有文字，Arco 是图标 + alt 文字。
