<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'
</script>

<template>
  <CompareCase id="page-header-basic" title="返回 + 标题" note="EP content ↔ Arco title；EP 的返回文字和分割线 Arco 没有，只比较图标和标题">
    <template #ep>
      <span data-pair="basic" class="desc-box" data-target=".el-page-header__icon svg|.el-page-header__content">
        <el-page-header content="页面标题" />
      </span>
    </template>
    <template #arco>
      <span data-pair="basic" class="desc-box" data-target=".arco-page-header-back-btn svg|.arco-page-header-title">
        <a-page-header title="页面标题" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="page-header-back-text" title="带返回文字（Arco 无对应项）" note="返回文字 14px text-2，分割线与 Arco 标题 / 副标题之间的分割线相同；不成对比较">
    <template #ep>
      <span class="desc-box"><el-page-header content="页面标题" title="返回" /></span>
    </template>
    <template #arco>
      <span class="desc-box"><a-page-header title="页面标题" subtitle="副标题" /></span>
    </template>
  </CompareCase>
</template>
