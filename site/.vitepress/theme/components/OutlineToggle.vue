<script setup lang="ts">
// 右侧目录收起 / 展开（同 Arco 官网）：
// 展开时按钮在目录上方（36px 灰底圆形、箭头朝右）；收起后目录隐藏，按钮贴在窗口右边（半圆、白底、箭头朝左）
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useOutlineCollapse } from '../composables/useOutlineCollapse'

// fixed：收起后贴在窗口右边的那个按钮；否则是目录上方的按钮
const props = defineProps<{ fixed?: boolean }>()
const collapsed = useOutlineCollapse()
const { frontmatter, lang } = useData()
// 只有带右侧目录的文档页才显示
const hasAside = computed(() => frontmatter.value.layout !== 'home' && frontmatter.value.aside !== false)
const label = computed(() =>
  lang.value.startsWith('zh') ? (collapsed.value ? '展开目录' : '收起目录') : collapsed.value ? 'Expand outline' : 'Collapse outline',
)
</script>

<template>
  <button
    v-if="hasAside"
    type="button"
    :class="props.fixed ? 'site-outline-reopen' : 'site-outline-toggle'"
    :aria-label="label"
    :aria-expanded="!collapsed"
    @click="collapsed = !collapsed"
  >
    <svg viewBox="0 0 48 48" width="14" height="14" fill="none" stroke="currentColor" stroke-width="4" aria-hidden="true">
      <path v-if="props.fixed" d="M32 8.4 16.444 23.956 32 39.513" />
      <path v-else d="m16 39.513 15.556-15.557L16 8.4" />
    </svg>
  </button>
</template>
