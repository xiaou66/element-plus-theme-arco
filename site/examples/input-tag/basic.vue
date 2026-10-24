<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Vue', 'Arco'])
</script>

<template>
  <el-input-tag v-model="tags" placeholder="Add a tag" style="width: 320px" />
  <el-input-tag :model-value="['Vue', 'Arco']" disabled style="width: 320px" />
</template>
