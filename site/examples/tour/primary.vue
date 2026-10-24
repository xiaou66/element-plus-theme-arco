<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from 'element-plus'
const target = ref<ButtonInstance>()
const open = ref(false)
// The target button only exists after mount, so enable the tour then.
const ready = ref(false)
onMounted(() => { ready.value = true })
</script>

<template>
  <el-button ref="target" type="primary" :disabled="!ready" @click="open = true">Start primary tour</el-button>
  <el-tour v-model="open" type="primary">
    <el-tour-step :target="() => target?.$el" title="Primary tour" description="A primary-colored card." />
  </el-tour>
</template>
