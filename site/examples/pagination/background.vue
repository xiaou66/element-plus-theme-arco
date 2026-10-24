<script setup lang="ts">
import { ref } from 'vue'
const page = ref(2)
</script>

<template>
  <el-pagination v-model:current-page="page" :total="50" background layout="prev, pager, next" />
  <el-pagination v-model:current-page="page" :total="50" disabled layout="prev, pager, next" />
</template>
