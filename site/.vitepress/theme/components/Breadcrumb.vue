<script setup lang="ts">
// 标题上方的面包屑（同 Arco 官网）：侧边栏里当前页所在的分组 / 当前页
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

interface Item {
  text: string
  link?: string
  items?: Item[]
}

const { theme } = useData()
const route = useRoute()

const trail = computed(() => {
  const path = route.path.replace(/\.html$/, '')
  const sidebar = theme.value.sidebar as Record<string, Item[]> | undefined
  // 组件页是“组件 / 分组”，指南页是“指南 / 页面”
  const find = (groups: Item[], parent?: string): string[] | undefined => {
    for (const group of groups) {
      if (group.items?.some((i) => i.link === path)) return parent ? [parent, group.text] : [group.text, group.items.find((i) => i.link === path)!.text]
      const hit = group.items && find(group.items, group.text)
      if (hit) return hit
    }
  }
  for (const groups of Object.values(sidebar ?? {})) {
    const hit = find(groups)
    if (hit) return hit
  }
  return []
})
</script>

<template>
  <div v-if="trail.length" class="site-breadcrumb">
    <span>{{ trail[0] }}</span>
    <span class="sep">/</span>
    <span class="current">{{ trail[1] }}</span>
  </div>
</template>
