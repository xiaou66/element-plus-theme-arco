<script setup lang="ts">
import { ref } from 'vue'
const border = ref(false)
const header = ref(true)
const fit = ref(true)
const rows = [
  { id: 1, name: 'Alex', age: 32, city: 'London', amount: 120 },
  { id: 2, name: 'Sam', age: 28, city: 'Paris', amount: 80 },
  { id: 3, name: 'Taylor', age: 41, city: 'London', amount: 150 },
  { id: 4, name: 'Jordan', age: 35, city: 'Tokyo', amount: 100 },
]
</script>

<template>
  <div style="width: 100%">
    <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px">
      <el-switch v-model="border" active-text="Border" />
      <el-switch v-model="header" active-text="Header" />
      <el-switch v-model="fit" active-text="Fit" />
    </div>
    <el-table :data="rows" :border="border" :show-header="header" :fit="fit" highlight-current-row>
      <el-table-column prop="name" label="Name" width="160" />
      <el-table-column prop="age" label="Age" width="100" />
      <el-table-column prop="city" label="City" show-overflow-tooltip />
    </el-table>
  </div>
</template>
