<script setup lang="ts">
import { ref } from 'vue'
const value = ref('overview')
</script>

<template>
  <el-collapse v-model="value" expand-icon-position="left" accordion style="width: 100%">
    <el-collapse-item title="Overview" name="overview">Project overview.</el-collapse-item>
    <el-collapse-item title="Details" name="details">Project details.</el-collapse-item>
  </el-collapse>
</template>
