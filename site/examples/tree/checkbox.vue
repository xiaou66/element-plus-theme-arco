<script setup lang="ts">
const data = [
  { id: 1, label: 'Design', children: [{ id: 11, label: 'Tokens' }, { id: 12, label: 'Components', disabled: true }] },
  { id: 2, label: 'Engineering', children: [{ id: 21, label: 'Testing' }] },
]
</script>

<template>
  <el-tree :data="data" node-key="id" show-checkbox :default-expanded-keys="[1]" :default-checked-keys="[11]" :indent="22" style="width: 100%" />
</template>
