<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>

<template>
  <el-button type="primary" @click="open = true">Open dialog</el-button>
  <el-dialog v-model="open" title="Project settings" >
    Review the changes before continuing.
    <template #footer>
      <el-button @click="open = false">Cancel</el-button>
      <el-button type="primary" @click="open = false">Confirm</el-button>
    </template>
  </el-dialog>
</template>
