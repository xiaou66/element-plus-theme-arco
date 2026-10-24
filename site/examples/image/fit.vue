<script setup lang="ts">
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const
</script>

<template>
  <div v-for="fit in fits" :key="fit">
    <el-image src="/images/landscape.svg" :fit="fit" style="width: 120px; height: 120px" />
    <el-text tag="p">{{ fit }}</el-text>
  </div>
</template>
