<script setup lang="ts">
import { ref } from 'vue'
const value = ref([20, 60])
</script>

<template>
  <el-slider v-model="value" range :step="10" show-stops style="width: 100%" />
</template>
