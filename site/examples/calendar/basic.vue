<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date(2026, 9, 15))
</script>

<template>
  <el-calendar v-model="value" style="width: 100%" />
</template>
