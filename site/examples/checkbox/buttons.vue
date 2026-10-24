<script setup lang="ts">
import { ref } from 'vue'
const value = ref(['London'])
</script>

<template>
  <el-checkbox-group v-model="value">
    <el-checkbox-button value="London">London</el-checkbox-button>
    <el-checkbox-button value="Paris">Paris</el-checkbox-button>
    <el-checkbox-button value="Tokyo">Tokyo</el-checkbox-button>
  </el-checkbox-group>
</template>
