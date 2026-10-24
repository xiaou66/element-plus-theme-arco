<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'
</script>

<template>
  <CompareCase id="statistic-basic" title="标题 / 数值 / 前后缀">
    <template #ep>
      <span data-pair="basic" data-pos data-width data-target=".el-statistic__head|.el-statistic__number">
        <el-statistic title="用户数" :value="125670" />
      </span>
      <span data-pair="affix" data-pos data-width data-target=".el-statistic__head|.el-statistic__number|.el-statistic__suffix">
        <el-statistic title="增长" :value="50" suffix="%" />
      </span>
    </template>
    <template #arco>
      <span data-pair="basic" data-target=".arco-statistic-title|.arco-statistic-value-integer">
        <a-statistic title="用户数" :value="125670" show-group-separator />
      </span>
      <span data-pair="affix" data-target=".arco-statistic-title|.arco-statistic-value-integer|.arco-statistic-suffix">
        <a-statistic title="增长" :value="50"><template #suffix>%</template></a-statistic>
      </span>
    </template>
  </CompareCase>
</template>
