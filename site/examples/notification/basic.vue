<script setup lang="ts">
import { ElNotification } from 'element-plus'
const types = ['primary', 'success', 'warning', 'error', 'info'] as const
</script>

<template>
  <el-button v-for="type in types" :key="type" @click="ElNotification({ type, title: type, message: 'Your project has a new update.' })">{{ type }}</el-button>
</template>
