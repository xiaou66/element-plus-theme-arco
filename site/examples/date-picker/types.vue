<script setup lang="ts">
import { ref } from 'vue'
const month = ref<Date>()
const year = ref<Date>()
const datetime = ref<Date>()
</script>

<template>
  <el-date-picker v-model="month" type="month" placeholder="Select a month" style="width: 220px" />
  <el-date-picker v-model="year" type="year" placeholder="Select a year" style="width: 220px" />
  <el-date-picker v-model="datetime" type="datetime" placeholder="Select date and time" style="width: 240px" />
</template>
