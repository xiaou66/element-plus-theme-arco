<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from 'element-plus'
const target = ref<ButtonInstance>()
const open = ref(false)
/** 防止在目标挂载前打开引导。 */
const ready = ref(false)
onMounted(() => { ready.value = true })
</script>

<template>
  <el-button ref="target" type="primary" :disabled="!ready" @click="open = true">Start primary tour</el-button>
  <el-tour v-model="open" type="primary">
    <el-tour-step :target="() => target?.$el" title="Primary tour" description="A primary-colored card." />
  </el-tour>
</template>
