<script setup lang="ts">
import { ref } from 'vue'
const color = ref('#165dff')
</script>

<template>
  <el-color-picker v-model="color" size="small" />
  <el-color-picker v-model="color" />
  <el-color-picker v-model="color" size="large" />
  <el-color-picker v-model="color" disabled />
</template>
