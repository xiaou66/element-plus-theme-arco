# 组件迁移流程

以把一个 EP 组件迁移到 Arco 外观为例。Button 和 Input 就是按这个流程做的，可以对照 [`_button.scss`](../../../packages/theme-arco/src/components/_button.scss)、[`_input.scss`](../../../packages/theme-arco/src/components/_input.scss) 和 [`ButtonDemo.vue`](../../../playground/src/demos/ButtonDemo.vue)。

## 1. 读源码，确定映射

- 读 Arco：`@arco-design/web-vue/es/<组件>/style/token.less`（所有状态的颜色、尺寸）和 `index.less`（结构、伪元素、focus、loading）。
- 读 EP：`element-plus/theme-chalk/src/<x>.scss`、`mixins/_<x>.scss`，以及 `common/var.scss` 里该组件的变量 map。记下每条规则的选择器和优先级。
- 读 EP 的 `dark/css-vars.scss`，确认有没有 `html.dark .el-<x>` 规则。
- 列出变体映射表（EP 用法 → Arco 用法）。有歧义的先问用户。
- 对照 EP 文档的属性表，列出所有影响外观的属性（尺寸、类型、效果、颜色、宽度、对齐、是否显示某部件等），确认每个取值在主题下仍有区别、仍然生效，见 [`principles.md`](../core/principles.md#ep-原有的配置必须继续生效)。

完成标准：映射表完整；每个要改的视觉属性都知道对应的 Arco token 和 EP 变量 / 选择器；外观属性清单里每一项都有处理方式。

## 2. 写对照用例

- 新建 `playground/src/demos/<X>Demo.vue`，在 `App.vue` 的 `demos` 里注册。
- 按 [`verification.md`](../core/verification.md) 的要求覆盖变体和状态，两侧用相同的 `data-pair`。
- 第 1 步清单里的外观属性，非默认取值各写一个用例；Arco 没有对应项的写成不成对的展示用例，确认它仍然生效。
- 把组件本体选择器加进 `scripts/screenshot.mjs` 的 `TARGET`。

完成标准：`pnpm dev` 里能看到两侧对照，每个 `data-pair` 两侧都存在。

## 3. 跑基线

- 运行 `pnpm shot <x>`，读 `.compare/report.md`，并看截图。
- 按差异类型分组（颜色、尺寸、内容偏移、圆角、focus 环），先判断哪些可以在 token 层解决。

完成标准：每类差异都能说出原因和计划修改的层。

## 4. 实现覆盖

- 先改 token 层（`var.scss` 的 `@forward ... with`），再写 `src/components/_<x>.scss`，并在 `src/index.scss` 里接入。
- 遵守 [`component-override.md`](../core/component-override.md)：引用变量、通用规则在前、优先级对照 EP 源码、补盒模型差异。
- 每改一轮就跑 `pnpm shot <x>`，直到报告归零。
- 归零后看截图，处理报告测不到的差异；处理不了的登记为已知差异。

完成标准：亮色全量模式报告归零，截图一致或差异已登记。

## 5. 暗色

- 运行 `pnpm shot <x> --dark`。
- 按 [`dark-mode.md`](../core/dark-mode.md) 判断差异属于哪一类，在 `src/dark/` 修正。

完成标准：暗色全量模式报告归零，看过暗色截图。

## 6. 按需模式

- 运行 `pnpm shot:ondemand` 和 `pnpm shot --mode ondemand --dark`。
- 按需模式下样式来自构建好的镜像，改了源码必须先 `pnpm build`（`shot:ondemand` 已包含）。

完成标准：四种组合都归零。

## 7. 文档同步

- [`README.md`](../../../README.md)：变体映射表、已知差异。
- wiki：在 `docs/wiki/components/` 新增或更新组件篇，并登记到 [wiki 索引](../../wiki/README.md)。
- 本次遇到的新坑（优先级陷阱、EP 的特殊选择器）补进 [`examples/component-override.examples.md`](../examples/component-override.examples.md) 或 wiki 排障篇。

## 交付模板

```markdown
## 组件迁移交付

- 组件：
- 变体映射：
- 关键文件：
- 回归结果：亮色全量 N / 亮色按需 N / 暗色全量 N / 暗色按需 N
- 已查看的截图：
- data-skip 及原因：
- 已知差异（CSS 无法解决）：
- 文档同步：README / wiki / rules
```
