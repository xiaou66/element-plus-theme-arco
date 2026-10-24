<script setup lang="ts">
const rows = [
  { id: 1, name: 'Alex', age: 32, city: 'London', amount: 120 },
  { id: 2, name: 'Sam', age: 28, city: 'Paris', amount: 80 },
  { id: 3, name: 'Taylor', age: 41, city: 'London', amount: 150 },
  { id: 4, name: 'Jordan', age: 35, city: 'Tokyo', amount: 100 },
]
</script>

<template>
  <el-table :data="rows" style="width: 100%">
    <el-table-column prop="name" label="Name" fixed width="160" />
    <el-table-column label="Details">
      <el-table-column prop="age" label="Age" width="180" />
      <el-table-column prop="city" label="City" width="220" />
      <el-table-column prop="amount" label="Amount" width="180" />
    </el-table-column>
    <el-table-column label="Actions" fixed="right" width="110"><template #default><el-button link type="primary">Edit</el-button></template></el-table-column>
  </el-table>
</template>
