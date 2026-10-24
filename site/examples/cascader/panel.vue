<script setup lang="ts">
import { ref } from 'vue'
const value = ref(['europe', 'london'])
const options = [
  { value: 'europe', label: 'Europe', children: [{ value: 'london', label: 'London' }, { value: 'paris', label: 'Paris' }] },
  { value: 'asia', label: 'Asia', children: [{ value: 'tokyo', label: 'Tokyo' }] },
  { value: 'other', label: 'Other', disabled: true },
]
</script>

<template>
  <el-cascader-panel v-model="value" :options="options" />
</template>
