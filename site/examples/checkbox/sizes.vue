<script setup lang="ts">
import { ref } from 'vue'
const value = ref(true)
</script>

<template>
  <el-checkbox v-model="value" size="small">Small</el-checkbox>
  <el-checkbox v-model="value">Default</el-checkbox>
  <el-checkbox v-model="value" size="large">Large</el-checkbox>
  <el-checkbox v-model="value" border>Border</el-checkbox>
</template>
