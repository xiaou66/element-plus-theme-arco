# 主题的分层

> 本主题不改 Element Plus 的任何组件代码，只靠样式把 EP 组件“穿”成 Arco Design 的样子。
> 关键文件：
>
> - Arco 亮色 token `../../../packages/theme-arco/src/tokens/_arco.scss`
> - EP 变量配置 `../../../packages/theme-arco/src/common/var.scss`
> - 组件覆盖 `../../../packages/theme-arco/src/components/`
> - 全量入口 `../../../packages/theme-arco/src/index.scss`
> - 规则 [`token-mapping.md`](../../rules/core/token-mapping.md)、[`component-override.md`](../../rules/core/component-override.md)

---

## 1. 为什么可行

EP 的主题体系有三个可以接入的口子：

1. **SCSS 变量**：`theme-chalk/src/common/var.scss` 里的颜色、尺寸、圆角都是 `!default` 的 map，可以用 `@forward ... with (...)` 在编译前整体替换。
2. **CSS 变量**：几乎所有组件的视觉属性都通过 `--el-*` 变量表达，组件级变量（`--el-button-bg-color`）引用全局变量（`--el-fill-color`）。
3. **BEM 类名**：`.el-button--primary`、`.is-disabled`、`.is-plain`，选择器稳定，便于精确覆盖。

Arco 的 token 同样规整（10 级色板、fill-1~4、text-1~4、border-1~4、28/32/36 三档尺寸），两边可以一一映射。

## 2. 三层结构

```
┌─────────────────────────────────────────────────────────────┐
│ 暗色层   src/dark/                                           │ html.dark 下 token 自动切换后仍不够的修正
├─────────────────────────────────────────────────────────────┤
│ 组件层   src/components/_<x>.scss                            │ 重设 --el-<x>-* 变量；变量覆盖不到的属性再写样式
├─────────────────────────────────────────────────────────────┤
│ Token 层 src/tokens/_arco.scss → src/common/var.scss         │ @forward EP 的 var.scss with (Arco 值)
└─────────────────────────────────────────────────────────────┘
```

另有一层独立的 [Arco 兼容变量](./05-arco-vars.md)，给业务代码用 Arco 的变量名取色，不参与 EP 组件渲染。

### Token 层：最大的杠杆

只改 token 就能还原约六成观感：主色、灰阶、圆角、字体、组件高度全部换掉。EP 有 120 多个组件样式文件，它们都从同一份 `var.scss` 取值，所以 token 层的改动会一次性作用到全部组件。

`src/index.scss` 的加载顺序是关键：

```scss
@use './common/var.scss' as *;                      // 1. 先用 Arco 值配置 EP 变量
@use 'element-plus/theme-chalk/src/index.scss' as *; // 2. EP 全部样式拿到的是配置后的变量
@use './components/button';                          // 3. 组件覆盖叠在最后
```

Sass 模块只会被配置一次，`var.scss` 必须是第一个加载的模块。

### 状态色色阶：为什么要“钉”而不是让 EP 生成

EP 用主色和白色按 10%~90% 混色生成 `light-1`~`light-9`，用主色和黑色混出 `dark-2`。Arco 的 10 级色板是设计师手工调的，和混色结果并不相同。例如 Arco 的 hover 色（5 级 `#4080FF`）和 EP 混出来的 `light-3` 差得很明显。

EP 的 `set-color-mix-level` 用 `map.deep-merge(生成值, $colors)`，传入的 `$colors` 优先，所以只要在 `$colors` 里提前写好 `light-3`、`light-5`、`light-9`、`dark-2` 等，EP 就不会覆盖它们。对应关系见 [`token-mapping.md`](../../rules/core/token-mapping.md)。这样 EP 组件里所有“hover 用 light-3、active 用 dark-2、disabled 用 light-5”的地方，都自动变成 Arco 的 5 / 7 / 3 级。

EP 实际只输出 `light-3/5/7/8/9` 和 `dark-2` 这几级 CSS 变量，其余色阶只在编译期使用。

### 组件层：只改变量

组件覆盖优先重设 EP 的组件级 CSS 变量，而不是重写选择器上的属性：

- 状态切换（hover / active / disabled）的逻辑仍由 EP 的样式负责，我们只换“值”，不容易漏状态。
- 变量引用 `--el-*` 全局变量，暗色模式和运行时换色自然跟随。

变量覆盖不到的，才写具体属性，例如 Arco 的 focus 环是 `box-shadow` 而不是 `outline`，输入框 hover 时的填充加深等。

## 3. 可行性边界

CSS 能做到的上限大约是 85%~90% 的还原度。剩下的通常是：

- **图标集不同**：EP 用 `@element-plus/icons-vue`，Arco 有自己的图标，比如密码框的眼睛、loading 转圈。
- **JS 渲染的文本**：例如字数统计 EP 显示 `2 / 20`，Arco 显示 `2/20`。
- **DOM 结构不同**：Select 下拉、DatePicker 面板这类组件内部结构差异较大，有些细节 CSS 改不动。
- **变体语义不对等**：Arco 按钮有 `secondary`、`outline` 等类型，EP 只有 `plain`、`text`、`link`，需要定映射规则（见各组件篇）。

这些差异登记在 [`README.md`](../../../README.md) 的“已知差异”和各组件篇里。
