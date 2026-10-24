<script setup lang="ts">
const effects = ['light', 'plain', 'dark'] as const
const types = ['primary', 'success', 'warning', 'danger', 'info'] as const
</script>

<template>
  <div style="width: 100%; display: grid; gap: 12px">
    <div v-for="effect in effects" :key="effect" style="display: flex; flex-wrap: wrap; gap: 12px">
      <el-tag v-for="type in types" :key="type" :type="type" :effect="effect">{{ type }}</el-tag>
    </div>
  </div>
</template>
