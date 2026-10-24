<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
const neutral = ref(false)
</script>

<template>
  <el-check-tag v-model:checked="checked">Selectable</el-check-tag>
  <el-check-tag v-model:checked="neutral" type="info">Neutral</el-check-tag>
</template>
