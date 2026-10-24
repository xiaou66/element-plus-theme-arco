<script setup lang="ts">
import { ref } from 'vue'
const color = ref('rgba(22, 93, 255, 0.8)')
const predefine = ['#165dff', '#00b42a', '#ff7d00', '#f53f3f']
</script>

<template>
  <el-color-picker-panel v-model="color" show-alpha :predefine="predefine" />
</template>
