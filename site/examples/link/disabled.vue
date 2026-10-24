<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
</script>

<template>
  <el-link disabled>Disabled</el-link>
  <el-link type="primary" disabled>Primary</el-link>
  <el-link type="primary" :icon="Edit">Edit</el-link>
</template>
