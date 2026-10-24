<script setup lang="ts">
import { ref } from 'vue'
const value = ref<[Date, Date]>([new Date(2026, 9, 10), new Date(2026, 9, 20)])
</script>

<template>
  <el-date-picker v-model="value" type="daterange" range-separator="-" start-placeholder="Start date" end-placeholder="End date" style="width: 360px; max-width: 100%" />
</template>
