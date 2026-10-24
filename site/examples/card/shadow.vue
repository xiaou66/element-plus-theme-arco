<script setup lang="ts">
const shadows = ['always', 'hover', 'never'] as const
</script>

<template>
  <el-card v-for="shadow in shadows" :key="shadow" :shadow="shadow" :header="shadow" style="width: 200px; max-width: 100%">Card content</el-card>
</template>
