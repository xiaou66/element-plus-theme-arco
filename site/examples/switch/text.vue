<script setup lang="ts">
import { ref } from 'vue'
const value = ref(true)
</script>

<template>
  <el-switch v-model="value" inline-prompt active-text="On" inactive-text="Off" />
  <el-switch v-model="value" size="large" />
  <el-switch v-model="value" active-text="Enabled" inactive-text="Disabled" />
</template>
