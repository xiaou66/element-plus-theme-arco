<script setup lang="ts">
import { ref } from 'vue'
const email = ref('invalid-email')
</script>

<template>
  <el-form style="width: 100%">
    <el-form-item label="Email" error="Please enter a valid email address">
      <el-input v-model="email" placeholder="Email" style="width: 240px" />
    </el-form-item>
  </el-form>
</template>
