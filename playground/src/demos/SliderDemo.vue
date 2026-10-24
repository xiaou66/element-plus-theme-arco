<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const parts = (side: 'ep' | 'arco') =>
  // Arco 的轨道是 12px 容器 + ::before 画的线、滑块圆圈是 ::after，只比较整体和进度条
  side === 'ep' ? '.el-slider|.el-slider__bar' : '.arco-slider|.arco-slider-bar'
// 只比较未选中的第 4、5 颗：Arco 选中的金色画在内层（外层仍是未选中色），EP 画在图标本身；选中色看截图
const rate = (side: 'ep' | 'arco') =>
  [4, 5]
    .map((n) => (side === 'ep' ? `.el-rate__item:nth-child(${n}) .el-rate__icon` : `.arco-rate-character:nth-child(${n})`))
    .join('|')
</script>

<template>
  <CompareCase id="slider-basic" title="Slider" note="2px 轨道、12px 滑块；禁用时轨道 fill-2">
    <template #ep>
      <div class="stack">
        <span data-pair="basic" data-width :data-target="parts('ep')"><el-slider :model-value="40" /></span>
        <span data-pair="disabled" data-width :data-target="parts('ep')"><el-slider :model-value="40" disabled /></span>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <span data-pair="basic" :data-target="parts('arco')"><a-slider :model-value="40" /></span>
        <span data-pair="disabled" :data-target="parts('arco')"><a-slider :model-value="40" disabled /></span>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="rate-basic" title="Rate" note="24px 图标、间距 8px、选中 gold-6；星星形状不同（图标集）；hover 时 Arco 放大整颗星、EP 放大图标，不比较 hover">
    <template #ep>
      <span data-pair="rate" data-skip="hover" data-pos data-width :data-target="rate('ep')"><el-rate :model-value="3" /></span>
      <span><el-rate :model-value="3" size="small" /></span>
      <span><el-rate :model-value="3" disabled /></span>
    </template>
    <template #arco>
      <span data-pair="rate" :data-target="rate('arco')"><a-rate :model-value="3" /></span>
      <span><a-rate :model-value="3" disabled /></span>
    </template>
  </CompareCase>
</template>
