# 毛玻璃

在亮色、暗色之上叠加一层半透明的玻璃风格，开关是根元素上的 `glass` 类名，可以和 `dark` 同时存在。Arco 原版没有这套样式，所以它只对照设计稿，没有 Arco 对照项。

## 引入

`glass` 样式是独立的一份，需要放在主题和暗色样式之后。

```ts
import 'element-plus-theme-arco'
import 'element-plus-theme-arco/dark' // 需要暗色时
import 'element-plus-theme-arco/glass'
```

按需引入时也一样直接引入这一份：它和暗色样式一样是全局单份，所有规则都挂在 `html.glass` 下，不走组件解析器和 `arcoTheme()` 插件。

## 切换

```ts
// 亮色玻璃：glass；暗色玻璃：dark + glass
document.documentElement.classList.toggle('glass', enabled)
document.documentElement.classList.toggle('dark', isDark)
```

不加 `glass` 类时，对任何组件都没有影响。

## 背景由应用提供

主题只画“面”，不画背景。玻璃要叠在壁纸、渐变、背景图或透明窗口上才看得出来；放在纯白页面上只是一层淡淡的白。

## 不透明度

`--glass-opacity`（0 到 1，默认 `0.55`）缩放所有“面”的透明度，在根元素上设置。悬停、选中、分隔线这类色调叠层不随它变化。

```css
html {
  --glass-opacity: 0.7;
}
```

## 哪些组件变了

| 类别 | 组件 | 外观 |
| --- | --- | --- |
| 普通面 | Card、Menu、Table、Collapse、Descriptions、Alert、Segmented、Tag | 半透明填充加 1px 描边，不模糊 |
| 输入类 | Input、Textarea、Select、InputTag、日期输入、未选中的 Checkbox 和 Radio、次要按钮 | 无边框，更透的底色，顶部 1px 高光，圆角 8；聚焦和错误态保留完整描边 |
| 浮层 | Dialog、Drawer、MessageBox、Popover、Dropdown、Select 下拉、DatePicker、Message、Notification、Tour、Tooltip | 浮层面加 `backdrop-filter` 模糊、描边和阴影 |

## 边界

- 主色和状态色仍然是 `--el-color-*`，改主色后选中态和聚焦光晕跟着变。
- Element Plus 的属性仍然生效：Tooltip 的 `effect="dark"` 是深色玻璃，`effect="light"` 是浅色玻璃；按钮的 `round`、`circle` 不受圆角统一影响。
- 需要浏览器支持 `backdrop-filter`；不支持时浮层没有模糊，只剩半透明底色。
- Popover、Tooltip 的箭头不能单独模糊，叠在浮层上沿处颜色会略深。
- Menu 自身是透明的，因为侧边栏通常已经在玻璃窗口里；需要面板时放进 Card 或自己的玻璃容器。
