<script setup lang="ts">
import { ref } from 'vue'
const value = ref('default')
</script>

<template>
  <el-radio-group v-model="value">
    <el-radio value="small" size="small">Small</el-radio>
    <el-radio value="default">Default</el-radio>
    <el-radio value="large" size="large">Large</el-radio>
    <el-radio value="border" border>Border</el-radio>
  </el-radio-group>
</template>
