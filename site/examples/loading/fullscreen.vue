<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { ElLoading } from 'element-plus'
let instance: ReturnType<typeof ElLoading.service> | undefined
let timer: ReturnType<typeof setTimeout> | undefined
// Close automatically after 2 seconds; also clean up when the page is left.
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
