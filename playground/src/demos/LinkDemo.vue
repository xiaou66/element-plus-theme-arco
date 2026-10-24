<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
import { IconEdit } from '@arco-design/web-vue/es/icon'
import CompareCase from '../components/CompareCase.vue'

const statuses = ['success', 'warning', 'danger'] as const
</script>

<template>
  <CompareCase id="link-types" title="类型" note="EP type=&quot;primary&quot; ↔ Arco 默认 Link；EP 默认灰色链接 Arco 没有对应项，不成对比较">
    <template #ep>
      <span data-pair="primary" data-width><el-link type="primary">Link</el-link></span>
      <span v-for="s in statuses" :key="s" :data-pair="s" data-width><el-link :type="s">Link</el-link></span>
      <span><el-link>Default</el-link></span>
    </template>
    <template #arco>
      <span data-pair="primary"><a-link>Link</a-link></span>
      <span v-for="s in statuses" :key="s" :data-pair="s"><a-link :status="s">Link</a-link></span>
    </template>
  </CompareCase>

  <CompareCase id="link-disabled" title="禁用">
    <template #ep>
      <span data-pair="primary" data-width><el-link type="primary" disabled>Link</el-link></span>
      <span v-for="s in statuses" :key="s" :data-pair="s" data-width><el-link :type="s" disabled>Link</el-link></span>
      <span><el-link disabled>Default</el-link></span>
    </template>
    <template #arco>
      <span data-pair="primary"><a-link disabled>Link</a-link></span>
      <span v-for="s in statuses" :key="s" :data-pair="s"><a-link :status="s" disabled>Link</a-link></span>
    </template>
  </CompareCase>

  <CompareCase id="link-icon" title="图标">
    <template #ep>
      <span data-pair="icon" data-width><el-link type="primary" :icon="Edit">编辑</el-link></span>
    </template>
    <template #arco>
      <span data-pair="icon"><a-link><template #icon><IconEdit /></template>编辑</a-link></span>
    </template>
  </CompareCase>

  <CompareCase id="link-underline" title="underline（Arco 无对应项）" note="EP 默认 hover 时出下划线；要和 Arco 一致，用 ConfigProvider 的 link.underline = 'never'">
    <template #ep>
      <el-link type="primary">hover（默认）</el-link>
      <el-link type="primary" underline="always">always</el-link>
      <el-link type="primary" underline="never">never</el-link>
    </template>
    <template #arco>
      <a-link>Arco Link</a-link>
    </template>
  </CompareCase>
</template>
