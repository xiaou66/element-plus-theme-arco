<script setup lang="ts">
import { ref } from 'vue'
const status = ref('')
</script>

<template>
  <el-popconfirm title="Delete this project?" confirm-button-text="Delete" cancel-button-text="Cancel" @confirm="status = 'Deleted'" @cancel="status = 'Cancelled'">
    <template #reference><el-button type="danger">Delete</el-button></template>
  </el-popconfirm>
  <el-text aria-live="polite">{{ status }}</el-text>
</template>
