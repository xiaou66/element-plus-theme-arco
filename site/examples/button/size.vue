<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
</script>

<template>
  <el-button type="primary" size="small">Small</el-button>
  <el-button type="primary">Default</el-button>
  <el-button type="primary" size="large">Large</el-button>
  <el-button type="primary" :icon="Search" circle />
  <el-button :icon="Search" round>Round</el-button>
  <el-button type="primary" loading>Loading</el-button>
  <el-button type="primary" disabled>Disabled</el-button>
  <el-button disabled>Disabled</el-button>
</template>
