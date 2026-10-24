<script setup lang="ts">
// “Arco 主题 / EP 原版”切换：启用一套样式、停用另一套（<link> 见 config.mts），选择记在 localStorage
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { lang } = useData()
const theme = ref<'arco' | 'ep'>('arco')
const labels = computed(() => (lang.value.startsWith('zh') ? { arco: 'Arco 主题', ep: 'EP 原版' } : { arco: 'Arco Theme', ep: 'EP Default' }))

onMounted(() => {
  theme.value = document.documentElement.dataset.siteTheme === 'ep' ? 'ep' : 'arco'
})

function select(value: 'arco' | 'ep') {
  theme.value = value
  try {
    localStorage.setItem('site-theme', value)
  } catch {}
  // 停用另一套样式（函数定义在 config.mts 的启动脚本里）
  ;(window as any).__siteApplyTheme?.(value)
  // 设计变量页按当前样式重新读取变量值
  window.dispatchEvent(new CustomEvent('site-theme-change'))
}
</script>

<template>
  <div class="site-switch" role="radiogroup">
    <button v-for="v in ['arco', 'ep'] as const" :key="v" type="button" role="radio" :aria-checked="theme === v" :class="{ active: theme === v }" @click="select(v)">
      {{ labels[v] }}
    </button>
  </div>
</template>
