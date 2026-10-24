<script setup lang="ts">
import { ref } from 'vue'
const value = ref('Daily')
const sizes = ['small', 'default', 'large'] as const
const options = ['Daily', 'Weekly', { label: 'Monthly', value: 'Monthly', disabled: true }]
</script>

<template>
  <el-segmented v-for="size in sizes" :key="size" v-model="value" :size="size" :options="options" />
</template>
