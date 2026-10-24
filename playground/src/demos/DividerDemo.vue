<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const positions = ['left', 'center', 'right'] as const
</script>

<template>
  <CompareCase id="divider-horizontal" title="水平 / 文字位置">
    <template #ep>
      <div class="divider-box">
        <span data-pair="plain"><el-divider /></span>
        <span v-for="p in positions" :key="p" :data-pair="p" data-pos data-target=".el-divider|.el-divider__text">
          <el-divider :content-position="p">Text</el-divider>
        </span>
      </div>
    </template>
    <template #arco>
      <div class="divider-box">
        <span data-pair="plain"><a-divider /></span>
        <span v-for="p in positions" :key="p" :data-pair="p" data-target=".arco-divider|.arco-divider-text">
          <a-divider :orientation="p">Text</a-divider>
        </span>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="divider-vertical" title="垂直">
    <template #ep>
      <span data-pair="vertical" class="inline-flow" data-pos data-width>
        <span>Item</span><el-divider direction="vertical" /><span>Item</span>
      </span>
    </template>
    <template #arco>
      <span data-pair="vertical" class="inline-flow">
        <span>Item</span><a-divider direction="vertical" /><span>Item</span>
      </span>
    </template>
  </CompareCase>
</template>
