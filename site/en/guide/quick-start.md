# Quick Start

Use this theme in an existing Vue 3 application. It replaces Element Plus styles while keeping Element Plus props and interactions.

## Requirements

| Dependency | Version |
| --- | --- |
| element-plus | 2.14.x. The theme is built against 2.14.7; other minor versions may render some components differently |
| vite | 5 or later, only needed for the on-demand plugin |
| sass | Only needed when using the Sass sources under `src/` directly |

## Installation

```sh
pnpm add element-plus element-plus-theme-arco
```

## Full Import

Replace `element-plus/dist/index.css` with the theme in your application entry. Import one full stylesheet.

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus-theme-arco' // replaces element-plus/dist/index.css
import App from './App.vue'

createApp(App).use(ElementPlus).mount('#app')
```

## On-demand Import

Keep the official Element Plus auto-import setup in Vite and add `arcoTheme()`. The component resolver finds components and styles; the theme plugin redirects stylesheet imports to the Arco mirror.

Install the auto-import plugins:

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

These stylesheet imports are all redirected:

- Styles the resolver adds for components in templates, and styles that components depend on (for example, Popconfirm imports Button styles).
- Styles added when services such as `ElMessage` and `ElNotification` are auto-imported.
- Manual imports such as `element-plus/theme-chalk/el-message.css`.

Notes:

- Files missing from the mirror fall back to Element Plus styles with a startup warning.
- A warning appears when the installed Element Plus minor version (such as 2.14) differs from the version used to build the mirror.
- Only the resolver's default `importStyle: 'css'` is supported. The `'sass'` mode imports source styles that are not redirected.

## CDN

Without a build tool, replace the Element Plus stylesheet link with the theme:

```html
<link rel="stylesheet" href="https://unpkg.com/element-plus-theme-arco@1/dist/index.css" />
```

## webpack / Rspack

Alias `element-plus/theme-chalk` to the theme mirror (not tested):

```js
resolve: {
  alias: { 'element-plus/theme-chalk': 'element-plus-theme-arco/theme-chalk' },
}
```

This alias has no fallback: if Element Plus adds a stylesheet the mirror lacks, the build fails with a missing module error.

## Match Arco Defaults (Optional)

All Element Plus configuration keeps working with the theme. A few defaults differ from Arco and cannot be told apart by styles alone. To match Arco, set them once with ConfigProvider:

```vue
<el-config-provider :card="{ shadow: 'never' }" :link="{ underline: 'never' }">
  <App />
</el-config-provider>
```

## Next Steps

- [Dark Mode](./dark): load dark styles and switch the page appearance.
- [Theming](./theming): use Arco and Element Plus variables in your interface.
- [Browse Components](/en/components/button): explore examples and differences from Arco.
