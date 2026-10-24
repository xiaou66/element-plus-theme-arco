<script setup lang="ts">
import { ElMessage } from 'element-plus'
const types = ['primary', 'success', 'warning', 'error', 'info'] as const
</script>

<template>
  <el-button v-for="type in types" :key="type" @click="ElMessage({ type, message: 'This is a ' + type + ' message', showClose: true })">{{ type }}</el-button>
</template>
