<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

// EP type → Arco dot color
const dots = [
  { ep: 'primary', arco: 'arcoblue' },
  { ep: 'success', arco: 'green' },
  { ep: 'warning', arco: 'orange' },
  { ep: 'info', arco: 'gray' },
  { ep: 'danger', arco: 'red' },
] as const
</script>

<template>
  <CompareCase id="badge-count" title="数字 / 封顶" note="EP value / max ↔ Arco count / max-count；角标中心在右上角内缩 2px">
    <template #ep>
      <span data-pair="count-1" data-width data-pos><el-badge :value="1"><span class="badge-box" /></el-badge></span>
      <span data-pair="count-12" data-width data-pos><el-badge :value="12"><span class="badge-box" /></el-badge></span>
      <span data-pair="count-max" data-width data-pos><el-badge :value="120" :max="99"><span class="badge-box" /></el-badge></span>
      <span data-pair="text" data-width data-pos><el-badge value="new"><span class="badge-box" /></el-badge></span>
    </template>
    <template #arco>
      <span data-pair="count-1"><a-badge :count="1"><span class="badge-box" /></a-badge></span>
      <span data-pair="count-12"><a-badge :count="12"><span class="badge-box" /></a-badge></span>
      <span data-pair="count-max"><a-badge :count="120" :max-count="99"><span class="badge-box" /></a-badge></span>
      <span data-pair="text"><a-badge text="new"><span class="badge-box" /></a-badge></span>
    </template>
  </CompareCase>

  <CompareCase id="badge-dot" title="小圆点 / 颜色" note="EP is-dot + type ↔ Arco dot + color">
    <template #ep>
      <span v-for="d in dots" :key="d.ep" :data-pair="d.ep" data-width data-pos>
        <el-badge is-dot :type="d.ep"><span class="badge-box" /></el-badge>
      </span>
    </template>
    <template #arco>
      <span v-for="d in dots" :key="d.ep" :data-pair="d.ep">
        <a-badge dot :count="1" :color="d.arco"><span class="badge-box" /></a-badge>
      </span>
    </template>
  </CompareCase>
</template>
