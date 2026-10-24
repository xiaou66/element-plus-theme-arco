# 按需引入

> 使用方的 `ElementPlusResolver` 配置不需要改，加一个 `arcoTheme()` Vite 插件即可。
> 关键文件：
>
> - Vite 插件 `../../../packages/theme-arco/vite.mjs`
> - playground 按需模式配置 `../../../playground/vite.config.ts`

---

## 1. EP 的按需样式链路

`unplugin-vue-components` 的 `ElementPlusResolver` 在解析到 `<el-button>` 时，会追加一个副作用导入：

```
ElButton
  → element-plus/es/components/button/style/css.mjs
      → element-plus/es/components/base/style/css.mjs → element-plus/theme-chalk/base.css
      → element-plus/theme-chalk/el-button.css
```

关键在于组件之间的样式会互相引用：MessageBox、Popconfirm、Dropdown、DatePicker、Calendar、ColorPicker、Tour、Transfer 这 8 个组件的 `style/css.mjs` 都会引入 Button 的样式；引用 Input 样式的组件更多。

## 2. 为什么不能只在 resolver 上追加覆盖

直觉做法是给 resolver 包一层，解析到 `ElButton` 时额外追加 `element-plus-theme-arco/button.css`。问题是：如果页面只用了 `<el-popconfirm>`，Button 的样式是从 Popconfirm 的样式链里间接引入的，resolver 根本不会经过 `ElButton`，弹框里的按钮就还是 EP 原版。

## 3. 方案：镜像 + 重定向

不管样式从哪条链来，最终请求的都是 `element-plus/theme-chalk/xxx.css`。只要把这个路径重定向到我们的镜像，所有链路都会拿到 Arco 版。镜像里每个文件已经是“EP 样式 + Arco token + 同名覆盖”，见 [构建与镜像](./02-build-and-mirror.md)。

使用方也不需要安装 Sass。

## 4. 为什么用 `resolve.alias` 而不是 `resolveId`

第一版插件用 `resolveId` 钩子做重定向，结果按需模式下对比报告有 650 处差异，页面拿到的全是 EP 原版。原因是：EP 的 `style/css.mjs` 会被 Vite 的依赖预构建打进 `node_modules/.vite/deps`，预构建阶段 CSS 导入已经被解析成 EP 的绝对路径，插件的 `resolveId` 没有机会执行。而 `resolve.alias` 在预构建阶段同样生效。

所以插件在 `config` 钩子里返回一条 alias。为了支持回落，alias 不是通配符，而是由镜像里实际存在的文件名拼成的正则：

```js
find: /^element-plus\/theme-chalk\/(base\.css|el-button\.css|...|dark\/css-vars\.css)$/
```

镜像里没有的文件匹配不上，自然走 EP 原版。

加插件之前留下的预构建缓存不会造成问题：alias 属于 Vite 配置的一部分，配置变化后缓存会自动失效。

## 5. 回落与警告

插件在 `configResolved` 里做两项检查，都只警告、不中断：

- 安装的 element-plus 与 `meta.json` 记录的版本不在同一个 minor。
- EP 的 `theme-chalk/` 里有镜像没有的文件（例如 EP 升级新增了组件），列出这些文件名，说明它们会使用 EP 原版。

回落逻辑验证过：临时移走镜像里的 `el-input.css`，构建时出现警告，输入框变回 EP 原版的白底。

## 6. 适用范围

- 只支持 resolver 默认的 `importStyle: 'css'`。`'sass'` 模式走 `theme-chalk/src/*.scss`，目前不会被重定向。
- webpack / Rspack 可以配 `resolve.alias: { 'element-plus/theme-chalk': 'element-plus-theme-arco/theme-chalk' }`，但没有回落，也没有实测。
- 暗色变量按 EP 官方写法 `import 'element-plus/theme-chalk/dark/css-vars.css'`，同样会被重定向。
