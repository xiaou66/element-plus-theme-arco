<script setup lang="ts">
const columns = [
  { key: 'id', dataKey: 'id', title: 'ID', width: 100 },
  { key: 'name', dataKey: 'name', title: 'Name', width: 200 },
  { key: 'team', dataKey: 'team', title: 'Team', width: 200 },
]
const data = Array.from({ length: 1000 }, (_, index) => ({ id: index + 1, name: `User ${index + 1}`, team: 'Platform' }))
</script>

<template>
  <div style="width: 100%; height: 300px">
    <el-auto-resizer>
      <template #default="{ width, height }">
        <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" :row-height="40" :header-height="40" />
      </template>
    </el-auto-resizer>
  </div>
</template>
