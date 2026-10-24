<script setup lang="ts">
import { useId } from 'vue'
/** 每个示例独立定位，避免锚点与站点目录或同页其他示例互相影响。 */
const id = useId()
const sections = ['Overview', 'Details', 'Resources']
</script>

<template>
  <div style="width: 100%; display: flex; gap: 24px">
    <el-anchor :container="'#' + id"   :offset="0" style="width: 150px; flex-shrink: 0">
      <el-anchor-link v-for="section in sections" :key="section" :href="'#' + id + '-' + section" :title="section" />
    </el-anchor>
    <div :id="id" style="height: 220px; overflow: auto; flex: 1; border: 1px solid var(--el-border-color)">
      <section v-for="section in sections" :id="id + '-' + section" :key="section" style="height: 220px; padding: 16px">{{ section }} content</section>
    </div>
  </div>
</template>
