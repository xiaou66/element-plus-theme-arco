# Tabs

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_tabs.scss`
> - 对照用例 `../../../playground/src/demos/TabsDemo.vue`（`#tabs`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| 默认（line） | `type="line"`：每项左右 16px（外边距）、40px 高、text-2 / 400，hover 文字后面出现 fill-2 胶囊底，选中主色 / 500，底线 1px |
| `type="card"` | `type="card"`：32px 高，每项自带描边、首末项 2px 圆角，hover fill-3，内容区带描边 |
| `border-card` | Arco 没有；保留 EP 结构，头部 fill-1、选中项 bg-2 |
| `tab-position` left / right | 沿用 EP 布局 |

## 2. 关键实现

- line：照 Arco 的结构，项间距改为外边距、项本身只包住文字。EP 计算选中条位置时读 offsetLeft 和内边距，换成外边距后依然对得上。
- 键盘焦点：不用 EP 的内阴影，line 在胶囊底上、card 在整项上画 2px 主色描边（同 Arco）。

## 3. 已知差异

- 关闭图标不同（图标集）。
