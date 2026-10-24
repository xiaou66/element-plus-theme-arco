<script setup lang="ts">
import { ref } from 'vue'
const value = ref(40)
</script>

<template>
  <div style="width: 100%; display: grid; gap: 20px">
    <el-slider v-model="value" />
    <el-slider :model-value="40" disabled />
  </div>
</template>
