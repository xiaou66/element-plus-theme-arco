<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ButtonInstance } from 'element-plus'
const create = ref<ButtonInstance>()
const publish = ref<ButtonInstance>()
const open = ref(false)
/** 目标按钮只在浏览器挂载后存在，准备完成后才允许开始引导。 */
const ready = ref(false)
onMounted(() => { ready.value = true })
</script>

<template>
  <el-button type="primary" :disabled="!ready" @click="open = true">Start tour</el-button>
  <el-button ref="create">Create</el-button>
  <el-button ref="publish">Publish</el-button>
  <el-tour v-model="open">
    <el-tour-step :target="() => create?.$el" title="Create a project" description="Start a new project here." />
    <el-tour-step :target="() => publish?.$el" title="Publish" description="Share the project when it is ready." />
  </el-tour>
</template>
