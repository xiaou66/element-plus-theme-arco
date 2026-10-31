/** 文档站构建入口：统一双语导航、示例编译与主题资源，确保生产页面使用同一套约定。 */
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import container from 'markdown-it-container'
import { defineConfig, postcssIsolateStyles, type DefaultTheme } from 'vitepress'
import { catalog, groupTitles } from './catalog'

const examples = resolve(dirname(fileURLToPath(import.meta.url)), '../examples')

// 两套组件样式都用 <link> 引入，按 localStorage 里上次的选择停用其中一套。
// 放在 <head> 里同步执行，页面渲染前就定好，刷新时不闪（侧栏、右侧目录的收起状态同理）。
// 停用的是样式表对象（link.sheet.disabled），不改 <link> 的属性：
//   - VitePress 换页时按配置比对 <head> 里的标签（比较全部属性），属性变了就会重新插入一份默认的 <link>，切换就失效了；
//   - 也不能用 link.disabled / media：前者在 Chrome 里对未加载完的样式表不生效，后者同样是改属性。
// 内联脚本会等前面的样式表加载完才执行，这时 sheet 已经有了；之后 <head> 里再插入的 <link> 在 load 后补上。
const themeBoot = `(() => {
  let ep = false
  try { ep = localStorage.getItem('site-theme') === 'ep' } catch {}
  // 传 'arco' / 'ep' 是切换；不传（MutationObserver 回调）是按当前选择重新应用
  const apply = (value) => {
    if (value === 'arco' || value === 'ep') ep = value === 'ep'
    document.documentElement.dataset.siteTheme = ep ? 'ep' : 'arco'
    for (const link of document.querySelectorAll('link[data-site-style]')) {
      const off = (link.dataset.siteStyle === 'ep') !== ep
      const set = () => { if (link.sheet) link.sheet.disabled = off }
      set()
      if (!link.sheet) link.addEventListener('load', set, { once: true })
    }
  }
  if (window.__siteApplyTheme) return window.__siteApplyTheme()
  window.__siteApplyTheme = apply
  apply()
  new MutationObserver(() => apply()).observe(document.head, { childList: true })
  try { if (localStorage.getItem('site-glass') === '1') document.documentElement.classList.add('glass') } catch {}
  try { if (localStorage.getItem('site-sidebar-collapsed') === '1') document.documentElement.classList.add('sidebar-collapsed') } catch {}
  try { if (localStorage.getItem('site-outline-collapsed') === '1') document.documentElement.classList.add('outline-collapsed') } catch {}
})()`

/** 按语言生成指南与组件导航，避免两种语言的分组顺序出现偏差。 */
function sidebar(locale: 'zh' | 'en'): DefaultTheme.SidebarItem[] {
  const prefix = locale === 'en' ? '/en' : ''
  const guide = locale === 'en'
    ? [
        { text: 'Quick Start', link: `${prefix}/guide/quick-start` },
        { text: 'Dark Mode', link: `${prefix}/guide/dark` },
        { text: 'Glass Mode', link: `${prefix}/guide/glass` },
        { text: 'Theming', link: `${prefix}/guide/theming` },
        { text: 'Design Tokens', link: `${prefix}/guide/token` },
        { text: 'Global Variables', link: `${prefix}/guide/variables` },
      ]
    : [
        { text: '快速开始', link: `${prefix}/guide/quick-start` },
        { text: '暗色模式', link: `${prefix}/guide/dark` },
        { text: '毛玻璃', link: `${prefix}/guide/glass` },
        { text: '主题定制', link: `${prefix}/guide/theming` },
        { text: '设计变量', link: `${prefix}/guide/token` },
        { text: '全局变量', link: `${prefix}/guide/variables` },
      ]
  // 同 Arco 官网：“组件”下面按分组列出，分组名是灰色小字
  const components = Object.entries(groupTitles)
    .map(([group, title]) => ({
      text: title[locale],
      items: catalog
        .filter((c) => c.group === group)
        .map((c) => ({ text: locale === 'en' ? c.name : `${c.zh} ${c.name}`, link: `${prefix}/components/${c.slug}` })),
    }))
    .filter((g) => g.items.length)
  return [
    // 一级分组可以折叠（同 Arco 官网），默认展开
    { text: locale === 'en' ? 'Guide' : '指南', collapsed: false, items: guide },
    { text: locale === 'en' ? 'Components' : '组件', collapsed: false, items: components },
  ]
}

export default defineConfig({
  title: 'Element Plus Arco Theme',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'stylesheet', href: '/styles/arco.css', 'data-site-style': 'arco' }],
    ['link', { rel: 'stylesheet', href: '/styles/arco-dark.css', 'data-site-style': 'arco' }],
    // 毛玻璃必须排在 arco / arco-dark 之后；属于 Arco 主题这一套，切到 EP 原版时一起停用
    ['link', { rel: 'stylesheet', href: '/styles/glass.css', 'data-site-style': 'arco' }],
    ['link', { rel: 'stylesheet', href: '/styles/ep.css', 'data-site-style': 'ep' }],
    ['link', { rel: 'stylesheet', href: '/styles/ep-dark.css', 'data-site-style': 'ep' }],
    ['script', {}, themeBoot],
  ],
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      description: '让 Element Plus 拥有 Arco Design 的外观',
      themeConfig: {
        nav: [
          { text: '指南', link: '/guide/quick-start', activeMatch: '/guide/' },
          { text: '组件', link: '/components/button', activeMatch: '/components/' },
        ],
        sidebar: { '/': sidebar('zh') },
        outline: { label: '本页目录', level: 2 },
        docFooter: { prev: '上一页', next: '下一页' },
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色',
        darkModeSwitchTitle: '切换到暗色',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '回到顶部',
        langMenuLabel: '语言',
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'Arco Design look & feel for Element Plus',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/quick-start', activeMatch: '/en/guide/' },
          { text: 'Components', link: '/en/components/button', activeMatch: '/en/components/' },
        ],
        sidebar: { '/en/': sidebar('en') },
        outline: { label: 'On this page', level: 2 },
      },
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '没有找到结果',
                resetButtonTitle: '清除',
                displayDetails: '显示详情',
                backButtonTitle: '返回',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/xiaou66/element-plus-theme-arco' }],
  },
  vite: {
    css: {
      postcss: {
        // 正文排版（vp-doc.css）不作用于带 vp-raw 类的区域：示例预览区里的组件按组件自己的样式显示
        plugins: [postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] })],
      },
    },
    resolve: {
      // 顶栏语言切换换成 Arco 样式的选择器（VitePress 支持用 alias 替换内置组件）
      alias: [
        {
          find: /^.*\/VPNavBarTranslations\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/NavBarLang.vue', import.meta.url)),
        },
      ],
    },
  },
  markdown: {
    // ## 标题
    // 说明文字
    // ::: demo button/basic
    // :::
    // 构建时读出示例源码，生成带高亮的代码块，页面上同时渲染这个示例组件（标题和说明写在容器外面，才会进右侧目录）。
    // 预渲染结果和浏览器里对不上的示例（弹出层、日期、Steps 等）写成 ::: demo date-picker/basic client-only，
    // 只有预览区在浏览器里渲染，代码块照常预渲染
    config(md) {
      md.use(container, 'demo', {
        validate: (params: string) => /^demo\s+\S+(\s+client-only)?$/.test(params.trim()),
        render(tokens: any[], idx: number) {
          const token = tokens[idx]
          if (token.nesting !== 1) return '</Demo>\n'
          const [, src, clientOnly] = token.info.trim().match(/^demo\s+(\S+)(\s+client-only)?$/)!
          const code = md.render('```vue\n' + readFileSync(resolve(examples, `${src}.vue`), 'utf8') + '```\n')
          return `<Demo src="${src}"${clientOnly ? ' client-only' : ''}><template #code>${code}</template>\n`
        },
      })
    },
  },
})
