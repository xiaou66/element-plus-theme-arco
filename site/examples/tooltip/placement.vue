<script setup lang="ts">
const placements = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <el-tooltip v-for="placement in placements" :key="placement" :placement="placement" :content="placement">
    <el-button>{{ placement }}</el-button>
  </el-tooltip>
</template>
