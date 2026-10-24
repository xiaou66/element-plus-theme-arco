<script setup lang="ts">
import { ref } from 'vue'
const value = ref(true)
</script>

<template>
  <el-switch v-model="value" />
  <el-switch v-model="value" size="small" />
  <el-switch :model-value="true" disabled />
  <el-switch :model-value="false" disabled />
</template>
