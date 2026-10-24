<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const options = [
  { value: 'alex', label: 'Alex' },
  { value: 'sam', label: 'Sam' },
  { value: 'taylor', label: 'Taylor', disabled: true },
]
</script>

<template>
  <el-mention v-model="value" :options="options" placeholder="Type @ to mention someone" style="width: 320px" />
</template>
