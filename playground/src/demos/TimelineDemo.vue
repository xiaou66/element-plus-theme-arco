<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue'
import CompareCase from '../components/CompareCase.vue'

const items = [
  { content: '创建项目', time: '2026-10-01' },
  { content: '完成设计', time: '2026-10-08' },
  { content: '发布上线', time: '2026-10-20' },
]
const parts = (side: 'ep' | 'arco') =>
  [1, 2]
    .map((n) =>
      side === 'ep'
        ? `.el-timeline-item:nth-child(${n})|.el-timeline-item:nth-child(${n}) .el-timeline-item__node|.el-timeline-item:nth-child(${n}) .el-timeline-item__tail|.el-timeline-item:nth-child(${n}) .el-timeline-item__content|.el-timeline-item:nth-child(${n}) .el-timeline-item__timestamp`
        : `.arco-timeline-item:nth-child(${n})|.arco-timeline-item:nth-child(${n}) .arco-timeline-item-dot|.arco-timeline-item:nth-child(${n}) .arco-timeline-item-dot-line|.arco-timeline-item:nth-child(${n}) .arco-timeline-item-content|.arco-timeline-item:nth-child(${n}) .arco-timeline-item-label`,
    )
    .join('|')
</script>

<template>
  <CompareCase id="timeline-basic" title="基础" note="EP 默认节点 ↔ Arco 默认（6px 主色圆点）；timestamp ↔ label">
    <template #ep>
      <span data-pair="basic" class="desc-box" data-pos data-width :data-target="parts('ep')">
        <el-timeline>
          <el-timeline-item v-for="i in items" :key="i.time" :timestamp="i.time">{{ i.content }}</el-timeline-item>
        </el-timeline>
      </span>
    </template>
    <template #arco>
      <span data-pair="basic" class="desc-box" :data-target="parts('arco')">
        <a-timeline>
          <a-timeline-item v-for="i in items" :key="i.time" :label="i.time">{{ i.content }}</a-timeline-item>
        </a-timeline>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="timeline-types" title="颜色 / 空心" note="EP type / hollow ↔ Arco dot-color / dot-type=&quot;hollow&quot;">
    <template #ep>
      <span data-pair="types" class="desc-box" data-pos :data-target="[1, 2, 3].map((n) => `.el-timeline-item:nth-child(${n}) .el-timeline-item__node`).join('|')">
        <el-timeline>
          <el-timeline-item type="success">成功</el-timeline-item>
          <el-timeline-item type="danger">失败</el-timeline-item>
          <el-timeline-item type="primary" hollow>空心</el-timeline-item>
        </el-timeline>
      </span>
    </template>
    <template #arco>
      <span data-pair="types" class="desc-box" :data-target="[1, 2, 3].map((n) => `.arco-timeline-item:nth-child(${n}) .arco-timeline-item-dot`).join('|')">
        <a-timeline>
          <a-timeline-item dot-color="rgb(var(--success-6))">成功</a-timeline-item>
          <a-timeline-item dot-color="rgb(var(--danger-6))">失败</a-timeline-item>
          <a-timeline-item dot-type="hollow">空心</a-timeline-item>
        </a-timeline>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="timeline-props" title="size=&quot;large&quot; / icon（Arco 无对应项）" note="large 节点按 EP 档差延伸为 8px；带 icon 的节点保留 EP 的 12 / 14px，放得下图标">
    <template #ep>
      <span class="desc-box">
        <el-timeline>
          <el-timeline-item>默认</el-timeline-item>
          <el-timeline-item size="large">large</el-timeline-item>
          <el-timeline-item :icon="MoreFilled" type="primary">带图标</el-timeline-item>
          <el-timeline-item :icon="MoreFilled" type="primary" size="large">带图标 large</el-timeline-item>
        </el-timeline>
      </span>
    </template>
    <template #arco>
      <span class="desc-box">
        <a-timeline><a-timeline-item>Arco</a-timeline-item></a-timeline>
      </span>
    </template>
  </CompareCase>
</template>
