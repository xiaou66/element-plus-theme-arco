<script setup lang="ts">
// 示例（同 Arco 官网）：带边框的预览框，右下角是“显示代码 / 复制代码”图标按钮，代码展开在下面。
// 标题和说明写在 Markdown 里；代码块由 config.mts 里的 demo 容器在构建时生成。
// 预览区带 vp-raw：正文排版不作用于示例里的组件（见 config.mts 的 postcssIsolateStyles）
import { computed, defineAsyncComponent, ref, type Component } from 'vue'
import { useData } from 'vitepress'
import { ElMessage } from 'element-plus'

// 不用 eager：每个示例单独打包，页面只加载自己用到的示例，而不是所有页面都带上全部示例
const modules = import.meta.glob('../../../examples/**/*.vue') as Record<string, () => Promise<{ default: Component }>>
const cache = new Map<string, Component>()

// clientOnly：预渲染结果和浏览器里对不上的示例只在浏览器里渲染预览区，代码块照常预渲染
const props = defineProps<{ src: string; clientOnly?: boolean }>()
const component = computed(() => {
  const loader = modules[`../../../examples/${props.src}.vue`]
  if (!loader) return undefined
  if (!cache.has(props.src)) cache.set(props.src, defineAsyncComponent(loader))
  return cache.get(props.src)
})
const open = ref(false)
const codeEl = ref<HTMLElement>()
const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))

async function copy() {
  const text = codeEl.value?.querySelector('pre code')?.textContent ?? ''
  try {
    await navigator.clipboard.writeText(text)
    ElMessage({ type: 'success', message: zh.value ? '已复制代码' : 'Code copied', duration: 1500 })
  } catch {
    ElMessage({ type: 'error', message: zh.value ? '复制失败' : 'Copy failed', duration: 1500 })
  }
}
</script>

<template>
  <section class="demo">
    <div class="demo-preview vp-raw">
      <ClientOnly v-if="clientOnly">
        <component :is="component" />
      </ClientOnly>
      <component :is="component" v-else />
    </div>
    <div class="demo-actions">
      <button
        type="button"
        class="demo-action"
        :class="{ active: open }"
        :aria-expanded="open"
        :title="zh ? (open ? '收起代码' : '显示代码') : open ? 'Hide code' : 'Show code'"
        @click="open = !open"
      >
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
          <path d="M8 6 2 12l6 6M16 6l6 6-6 6" />
        </svg>
      </button>
      <button type="button" class="demo-action" :title="zh ? '复制代码' : 'Copy code'" @click="copy">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <path d="M5 15V5a2 2 0 0 1 2-2h10" />
        </svg>
      </button>
    </div>
    <div v-show="open" ref="codeEl" class="demo-code">
      <slot name="code" />
    </div>
  </section>
</template>
