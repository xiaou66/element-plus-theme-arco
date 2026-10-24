<script setup lang="ts">
import { ref } from 'vue'
const active = ref(1)
</script>

<template>
  <div style="width: 100%; ">
    <el-steps :active="active" align-center>
      <el-step title="Start" description="Create the project" />
      <el-step title="Review" description="Review the details" />
      <el-step title="Finish" description="Publish the result" />
    </el-steps>
  </div>
  <el-button @click="active = (active + 1) % 4">Next</el-button>
</template>
