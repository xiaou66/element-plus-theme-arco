<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
  <el-select v-model="value" :show-arrow="false" placeholder="Select a city" style="width: 240px">
    <el-option-group label="Europe">
      <el-option label="London" value="London" />
      <el-option label="Paris" value="Paris" />
    </el-option-group>
    <el-option-group label="Asia">
      <el-option label="Tokyo" value="Tokyo" />
      <el-option label="Shanghai (unavailable)" value="Shanghai" disabled />
    </el-option-group>
  </el-select>
</template>
