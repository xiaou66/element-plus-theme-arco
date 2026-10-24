<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
const status = ref('')
// Cancel and close reject the promise; rethrow anything else.
async function open(mode: 'alert' | 'confirm' | 'prompt') {
  try {
    const result = await ElMessageBox[mode]('Review your project settings.', 'Project settings', {
      confirmButtonText: 'Confirm', cancelButtonText: 'Cancel',
      ...(mode === 'prompt' ? { inputPlaceholder: 'Project name', inputValidator: (value: string) => !!value.trim() || 'Please enter a name' } : {}),
    })
    status.value = typeof result === 'object' ? 'Entered: ' + result.value : 'Confirmed'
  } catch (action) {
    if (action !== 'cancel' && action !== 'close') throw action
    status.value = 'Cancelled'
  }
}
</script>

<template>
  <el-button @click="open('alert')">Alert</el-button>
  <el-button @click="open('confirm')">Confirm</el-button>
  <el-button @click="open('prompt')">Prompt</el-button>
  <el-text aria-live="polite">{{ status }}</el-text>
</template>
