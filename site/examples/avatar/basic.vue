<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
</script>

<template>
  <el-avatar size="small">A</el-avatar>
  <el-avatar>AB</el-avatar>
  <el-avatar size="large">C</el-avatar>
  <el-avatar shape="square">D</el-avatar>
  <el-avatar :icon="UserFilled" />
</template>
