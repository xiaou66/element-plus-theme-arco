<script lang="ts">
// “Arco 主题 / EP 原版”切换：启用一套样式、停用另一套（<link> 见 config.mts），选择记在 localStorage
// 顶栏和手机菜单（screen）各有一个实例，共用同一个选中状态
import { ref } from 'vue'

const theme = ref<'arco' | 'ep'>('arco')
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'

defineProps<{ screen?: boolean }>()

const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))
const labels = computed(() => (zh.value ? { arco: 'Arco 主题', ep: 'EP 原版' } : { arco: 'Arco Theme', ep: 'EP Default' }))

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
  <div :class="screen ? 'site-screen-switch' : 'site-nav-switch'">
    <p v-if="screen" class="site-screen-switch-text">{{ zh ? '组件样式' : 'Component Style' }}</p>
    <div class="site-switch" role="radiogroup">
      <button v-for="v in ['arco', 'ep'] as const" :key="v" type="button" role="radio" :aria-checked="theme === v" :class="{ active: theme === v }" @click="select(v)">
        {{ labels[v] }}
      </button>
    </div>
  </div>
</template>
