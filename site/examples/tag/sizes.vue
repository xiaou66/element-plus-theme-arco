<script setup lang="ts">
import { ref } from 'vue'
const sizes = ['small', 'default', 'large'] as const
const visible = ref(true)
</script>

<template>
  <el-tag v-for="size in sizes" :key="size" :size="size" type="info">{{ size }}</el-tag>
  <el-tag v-if="visible" closable @close="visible = false">Closable</el-tag>
  <el-button v-else @click="visible = true">Reset tag</el-button>
</template>
