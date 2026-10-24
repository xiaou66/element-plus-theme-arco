<script setup lang="ts">
import { ref } from 'vue'
const active = ref(1)
</script>

<template>
  <div style="width: 100%; ">
    <el-steps :active="active" simple>
      <el-step title="Start"  />
      <el-step title="Review"  />
      <el-step title="Finish"  />
    </el-steps>
  </div>
  <el-button @click="active = (active + 1) % 4">Next</el-button>
</template>
