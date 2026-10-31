<script lang="ts">
// “毛玻璃”开关：给 <html> 加 / 去掉 glass 类（样式见 glass.css，<link> 在 config.mts），选择记在 localStorage
// 顶栏和手机菜单（screen）各有一个实例，共用同一个状态。
// glass.css 属于 Arco 主题这一套，切到“EP 原版”时随之停用，这时开关置灰
import { ref } from 'vue'

const on = ref(false)
const ep = ref(false)
</script>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'

defineProps<{ screen?: boolean }>()

const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))
const label = computed(() => (zh.value ? '毛玻璃' : 'Glass'))

const sync = () => (ep.value = document.documentElement.dataset.siteTheme === 'ep')

onMounted(() => {
  on.value = document.documentElement.classList.contains('glass')
  sync()
  window.addEventListener('site-theme-change', sync)
})

function toggle() {
  on.value = !on.value
  document.documentElement.classList.toggle('glass', on.value)
  try {
    localStorage.setItem('site-glass', on.value ? '1' : '0')
  } catch {}
}
</script>

<template>
  <div :class="screen ? 'site-screen-switch' : 'site-nav-switch'">
    <p v-if="screen" class="site-screen-switch-text">{{ zh ? '毛玻璃效果' : 'Glass Effect' }}</p>
    <div class="site-switch">
      <button
        type="button"
        :class="{ active: on && !ep }"
        :aria-pressed="on && !ep"
        :disabled="ep"
        :title="ep ? (zh ? '毛玻璃只在 Arco 主题下可用' : 'Glass is only available with the Arco theme') : undefined"
        @click="toggle"
      >
        {{ screen ? (on ? (zh ? '已开启' : 'On') : zh ? '已关闭' : 'Off') : label }}
      </button>
    </div>
  </div>
</template>
