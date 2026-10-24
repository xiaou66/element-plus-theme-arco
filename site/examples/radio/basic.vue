<script setup lang="ts">
import { ref } from 'vue'
const value = ref('Vue')
</script>

<template>
  <el-radio-group v-model="value">
    <el-radio value="Vue">Vue</el-radio>
    <el-radio value="React">React</el-radio>
    <el-radio value="Other" disabled>Other</el-radio>
  </el-radio-group>
</template>
