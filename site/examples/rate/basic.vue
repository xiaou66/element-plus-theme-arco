<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3.5)
</script>

<template>
  <el-rate v-model="value" allow-half />
  <el-rate :model-value="3" size="small" />
  <el-rate :model-value="4" disabled show-score />
</template>
