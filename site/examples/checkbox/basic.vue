<script setup lang="ts">
import { ref } from 'vue'
const value = ref(['Vue'])
</script>

<template>
  <el-checkbox-group v-model="value">
    <el-checkbox value="Vue">Vue</el-checkbox>
    <el-checkbox value="React">React</el-checkbox>
    <el-checkbox value="Partial" indeterminate>Partial</el-checkbox>
    <el-checkbox value="Disabled" disabled>Disabled</el-checkbox>
  </el-checkbox-group>
</template>
