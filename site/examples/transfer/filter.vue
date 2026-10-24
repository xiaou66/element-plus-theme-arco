<script setup lang="ts">
import { ref } from 'vue'
const value = ref([2, 4])
const data = Array.from({ length: 8 }, (_, index) => ({ key: index + 1, label: `Option ${index + 1}`, disabled: index === 5 }))
</script>

<template>
  <div style="width: 100%; overflow-x: auto">
    <el-transfer v-model="value" :data="data" filterable filter-placeholder="Search options" :titles="['Available', 'Selected']" />
  </div>
</template>
