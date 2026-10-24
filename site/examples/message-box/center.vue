<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
const status = ref('')
// Cancel and close reject the promise; rethrow anything else.
async function open() {
  try {
    await ElMessageBox.confirm('Publish this project?', 'Publish project', { center: true, type: 'warning', confirmButtonText: 'Publish', cancelButtonText: 'Cancel' })
    status.value = 'Published'
  } catch (action) {
    if (action !== 'cancel' && action !== 'close') throw action
    status.value = 'Cancelled'
  }
}
</script>

<template>
  <el-button @click="open">Open centered confirmation</el-button>
  <el-text aria-live="polite">{{ status }}</el-text>
</template>
