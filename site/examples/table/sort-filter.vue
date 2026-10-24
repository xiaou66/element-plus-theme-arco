<script setup lang="ts">
const rows = [
  { id: 1, name: 'Alex', age: 32, city: 'London', amount: 120 },
  { id: 2, name: 'Sam', age: 28, city: 'Paris', amount: 80 },
  { id: 3, name: 'Taylor', age: 41, city: 'London', amount: 150 },
  { id: 4, name: 'Jordan', age: 35, city: 'Tokyo', amount: 100 },
]
const filters = [{ text: 'London', value: 'London' }, { text: 'Paris', value: 'Paris' }]
/** 筛选条件来自固定城市选项，仅保留匹配该城市的行。 */
function filterCity(value: string, row: (typeof rows)[number]) {
  return row.city === value
}
</script>

<template>
  <el-table :data="rows" :default-sort="{ prop: 'age', order: 'ascending' }" style="width: 100%">
    <el-table-column type="selection" width="40" />
    <el-table-column prop="name" label="Name" sortable />
    <el-table-column prop="age" label="Age" sortable width="100" />
    <el-table-column prop="city" label="City" :filters="filters" :filter-method="filterCity" />
  </el-table>
</template>
