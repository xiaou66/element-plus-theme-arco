<script setup lang="ts">
import { ref } from 'vue'
import { User, Search } from '@element-plus/icons-vue'
const name = ref('Alex')
const password = ref('secret')
</script>

<template>
  <el-input v-model="name" :prefix-icon="User" clearable placeholder="Username" style="width: 240px" />
  <el-input :suffix-icon="Search" placeholder="Search" style="width: 240px" />
  <el-input v-model="password" type="password" show-password style="width: 240px" />
  <el-input placeholder="Domain" style="width: 320px">
    <template #prepend>https://</template>
    <template #append>.com</template>
  </el-input>
</template>
