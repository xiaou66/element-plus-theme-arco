<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const types = ['primary', 'success', 'warning', 'danger'] as const
</script>

<template>
  <CompareCase id="text-types" title="类型" note="EP 默认 ↔ Arco 默认（text-1）；EP info 无 Arco 对应项，不成对比较">
    <template #ep>
      <span data-pair="default" data-width><el-text>默认文字</el-text></span>
      <span v-for="t in types" :key="t" :data-pair="t" data-width><el-text :type="t">文字</el-text></span>
      <span><el-text type="info">info</el-text></span>
    </template>
    <template #arco>
      <span data-pair="default"><a-typography-text>默认文字</a-typography-text></span>
      <span v-for="t in types" :key="t" :data-pair="t"><a-typography-text :type="t">文字</a-typography-text></span>
    </template>
  </CompareCase>
</template>
