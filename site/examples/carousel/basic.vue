<script setup lang="ts">
const slides = ['var(--el-color-primary)', 'var(--el-color-success)', 'var(--el-color-warning)']
</script>

<template>
  <el-carousel height="200px" :autoplay="false" trigger="click" arrow="always" style="width: 100%">
    <el-carousel-item v-for="(color, index) in slides" :key="color">
      <div :style="{ background: color, height: '100%', display: 'grid', placeItems: 'center', color: 'var(--el-color-white)' }">Slide {{ index + 1 }}</div>
    </el-carousel-item>
  </el-carousel>
</template>
