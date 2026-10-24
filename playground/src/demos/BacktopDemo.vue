<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'
</script>

<template>
  <CompareCase id="backtop-basic" title="回到顶部" note="滚动容器后出现；EP 的 right / bottom 写在行内样式上，用例两侧都传 24px">
    <template #ep>
      <div class="backtop-box backtop-ep">
        <div class="backtop-inner">滚动这个区域</div>
        <el-backtop target=".backtop-ep" :visibility-height="10" :right="24" :bottom="24" />
      </div>
    </template>
    <template #arco>
      <div class="backtop-box backtop-arco">
        <div class="backtop-inner">滚动这个区域</div>
        <a-back-top target-container=".backtop-arco" :visible-height="10" />
      </div>
    </template>
  </CompareCase>
</template>
