<script setup lang="ts">
import { useId } from 'vue'
// A unique id so the button scrolls this box, not the whole page.
const id = useId()
</script>

<template>
  <div style="position: relative; width: 100%">
    <div :id="id" style="height: 240px; overflow-y: auto; border: 1px solid var(--el-border-color)">
      <p v-for="item in 20" :key="item" style="padding: 16px">Scroll item {{ item }}</p>
    </div>
    <el-backtop :target="'#' + id" :visibility-height="80" :right="16" :bottom="16" style="position: absolute" />
  </div>
</template>
