# Breadcrumb

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_breadcrumb.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_breadcrumb-item.scss`
> - 对照用例 `../../../playground/src/demos/BreadcrumbDemo.vue`（`#breadcrumb`）

---

## 1. 变体映射

`el-breadcrumb-item` 与 Arco BreadcrumbItem 一一对应；`to`（`.is-link`）和插槽里的 `<a>` 对应 Arco 的可点击项。

## 2. 关键实现

- 每项 24px 行高、左右 4px；文字 text-2；最后一项 text-1 / 500。
- 可点击项不加粗，hover 变主色并出现 fill-2 灰底；插槽里的 `<a>` 用负外边距把灰底铺满整项（同 Arco）。
- 分隔符 text-4、左右 4px。

## 3. 已知差异

- Arco 默认分隔符是斜线图标，EP 是文字 `/`（用例里 Arco 一侧传了文字分隔符）。
