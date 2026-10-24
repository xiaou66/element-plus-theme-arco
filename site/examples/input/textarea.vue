<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
const title = ref('Hello')
</script>

<template>
  <el-input v-model="text" type="textarea" :rows="3" placeholder="Write a note" style="width: 320px" />
  <el-input v-model="title" maxlength="20" show-word-limit placeholder="Title" style="width: 240px" />
</template>
