<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const cities = ['London', 'Paris', 'Tokyo', 'Shanghai']
/** 按输入内容过滤候选项，回调必须在每次查询时返回结果。 */
function query(text: string, callback: (items: { value: string }[]) => void) {
  callback(cities.filter((city) => city.toLowerCase().includes(text.toLowerCase())).map((value) => ({ value })))
}
</script>

<template>
  <el-autocomplete v-model="value" :fetch-suggestions="query" :show-arrow="false" placeholder="Search cities" style="width: 240px" />
</template>
