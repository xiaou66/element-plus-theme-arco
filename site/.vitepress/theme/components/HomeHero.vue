<script setup lang="ts">
/** 首页展示主题定位、文档入口和真实组件预览，让用户直接比较两套主题。 */
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))
const prefix = computed(() => (zh.value ? '' : '/en'))

const t = computed(() =>
  zh.value
    ? {
        eyebrow: 'Element Plus × Arco Design',
        title: ['Element Plus 组件，', 'Arco Design 外观。'],
        desc: '一个纯样式的主题包：不改组件代码，只换样式。Element Plus 原有的属性和全局配置都继续生效，支持全量引入、按需引入和暗色模式。',
        start: '浏览组件',
        quickStart: '快速开始',
        card: '组件预览',
        name: '项目名称',
        save: '自动保存',
        saveDesc: '每一次修改都会被记住。',
        cols: ['组件', '对应 Arco', '状态'],
        footer: '切换顶栏的 “Arco 主题 / EP 原版” 看看区别',
        features: [
          ['只换样式', '不包一层组件，不改 API；照着 Element Plus 的文档写代码就行。'],
          ['全量或按需', '全量引入一行 CSS；按需引入用 Vite 插件把样式重定向到 Arco 版。'],
          ['暗色模式', '跟着 Element Plus 的 html.dark 切换，颜色按 Arco 的暗色色板。'],
        ],
      }
    : {
        eyebrow: 'Element Plus × Arco Design',
        title: ['Element Plus components,', 'Arco Design look.'],
        desc: 'A style-only theme: your component code stays the same, only the styles change. Every Element Plus prop and global config keeps working, with full import, on-demand import and dark mode.',
        start: 'Components',
        quickStart: 'Quick Start',
        card: 'Component preview',
        name: 'Project name',
        save: 'Auto save',
        saveDesc: 'Every change is remembered.',
        cols: ['Component', 'Arco', 'Status'],
        footer: 'Toggle “Arco Theme / EP Default” in the nav bar to compare',
        features: [
          ['Styles only', 'No wrapper components, no API changes — keep following the Element Plus docs.'],
          ['Full or on-demand', 'One CSS import for everything, or a Vite plugin that redirects per-component styles.'],
          ['Dark mode', 'Follows Element Plus html.dark, colored with the Arco dark palette.'],
        ],
      },
)

const project = ref('Element Plus Arco Theme')
const autoSave = ref(true)
const rows = [
  { name: 'Button', arco: 'Button', type: 'success' as const },
  { name: 'Input', arco: 'Input', type: 'success' as const },
  { name: 'Switch', arco: 'Switch', type: 'success' as const },
]
</script>

<template>
  <section class="home-hero">
    <div class="home-hero-inner">
      <div class="home-hero-text">
        <div class="home-eyebrow">{{ t.eyebrow }}</div>
        <h1 class="home-title">
          <span>{{ t.title[0] }}</span>
          <span>{{ t.title[1] }}</span>
        </h1>
        <p class="home-desc">{{ t.desc }}</p>
        <div class="home-actions">
          <a class="home-btn primary" :href="withBase(`${prefix}/components/button`)">{{ t.start }}</a>
          <a class="home-btn ghost" :href="withBase(`${prefix}/guide/quick-start`)">{{ t.quickStart }}</a>
        </div>
      </div>

      <div class="home-card">
        <div class="home-card-head">
          <span>{{ t.card }}</span>
          <span class="home-card-index">Arco · Element Plus</span>
        </div>
        <div class="home-card-body">
          <div class="home-row">
            <el-button type="primary">Primary</el-button>
            <el-button>Default</el-button>
            <el-button type="primary" plain>Plain</el-button>
          </div>
          <div class="home-field">
            <div class="home-label">{{ t.name }}</div>
            <el-input v-model="project" clearable />
          </div>
          <div class="home-field home-switch">
            <div>
              <div class="home-label">{{ t.save }}</div>
              <div class="home-sub">{{ t.saveDesc }}</div>
            </div>
            <el-switch v-model="autoSave" />
          </div>
        </div>
        <table class="home-table">
          <thead>
            <tr>
              <th v-for="c in t.cols" :key="c">{{ c }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in rows" :key="r.name">
              <td>{{ r.name }}</td>
              <td>{{ r.arco }}</td>
              <td><el-tag :type="r.type" size="small">✓</el-tag></td>
            </tr>
          </tbody>
        </table>
        <div class="home-card-foot">{{ t.footer }}</div>
      </div>
    </div>
  </section>

  <section class="home-features">
    <div v-for="f in t.features" :key="f[0]" class="home-feature">
      <div class="home-feature-title">{{ f[0] }}</div>
      <p>{{ f[1] }}</p>
    </div>
  </section>
</template>
