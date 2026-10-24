<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
const direction = ref<'rtl' | 'ltr' | 'ttb' | 'btt'>('rtl')
</script>

<template>
  <el-radio-group v-model="direction">
    <el-radio-button value="rtl">Right</el-radio-button>
    <el-radio-button value="ltr">Left</el-radio-button>
    <el-radio-button value="ttb">Top</el-radio-button>
    <el-radio-button value="btt">Bottom</el-radio-button>
  </el-radio-group>
  <el-button type="primary" @click="open = true">Open drawer</el-button>
  <el-drawer v-model="open" :direction="direction" title="Project details" size="300px">
    Review the project details here.
    <template #footer><el-button @click="open = false">Close</el-button></template>
  </el-drawer>
</template>
