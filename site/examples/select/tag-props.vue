<script setup lang="ts">
import { ref } from 'vue'
const value = ref(['London', 'Paris'])
const options = ['London', 'Paris', 'Tokyo', 'Shanghai']
</script>

<template>
  <el-select v-model="value" multiple tag-type="primary" tag-effect="dark" style="width: 320px">
    <el-option v-for="city in options" :key="city" :label="city" :value="city" />
  </el-select>
</template>
