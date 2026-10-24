import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import App from './App.vue'
import './playground.css'
import { applyDark, isDark } from './dark'

const app = createApp(App).use(ArcoVue)
const raw = new URLSearchParams(location.search).get('theme') === 'raw'

if (import.meta.env.MODE === 'ondemand') {
  // 按需模式：组件和样式由 resolver 引入；暗色变量按 EP 官方写法引入，由 arcoTheme() 重定向到 Arco 版
  await import('element-plus/theme-chalk/dark/css-vars.css')
  // 以函数方式调用的组件（ElMessage / ElNotification / ElMessageBox），resolver 不会自动引入样式，
  // EP 官方要求手动引入；arcoTheme() 会把这些导入重定向到 Arco 镜像
  await import('element-plus/theme-chalk/el-message.css')
  await import('element-plus/theme-chalk/el-notification.css')
  await import('element-plus/theme-chalk/el-message-box.css')
} else {
  // ?theme=raw 加载 EP 原版样式，方便对比主题前后差异
  if (raw) {
    await import('element-plus/dist/index.css')
    await import('element-plus/theme-chalk/dark/css-vars.css')
  } else {
    await import('element-plus-theme-arco/src/index.scss')
    await import('element-plus-theme-arco/src/dark/css-vars.scss')
  }
  app.use((await import('element-plus')).default)
}

applyDark(isDark())
app.mount('#app')
