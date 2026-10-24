<script setup lang="ts">
import { ref } from 'vue'
const size = ref<'small' | 'default' | 'large'>('default')
const rows = [
  { id: 1, name: 'Alex', age: 32, city: 'London', amount: 120 },
  { id: 2, name: 'Sam', age: 28, city: 'Paris', amount: 80 },
  { id: 3, name: 'Taylor', age: 41, city: 'London', amount: 150 },
  { id: 4, name: 'Jordan', age: 35, city: 'Tokyo', amount: 100 },
]
</script>

<template>
  <div style="width: 100%">
    <el-radio-group v-model="size" style="margin-bottom: 16px">
      <el-radio-button value="small">Small</el-radio-button>
      <el-radio-button value="default">Default</el-radio-button>
      <el-radio-button value="large">Large</el-radio-button>
    </el-radio-group>
    <el-table :data="rows" :size="size" stripe show-summary sum-text="Total">
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="amount" label="Amount" />
    </el-table>
  </div>
</template>
