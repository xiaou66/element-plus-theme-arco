<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
</script>

<template>
  <el-input-number v-model="value" controls-position="right" align="left" />
</template>
