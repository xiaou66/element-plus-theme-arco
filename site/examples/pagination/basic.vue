<script setup lang="ts">
import { ref } from 'vue'
const page = ref(2)
const sizes = ['small', 'default', 'large'] as const
</script>

<template>
  <div style="width: 100%; overflow-x: auto; display: grid; gap: 16px">
    <el-pagination v-for="size in sizes" :key="size" v-model:current-page="page" :size="size" :total="50" layout="prev, pager, next" />
  </div>
</template>
