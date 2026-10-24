<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'
</script>

<template>
  <CompareCase id="loading-basic" title="区域加载" note="v-loading ↔ Arco Spin（:loading）；只成对比较遮罩（图标在旋转，包围盒会变；文字的居中结构不同），图标和文字看截图；图标形状不同">
    <template #ep>
      <span data-pair="loading" class="card-box loading-box" data-target=".el-loading-mask">
        <div v-loading="true" element-loading-text="加载中" class="loading-area">内容区域</div>
      </span>
    </template>
    <template #arco>
      <span data-pair="loading" class="card-box loading-box" data-target=".arco-spin-mask">
        <a-spin :loading="true" tip="加载中" class="loading-area"><div class="loading-area">内容区域</div></a-spin>
      </span>
    </template>
  </CompareCase>
</template>
