import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ElementPlus, { ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import type { Theme } from 'vitepress'
import Demo from './components/Demo.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import SidebarToggle from './components/SidebarToggle.vue'
import OutlineToggle from './components/OutlineToggle.vue'
import HomeHero from './components/HomeHero.vue'
import ThemeSwitch from './components/ThemeSwitch.vue'
import GlassSwitch from './components/GlassSwitch.vue'
import ModeSwitch from './components/ModeSwitch.vue'
import ArcoTokenTable from './components/ArcoTokenTable.vue'
import ExportedVarTable from './components/ExportedVarTable.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  // 顶栏右侧加“Arco 主题 / EP 原版”切换和“毛玻璃”开关（手机上放进菜单，在“外观”下面）；正文标题上方加面包屑；侧栏和右侧目录的收起按钮
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => [h(ThemeSwitch), h(GlassSwitch)],
      'nav-screen-content-after': () => [h(ThemeSwitch, { screen: true }), h(GlassSwitch, { screen: true })],
      'doc-before': () => h(Breadcrumb),
      'aside-outline-before': () => h(OutlineToggle),
      'layout-bottom': () => [h(SidebarToggle), h(OutlineToggle, { fixed: true })],
    }),
  enhanceApp({ app }) {
    // 组件样式由 <head> 里的 <link> 提供（见 config.mts），这里只注册组件；
    // 服务端渲染需要固定 id 前缀和 z-index 起点，否则水合时和客户端不一致
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
    app.use(ElementPlus)
    app.component('Demo', Demo)
    app.component('ModeSwitch', ModeSwitch)
    app.component('HomeHero', HomeHero)
    app.component('ArcoTokenTable', ArcoTokenTable)
    app.component('ExportedVarTable', ExportedVarTable)
  },
} satisfies Theme
