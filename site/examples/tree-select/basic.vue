<script setup lang="ts">
import { ref } from 'vue'
const value = ref('tokens')
const data = [
  { value: 'design', label: 'Design', children: [{ value: 'tokens', label: 'Tokens' }, { value: 'components', label: 'Components' }] },
  { value: 'engineering', label: 'Engineering', children: [{ value: 'testing', label: 'Testing' }] },
]
</script>

<template>
  <el-tree-select v-model="value" :data="data" :show-arrow="false" placeholder="Select a topic" style="width: 280px" />
</template>
