<script setup lang="ts">
const sizes = ['small', 'default', 'large'] as const
</script>

<template>
  <el-dropdown v-for="size in sizes" :key="size" :size="size">
    <el-button :size="size">{{ size }}</el-button>
    <template #dropdown>
      <el-dropdown-menu><el-dropdown-item>Edit</el-dropdown-item><el-dropdown-item divided>Archive</el-dropdown-item></el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
