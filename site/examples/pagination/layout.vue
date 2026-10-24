<script setup lang="ts">
import { ref } from 'vue'
const page = ref(2)
const pageSize = ref(10)
</script>

<template>
  <div style="width: 100%; overflow-x: auto">
    <el-pagination v-model:current-page="page" v-model:page-size="pageSize" :page-sizes="[10, 20, 50]" :total="500" layout="total, sizes, prev, pager, next, jumper" />
  </div>
</template>
