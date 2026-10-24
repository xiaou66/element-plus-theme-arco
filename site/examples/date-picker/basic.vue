<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date(2026, 9, 15))
const sizes = ['small', 'default', 'large'] as const
</script>

<template>
  <el-date-picker v-for="size in sizes" :key="size" v-model="value" :size="size" placeholder="Select a date" style="width: 220px" />
  <el-date-picker v-model="value" disabled style="width: 220px" />
</template>
