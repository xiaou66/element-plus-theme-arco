<script setup lang="ts">
import { ElMessage } from 'element-plus'
</script>

<template>
  <el-button @click="ElMessage({ message: 'Default message', type: 'success' })">Default</el-button>
  <el-button @click="ElMessage({ message: 'Plain message', type: 'success', plain: true })">Plain</el-button>
</template>
