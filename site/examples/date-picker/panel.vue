<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date(2026, 9, 15))
</script>

<template>
  <el-date-picker-panel v-model="value" />
</template>
