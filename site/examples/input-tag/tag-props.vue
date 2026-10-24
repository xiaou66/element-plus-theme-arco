<script setup lang="ts">
import { ref } from 'vue'
const primary = ref(['Vue', 'Arco'])
const dark = ref(['Vue', 'Arco'])
</script>

<template>
  <el-input-tag v-model="primary" tag-type="primary" style="width: 320px" />
  <el-input-tag v-model="dark" tag-effect="dark" style="width: 320px" />
</template>
