<script setup lang="ts">
import { ref } from 'vue'
const value = ref('London')
const sizes = ['small', 'default', 'large'] as const
</script>

<template>
  <el-radio-group v-for="size in sizes" :key="size" v-model="value" :size="size">
    <el-radio-button value="London">London</el-radio-button>
    <el-radio-button value="Paris">Paris</el-radio-button>
    <el-radio-button value="Tokyo">Tokyo</el-radio-button>
  </el-radio-group>
</template>
