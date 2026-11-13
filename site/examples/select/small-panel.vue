<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = ['London', 'Paris', 'Tokyo', 'Shanghai']
</script>

<template>
  <el-select v-model="value" size="small" popper-class="is-small" placeholder="Select a city" style="width: 240px">
    <el-option v-for="city in options" :key="city" :label="city" :value="city" />
  </el-select>
  <el-select v-model="value" size="small" placeholder="Select a city" style="width: 240px">
    <el-option v-for="city in options" :key="city" :label="city" :value="city" />
  </el-select>
</template>
