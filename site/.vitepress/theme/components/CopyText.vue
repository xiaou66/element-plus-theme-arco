<script setup lang="ts">
// 单击复制变量名，复制后弹出提示
import { useData } from 'vitepress'
import { ElMessage } from 'element-plus'

const props = defineProps<{ text: string }>()
const { lang } = useData()

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text)
    ElMessage({ type: 'success', message: lang.value.startsWith('zh') ? `已复制 ${props.text}` : `Copied ${props.text}`, duration: 1500 })
  } catch {
    ElMessage({ type: 'error', message: lang.value.startsWith('zh') ? '复制失败' : 'Copy failed', duration: 1500 })
  }
}
</script>

<template>
  <button type="button" class="copy-text" :title="lang.startsWith('zh') ? '单击复制' : 'Click to copy'" @click="copy">
    <code>{{ text }}</code>
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  </button>
</template>
