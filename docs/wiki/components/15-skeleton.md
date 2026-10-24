# Skeleton

> 关键文件：
>
> - 覆盖 `../../../packages/theme-arco/src/components/_skeleton.scss`
> - 覆盖 `../../../packages/theme-arco/src/components/_skeleton-item.scss`
> - 对照用例 `../../../playground/src/demos/SkeletonDemo.vue`（`#skeleton`）

---

## 1. 变体映射

| Element Plus | Arco |
| --- | --- |
| 默认段落（`rows`） | Skeleton.Line |
| `variant="circle"` | Skeleton.Shape `shape="circle"`（48px） |
| `variant="rect" / "image"` | Skeleton.Shape（2px 圆角） |

## 2. 关键实现

- Arco Vue 版的行高 20px、行距 15px 写在行内样式上（less 里的 16px 不生效），按实际渲染对齐。
- 行是直角；流光 fill-2 → fill-3、1.5s 线性。
- EP 的行是 inline-block，行与行之间多出行框间隙；`variant="p"` 改成块级。

## 3. 已知差异

- 无。
