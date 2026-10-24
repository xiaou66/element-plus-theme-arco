<script setup lang="ts">
import { ref } from 'vue'
const outlined = ref('12')
const underlined = ref('12')
</script>

<template>
  <el-input-otp v-model="outlined" />
  <el-input-otp v-model="underlined" type="underlined" />
</template>
