<script setup lang="ts">
import { ref } from 'vue'
const value = ref<[Date, Date]>([new Date(2026, 9, 15, 9), new Date(2026, 9, 15, 18)])
</script>

<template>
  <el-time-picker v-model="value" is-range range-separator="-" start-placeholder="Start time" end-placeholder="End time" style="width: 360px; max-width: 100%" />
</template>
