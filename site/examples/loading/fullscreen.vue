<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { ElLoading } from 'element-plus'
let instance: ReturnType<typeof ElLoading.service> | undefined
let timer: ReturnType<typeof setTimeout> | undefined
/** 全屏演示限时关闭，离开页面时同时清理遮罩与计时器。 */
function close() {
  clearTimeout(timer)
  instance?.close()
  instance = undefined
}
function open() {
  close()
  instance = ElLoading.service({ fullscreen: true, text: 'Loading...' })
  timer = setTimeout(close, 2000)
}
onBeforeUnmount(close)
</script>

<template>
  <el-button type="primary" @click="open">Show fullscreen loading</el-button>
</template>
