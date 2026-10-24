<script setup lang="ts">
// 侧栏收起 / 展开按钮（同 Arco 官网）：圆形按钮压在侧栏右边线上；收起后侧栏只留 12px 的一条边。
// 状态写在 <html> 的 class 上，样式见 custom.css；记住上次的选择
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { useSidebar } from 'vitepress/theme'

const { hasSidebar } = useSidebar()
const { lang } = useData()
const collapsed = ref(false)

onMounted(() => {
  try {
    collapsed.value = localStorage.getItem('site-sidebar-collapsed') === '1'
  } catch {}
})

watch(collapsed, (v) => {
  document.documentElement.classList.toggle('sidebar-collapsed', v)
  try {
    localStorage.setItem('site-sidebar-collapsed', v ? '1' : '0')
  } catch {}
})
</script>

<template>
  <button
    v-if="hasSidebar"
    type="button"
    class="site-sidebar-toggle"
    :aria-label="lang.startsWith('zh') ? (collapsed ? '展开侧栏' : '收起侧栏') : collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
    :aria-expanded="!collapsed"
    @click="collapsed = !collapsed"
  >
    <svg viewBox="0 0 48 48" width="12" height="12" fill="none" stroke="currentColor" stroke-width="4" aria-hidden="true">
      <path v-if="collapsed" d="m16 39.513 15.556-15.557L16 8.4" />
      <path v-else d="M32 8.4 16.444 23.956 32 39.513" />
    </svg>
  </button>
</template>
