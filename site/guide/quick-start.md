# 快速开始

本主题用于已有的 Vue 3 项目，只替换 Element Plus 的样式，组件属性和交互仍由 Element Plus 提供。

## 安装

```sh
pnpm add element-plus element-plus-theme-arco
```

主题与 Element Plus 的次版本需匹配；当前主题的依赖范围可在包的 `peerDependencies` 中确认。

## 全量引入

在应用入口用主题替换 `element-plus/dist/index.css`，不要同时引入两份全量样式。

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus-theme-arco'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
```

## 按需引入

Vite（项目构建工具）中保留组件自动导入配置，增加 `arcoTheme()`。组件解析器负责找到组件和样式，主题插件把样式导入重定向到 Arco 镜像。

先安装自动导入插件：

```sh
pnpm add -D unplugin-vue-components
```

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { arcoTheme } from 'element-plus-theme-arco/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [ElementPlusResolver({ importStyle: 'css' })] }),
    arcoTheme(),
  ],
})
```

- 镜像中没有的文件回落到 Element Plus 原版，启动时会警告。
- Element Plus 与镜像构建版本不在同一次版本（如 2.14）时会警告。
- 只支持 `importStyle: 'css'`；`'sass'` 导入的是源码样式，目前不会重定向。

组件间接依赖的样式和手写的 `element-plus/theme-chalk/el-message.css` 等导入也会被重定向。

## 下一步

- [暗色模式](./dark)：引入暗色样式并切换页面外观。
- [主题定制](./theming)：在业务界面中使用 Arco 与 Element Plus 变量。
- [浏览组件](/components/button)：查看示例和与 Arco 的差异。
