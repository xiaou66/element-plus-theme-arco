<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const sizes = ['small', 'default', 'large'] as const
const options = ['London', 'Paris', 'Tokyo', 'Shanghai']
</script>

<template>
  <el-select v-for="size in sizes" :key="size" v-model="value" :size="size" placeholder="Select a city" style="width: 240px">
    <el-option v-for="city in options" :key="city" :label="city" :value="city" />
  </el-select>
  <el-select disabled placeholder="Disabled" style="width: 240px" />
</template>
