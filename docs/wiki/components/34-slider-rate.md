# Slider / Rate

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_slider.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_rate.scss`
> - 对照用例 `../../../playground/src/demos/SliderDemo.vue`（`#slider`）

---

## 1. 关键实现

- Slider：2px 轨道 fill-3、进度主色；12px 滑块、2px 主色描边，hover 放大并出现 shadow1；禁用轨道 fill-2、进度和滑块描边 fill-3。默认高度 12px（Arco），large / small 保留 EP 的 40 / 24px。
- Rate：24px、间距 8px，未选 fill-3、选中 gold-6（用 Arco 兼容变量 `rgb(var(--gold-6))`，暗色自动切换），hover 放大 1.2 倍；small 按 EP 档差延伸为 20px。

## 2. 已知差异

- Arco 的轨道、滑块圆圈是伪元素画的，对比脚本只比较进度条和整体高度。
- Rate 未选中的星星：EP 是描边图标，Arco 是实心图标（可用 EP 的 `void-icon` 换成实心）。
