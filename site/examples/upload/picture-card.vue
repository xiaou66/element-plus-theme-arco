<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadUserFile } from 'element-plus'
const files = ref<UploadUserFile[]>([{ name: 'Landscape', url: '/images/landscape.svg' }])
</script>

<template>
  <el-upload v-model:file-list="files" list-type="picture-card" action="#" :auto-upload="false">
    <el-icon><Plus /></el-icon>
  </el-upload>
</template>
