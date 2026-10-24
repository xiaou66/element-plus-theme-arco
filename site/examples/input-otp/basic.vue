<script setup lang="ts">
import { ref } from 'vue'
const code = ref('12')
</script>

<template>
  <el-input-otp v-model="code" type="filled" />
  <el-input-otp type="filled" size="small" disabled model-value="123456" />
</template>
