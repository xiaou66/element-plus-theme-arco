<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const parts = (side: 'ep' | 'arco') =>
  side === 'ep' ? '.el-progress-bar__outer|.el-progress-bar__inner|.el-progress__text' : '.arco-progress-line|.arco-progress-line-bar|.arco-progress-line-text'
</script>

<template>
  <CompareCase id="progress-line" title="线形" note="EP 默认 stroke-width 是 6，Arco 是 4（行内样式，用例统一传 4）；有状态时 EP 只显示图标、Arco 显示百分比加图标，宽度不比较">
    <template #ep>
      <div class="stack">
        <span data-pair="normal" data-pos data-width :data-target="parts('ep')"><el-progress :percentage="40" :stroke-width="4" /></span>
        <span data-pair="success" data-pos data-target=".el-progress-bar__outer|.el-progress-bar__inner">
          <el-progress :percentage="100" :stroke-width="4" status="success" />
        </span>
        <span data-pair="warning" data-pos data-target=".el-progress-bar__outer|.el-progress-bar__inner">
          <el-progress :percentage="60" :stroke-width="4" status="warning" />
        </span>
        <span data-pair="danger" data-pos data-target=".el-progress-bar__outer|.el-progress-bar__inner">
          <el-progress :percentage="30" :stroke-width="4" status="exception" />
        </span>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <span data-pair="normal" :data-target="parts('arco')"><a-progress :percent="0.4" /></span>
        <span data-pair="success" data-target=".arco-progress-line|.arco-progress-line-bar"><a-progress :percent="1" status="success" /></span>
        <span data-pair="warning" data-target=".arco-progress-line|.arco-progress-line-bar"><a-progress :percent="0.6" status="warning" /></span>
        <span data-pair="danger" data-target=".arco-progress-line|.arco-progress-line-bar"><a-progress :percent="0.3" status="danger" /></span>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="progress-circle" title="环形" note="只对齐颜色和文字；环的尺寸、线宽按 props 传入">
    <template #ep>
      <span data-pair="circle" data-target=".el-progress__text"><el-progress type="circle" :percentage="40" :width="80" :stroke-width="4" /></span>
    </template>
    <template #arco>
      <span data-pair="circle" data-target=".arco-progress-circle-text"><a-progress type="circle" :percent="0.4" :width="80" :stroke-width="4" /></span>
    </template>
  </CompareCase>
</template>
