# Quick Start

Use this theme in an existing Vue 3 application. It replaces Element Plus styles while keeping Element Plus props and interactions.

## Installation

```sh
pnpm add element-plus element-plus-theme-arco
```

Match the Element Plus minor version to the theme's peer dependency range. Check the package's `peerDependencies` for the supported range.

## Full Import

Replace `element-plus/dist/index.css` with the theme in your application entry. Import one full stylesheet.

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus-theme-arco'
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
```

## On-demand Import

Keep component auto-imports in Vite and add `arcoTheme()`. The component resolver finds components and styles; the theme plugin redirects stylesheet imports to the Arco mirror.

Install the auto-import plugin:

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

- Files missing from the mirror fall back to Element Plus styles with a startup warning.
- A warning appears when the installed Element Plus minor version differs from the version used to build the mirror.
- Only `importStyle: 'css'` is supported. The `'sass'` mode imports source styles that are not redirected.

Indirect component style dependencies and manual imports such as `element-plus/theme-chalk/el-message.css` are redirected too.

## Next Steps

- [Dark Mode](./dark): load dark styles and switch the page appearance.
- [Theming](./theming): use Arco and Element Plus variables in your interface.
- [Browse Components](/en/components/button): explore examples and differences from Arco.
