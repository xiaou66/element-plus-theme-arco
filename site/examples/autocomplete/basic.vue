<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const cities = ['London', 'Paris', 'Tokyo', 'Shanghai']
// Filter suggestions by the input; the callback must be called on every query.
function query(text: string, callback: (items: { value: string }[]) => void) {
  callback(cities.filter((city) => city.toLowerCase().includes(text.toLowerCase())).map((value) => ({ value })))
}
</script>

<template>
  <el-autocomplete v-model="value" :fetch-suggestions="query" :show-arrow="false" placeholder="Search cities" style="width: 240px" />
</template>
