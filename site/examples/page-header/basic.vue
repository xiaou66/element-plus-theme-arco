<script setup lang="ts">
import { ref } from 'vue'
const status = ref('')
</script>

<template>
  <el-page-header content="Project details" @back="status = 'Back requested'" style="width: 100%" />
  <el-text aria-live="polite">{{ status }}</el-text>
</template>
