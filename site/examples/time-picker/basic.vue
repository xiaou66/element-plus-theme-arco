<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date(2026, 9, 15, 9, 30, 0))
</script>

<template>
  <el-time-picker v-model="value" placeholder="Select a time" style="width: 240px" />
</template>
