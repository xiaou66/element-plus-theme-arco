<script setup lang="ts">
import { reactive } from 'vue'
const model = reactive({ project: 'Design system', description: '' })
</script>

<template>
  <el-form :model="model" label-position="top" style="width: 100%; max-width: 360px">
    <el-form-item label="Project"><el-input v-model="model.project" /></el-form-item>
    <el-form-item label="Description"><el-input v-model="model.description" type="textarea" :rows="2" /></el-form-item>
  </el-form>
</template>
