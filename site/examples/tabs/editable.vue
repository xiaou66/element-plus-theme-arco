<script setup lang="ts">
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'
const position = ref<'top' | 'left' | 'right'>('top')
const tabs = ref(['Overview', 'Activity', 'Settings'])
const active = ref<TabPaneName>('Overview')
// After removing the active tab, select the first remaining one.
function remove(name: TabPaneName) {
  tabs.value = tabs.value.filter((tab) => tab !== name)
  if (active.value === name) active.value = tabs.value[0] ?? ''
}
</script>

<template>
  <div style="width: 100%">
    <el-radio-group v-model="position" style="margin-bottom: 16px">
      <el-radio-button value="top">Top</el-radio-button>
      <el-radio-button value="left">Left</el-radio-button>
      <el-radio-button value="right">Right</el-radio-button>
    </el-radio-group>
    <el-tabs v-model="active" :tab-position="position" closable @tab-remove="remove" style="min-height: 120px">
      <el-tab-pane v-for="tab in tabs" :key="tab" :label="tab" :name="tab">{{ tab }} content.</el-tab-pane>
    </el-tabs>
  </div>
</template>
