# Empty / Result / Loading

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_empty.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_result.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_loading.scss`
> - 对照用例 `../../../playground/src/demos/ResultDemo.vue / LoadingDemo.vue`（`#result`）

---

## 1. 关键实现

- Empty：10px 上下内边距；默认插画缩到 48px，照 Arco 的结构排（48px 字号的行框、svg 1em、`vertical-align: -2px`）；传了 `image-size`（行内 width）时保持 EP 原来按宽度缩放；描述 gray-5、距图片 4px。
- Result：32px 32px 24px；图标是 45px 的浅色圆底里放 20px 图标；标题 14px / 500，副标题紧跟其后；标题、副标题改成整宽块（EP 是收缩到文字宽度的 flex 项）。
- Loading：图标 20px，文字主色 / 500、距图标 6px；图标加文字整体垂直居中；遮罩 60% 白（暗色 60% #333），在 token 层 `$mask-color` 配置。

## 2. 已知差异

- Empty 的默认图是插画，Arco 是线性图标；Result、Loading 的图标形状不同。
- 不在 `cqw` 上做文章：`container-type: inline-size` 配 `font-size: 100cqw` 会让 Chromium 页面崩溃。
