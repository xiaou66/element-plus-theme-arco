<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = Array.from({ length: 1000 }, (_, index) => ({ value: index, label: `Option ${index + 1}` }))
</script>

<template>
  <el-select-v2 v-model="value" :options="options" :item-height="36" :show-arrow="false" filterable placeholder="Select an option" style="width: 280px" />
</template>
