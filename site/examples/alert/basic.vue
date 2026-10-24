<script setup lang="ts">
const types = ['primary', 'success', 'warning', 'error', 'info'] as const
</script>

<template>
  <div style="width: 100%; display: grid; gap: 12px">
    <el-alert v-for="type in types" :key="type" :type="type" :title="type" :show-icon="type !== 'info'" :closable="false" />
  </div>
</template>
