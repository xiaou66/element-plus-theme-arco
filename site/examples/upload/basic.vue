<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
</script>

<template>
  <el-upload drag action="#" :auto-upload="false" style="width: 100%">
    <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
    <div class="el-upload__text">Drop files here or <em>click to select</em></div>
  </el-upload>
</template>
