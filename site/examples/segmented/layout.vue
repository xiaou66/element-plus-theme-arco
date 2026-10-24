<script setup lang="ts">
import { ref } from 'vue'
const value = ref('Daily')
const options = ['Daily', 'Weekly', 'Monthly']
</script>

<template>
  <el-segmented v-model="value" :options="options" block style="width: 100%" />
  <el-segmented v-model="value" :options="options" direction="vertical" />
</template>
