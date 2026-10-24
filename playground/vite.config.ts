import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { arcoTheme } from 'element-plus-theme-arco/vite'

// 两种模式：
//   默认       全量注册 EP，直接编译主题 SCSS 源码，改主题有 HMR
//   ondemand   用户真实的按需用法：resolver 自动导入 + arcoTheme() 重定向到构建好的镜像
export default defineConfig(({ mode }) => {
  const ondemand = mode === 'ondemand'
  return {
    plugins: [
      vue(),
      ondemand && Components({ resolvers: [ElementPlusResolver()], dts: false }),
      ondemand && arcoTheme(),
    ],
    server: { port: 5180, strictPort: true },
    build: { target: 'esnext' },
  }
})
