<script setup lang="ts">
import { ref } from 'vue'
import { Location, Setting } from '@element-plus/icons-vue'
const collapsed = ref(true)
</script>

<template>
  <div style="width: 100%">
    <el-switch v-model="collapsed" active-text="Collapsed" style="margin-bottom: 16px" />
    <el-menu :collapse="collapsed" default-active="overview" style="max-width: 240px">
      <el-menu-item index="overview"><el-icon><Location /></el-icon><template #title>Overview</template></el-menu-item>
      <el-menu-item index="settings"><el-icon><Setting /></el-icon><template #title>Settings</template></el-menu-item>
    </el-menu>
  </div>
</template>
