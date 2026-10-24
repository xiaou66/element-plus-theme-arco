<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const parts = (side: 'ep' | 'arco') =>
  side === 'ep' ? '.el-card|.el-card__header|.el-card__body' : '.arco-card|.arco-card-header|.arco-card-body'
</script>

<template>
  <CompareCase id="card-basic" title="标题 + 正文" note="EP shadow=&quot;never&quot; ↔ Arco 默认（无阴影）；EP 默认的 always 见下方">
    <template #ep>
      <span data-pair="basic" class="card-box" data-pos :data-target="parts('ep')">
        <el-card header="卡片标题" shadow="never">卡片正文内容，Arco 的正文颜色是 text-2。</el-card>
      </span>
      <span data-pair="no-header" class="card-box" data-pos data-target=".el-card|.el-card__body">
        <el-card shadow="never">没有标题的卡片</el-card>
      </span>
    </template>
    <template #arco>
      <span data-pair="basic" class="card-box" :data-target="parts('arco')">
        <a-card title="卡片标题">卡片正文内容，Arco 的正文颜色是 text-2。</a-card>
      </span>
      <span data-pair="no-header" class="card-box" data-target=".arco-card|.arco-card-body">
        <a-card>没有标题的卡片</a-card>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="card-hover" title="hover 阴影" note="shadow=&quot;hover&quot; ↔ Arco hoverable">
    <template #ep>
      <span data-pair="hover" class="card-box" data-skip="focus"><el-card header="卡片标题" shadow="hover">hover 时出现阴影</el-card></span>
    </template>
    <template #arco>
      <span data-pair="hover" class="card-box"><a-card title="卡片标题" hoverable>hover 时出现阴影</a-card></span>
    </template>
  </CompareCase>

  <CompareCase id="card-shadow" title="shadow 三种取值（Arco 无对应项）" note="always（EP 默认）一直有阴影、hover 悬停时出现、never 没有；要和 Arco 默认一致，用 ConfigProvider 的 card.shadow = 'never'">
    <template #ep>
      <span class="card-box"><el-card header="always" shadow="always">一直显示阴影</el-card></span>
      <span class="card-box"><el-card header="never" shadow="never">没有阴影</el-card></span>
    </template>
    <template #arco>
      <span class="card-box"><a-card title="hoverable" hoverable>Arco 只有 hover 阴影</a-card></span>
    </template>
  </CompareCase>
</template>
