<script setup lang="ts">
import { Location, Folder, Setting } from '@element-plus/icons-vue'
</script>

<template>
  <el-menu default-active="overview" style="width: 240px">
    <el-menu-item index="overview"><el-icon><Location /></el-icon><span>Overview</span></el-menu-item>
    <el-sub-menu index="projects">
      <template #title><el-icon><Folder /></el-icon><span>Projects</span></template>
      <el-menu-item index="design">Design system</el-menu-item>
      <el-menu-item index="website">Website</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="settings" disabled><el-icon><Setting /></el-icon><span>Settings</span></el-menu-item>
  </el-menu>
</template>
