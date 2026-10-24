<script setup lang="ts">
import { ref } from 'vue'
const command = ref('none')
</script>

<template>
  <el-dropdown trigger="click" :show-arrow="false" @command="command = $event">
    <el-button>Open menu</el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="edit">Edit</el-dropdown-item>
        <el-dropdown-item command="copy">Copy link</el-dropdown-item>
        <el-dropdown-item command="delete" disabled>Delete</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-text>Selected: {{ command }}</el-text>
</template>
