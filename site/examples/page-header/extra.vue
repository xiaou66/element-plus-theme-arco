<script setup lang="ts">
import { ref } from 'vue'
const status = ref('')
</script>

<template>
  <el-page-header title="Projects" content="Overview" @back="status = 'Projects requested'" style="width: 100%">
    <template #extra><el-button type="primary">Save</el-button></template>
  </el-page-header>
  <el-text aria-live="polite">{{ status }}</el-text>
</template>
