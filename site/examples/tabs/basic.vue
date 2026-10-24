<script setup lang="ts">
import { ref } from 'vue'
const active = ref('overview')
</script>

<template>
  <el-tabs v-model="active" style="width: 100%">
      <el-tab-pane label="Overview" name="overview">Project overview.</el-tab-pane>
      <el-tab-pane label="Activity" name="activity">Recent activity.</el-tab-pane>
      <el-tab-pane label="Unavailable" name="disabled" disabled />
  </el-tabs>
</template>
