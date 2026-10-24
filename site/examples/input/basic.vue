<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
  <el-input v-model="value" placeholder="Enter text" style="width: 240px" />
  <el-input size="small" placeholder="Small" style="width: 240px" />
  <el-input size="large" placeholder="Large" style="width: 240px" />
  <el-input disabled placeholder="Disabled" style="width: 240px" />
</template>
