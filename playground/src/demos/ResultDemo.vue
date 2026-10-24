<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const types = [
  { ep: 'success', arco: 'success' },
  { ep: 'warning', arco: 'warning' },
] as const
const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-result|.el-result__icon|.el-result__icon svg|.el-result__title|.el-result__subtitle|.el-result__extra .el-button'
    : '.arco-result|.arco-result-icon-tip|.arco-result-icon-tip svg|.arco-result-title|.arco-result-subtitle|.arco-result-extra .arco-btn'
</script>

<template>
  <CompareCase id="empty-basic" title="Empty" note="EP 默认插画缩到 48px（Arco 是线性图标，图形不同）">
    <template #ep>
      <span data-pair="empty" class="card-box" data-pos data-width data-target=".el-empty|.el-empty__description"><el-empty description="暂无数据" /></span>
      <span class="card-box"><el-empty description="image-size=100（仍然生效）" :image-size="100" /></span>
    </template>
    <template #arco>
      <span data-pair="empty" class="card-box" data-target=".arco-empty|.arco-empty-description"><a-empty description="暂无数据" /></span>
    </template>
  </CompareCase>

  <CompareCase id="result-basic" title="Result" note="45px 浅色圆底 + 20px 图标；标题 14px / 500（图标形状不同）">
    <template #ep>
      <span v-for="t in types" :key="t.ep" :data-pair="t.ep" class="card-box" data-pos data-width :data-target="parts('ep')">
        <el-result :icon="t.ep" title="提交成功" sub-title="这是一段副标题">
          <template #extra><el-button type="primary">返回</el-button></template>
        </el-result>
      </span>
    </template>
    <template #arco>
      <span v-for="t in types" :key="t.ep" :data-pair="t.ep" class="card-box" :data-target="parts('arco')">
        <a-result :status="t.arco" title="提交成功" subtitle="这是一段副标题">
          <template #extra><a-button type="primary">返回</a-button></template>
        </a-result>
      </span>
    </template>
  </CompareCase>
</template>
