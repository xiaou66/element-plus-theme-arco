<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
</script>

<template>
  <div style="width: 100%">
    <el-switch v-model="loading" active-text="Loading" style="margin-bottom: 16px" />
    <div v-loading="loading" element-loading-text="Loading..." style="height: 180px; padding: 24px; border: 1px solid var(--el-border-color)">Project content is loading.</div>
  </div>
</template>
