# 暗色模式

暗色模式沿用 Element Plus 的 `html.dark` 约定。先加载对应样式，再切换根元素上的类名。

## 全量引入

应用入口同时引入亮色主题和暗色样式。

```ts
import 'element-plus-theme-arco'
import 'element-plus-theme-arco/dark'
```

## 按需引入

已配置 [快速开始](./quick-start#按需引入) 中的 `arcoTheme()` 时，导入 Element Plus 的暗色入口，插件会把它重定向到主题镜像。

```ts
import 'element-plus/theme-chalk/dark/css-vars.css'
```

按需模式下继续让组件解析器加载各组件样式，无需再引入全量主题。

## 切换外观

在开关的事件回调中切换 `dark` 类；`isDark` 表示应用当前的暗色状态。

```ts
function updateAppearance(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
}
```

服务端渲染时不要在模块顶层读取 `document`；把切换放到挂载后或浏览器事件中。Element Plus 变量和主题提供的 Arco 变量会一起随 `html.dark` 切换。

## 颜色合成与边界

Arco 暗色的填充和文字使用半透明色。主题沿用 Element Plus 的做法，将大部分颜色合成到容器背景 `#232324` 上，生成不透明色；部分组件内部仍保留半透明颜色以匹配叠加效果。

因此，将组件直接放在更深的页面背景 `#17171a` 上时，填充可能比 Arco 原版略亮。业务容器可使用 `var(--color-bg-2)` 与默认合成背景保持一致，详见 [主题定制](./theming)。
