# 快速开始

本主题用于已有的 Vue 3 项目，只替换 Element Plus 的样式，组件属性和交互仍由 Element Plus 提供。

## 版本要求

| 依赖 | 版本 |
| --- | --- |
| element-plus | 2.14.x。主题按 2.14.7 构建，次版本不同时部分组件样式可能不一致 |
| vite | 5 及以上，仅按需引入的插件需要 |
| sass | 仅直接使用 `src/` 下的 Sass 源码时需要 |

## 安装

```sh
pnpm add element-plus element-plus-theme-arco
```

## 全量引入

在应用入口用主题替换 `element-plus/dist/index.css`，不要同时引入两份全量样式。

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus-theme-arco' // 替换 element-plus/dist/index.css
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
```

## 按需引入

Vite（项目构建工具）中保留 Element Plus 官方的自动导入配置，增加 `arcoTheme()`。组件解析器负责找到组件和样式，主题插件把样式导入重定向到 Arco 镜像。

先安装自动导入插件：

```sh
pnpm add -D unplugin-vue-components unplugin-auto-import
```

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { arcoTheme } from 'element-plus-theme-arco/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    arcoTheme(),
  ],
})
```

以下样式导入都会被重定向：

- 组件解析器为模板里的组件引入的样式，以及组件间接依赖的样式（例如 Popconfirm 会引入 Button 的样式）。
- 自动导入 `ElMessage`、`ElNotification` 等服务时带上的样式。
- 手写的 `element-plus/theme-chalk/el-message.css` 等导入。

注意：

- 镜像中没有的文件回落到 Element Plus 原版，启动时会警告。
- Element Plus 与镜像构建版本不在同一次版本（如 2.14）时会警告。
- 只支持解析器默认的 `importStyle: 'css'`；`'sass'` 导入的是源码样式，目前不会重定向。

## CDN

不使用构建工具时，把 Element Plus 的样式链接换成主题的：

```html
<link rel="stylesheet" href="https://unpkg.com/element-plus-theme-arco@1/dist/index.css" />
```

## webpack / Rspack

用别名把 `element-plus/theme-chalk` 指向主题镜像（未实测）：

```js
resolve: {
  alias: { 'element-plus/theme-chalk': 'element-plus-theme-arco/theme-chalk' },
}
```

这种写法没有回落：Element Plus 新增了镜像里没有的样式文件时，会直接报找不到模块。

## 与 Arco 默认外观对齐（可选）

Element Plus 的配置在主题下都继续生效。有几处默认值和 Arco 不同、又无法只用样式区分，需要和 Arco 一致时用 ConfigProvider 统一设置：

```vue
<el-config-provider :card="{ shadow: 'never' }" :link="{ underline: 'never' }">
  <App />
</el-config-provider>
```

## 下一步

- [暗色模式](./dark)：引入暗色样式并切换页面外观。
- [主题定制](./theming)：在业务界面中使用 Arco 与 Element Plus 变量。
- [浏览组件](/components/button)：查看示例和与 Arco 的差异。
