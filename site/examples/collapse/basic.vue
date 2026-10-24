<script setup lang="ts">
import { ref } from 'vue'
const value = ref(['design'])
</script>

<template>
  <el-collapse v-model="value" style="width: 100%">
    <el-collapse-item title="Design" name="design">Shared tokens keep the interface consistent.</el-collapse-item>
    <el-collapse-item title="Engineering" name="engineering">Components make interfaces easier to maintain.</el-collapse-item>
    <el-collapse-item title="Unavailable" name="disabled" disabled>Unavailable content.</el-collapse-item>
  </el-collapse>
</template>
