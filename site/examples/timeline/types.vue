<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue'
</script>

<template>
  <el-timeline style="width: 100%">
    <el-timeline-item type="success">Completed</el-timeline-item>
    <el-timeline-item type="danger">Needs attention</el-timeline-item>
    <el-timeline-item type="primary" hollow>In progress</el-timeline-item>
    <el-timeline-item size="large" :icon="MoreFilled" timestamp="2026-10-24" placement="top">Next milestone</el-timeline-item>
  </el-timeline>
</template>
