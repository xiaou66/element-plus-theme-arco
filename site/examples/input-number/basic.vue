<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
</script>

<template>
  <el-input-number v-model="value" align="left" :min="0" :max="10" />
  <el-input-number v-model="value" size="small" align="left" />
  <el-input-number v-model="value" size="large" align="left" />
  <el-input-number :model-value="3" disabled align="left" />
</template>
