<script setup lang="ts">
const icons = ['success', 'warning', 'error', 'info'] as const
</script>

<template>
  <el-result v-for="icon in icons" :key="icon" :icon="icon" :title="icon" sub-title="Review the operation result." style="width: 280px; max-width: 100%">
    <template #extra><el-button type="primary">Continue</el-button></template>
  </el-result>
</template>
