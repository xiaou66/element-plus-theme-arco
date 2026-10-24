<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? [1, 2, 3].map((n) => `.el-breadcrumb__item:nth-child(${n}) .el-breadcrumb__inner`).join('|') +
      '|.el-breadcrumb__item:nth-child(1) .el-breadcrumb__separator'
    : [1, 3, 5].map((n) => `.arco-breadcrumb > :nth-child(${n})`).join('|') + '|.arco-breadcrumb-item-separator'
</script>

<template>
  <CompareCase id="breadcrumb-basic" title="基础" note="可点击项 hover 出现灰底；最后一项 text-1 / 500；分隔符 Arco 默认是斜线图标">
    <template #ep>
      <span data-pair="text" data-width data-pos :data-target="parts('ep')">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>频道</el-breadcrumb-item>
          <el-breadcrumb-item>新闻</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
      <span data-pair="link" data-width data-pos :data-target="parts('ep')">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><a href="#breadcrumb">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="#breadcrumb">频道</a></el-breadcrumb-item>
          <el-breadcrumb-item>新闻</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
    </template>
    <template #arco>
      <span data-pair="text" :data-target="parts('arco')">
        <a-breadcrumb>
          <template #separator>/</template>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>频道</a-breadcrumb-item>
          <a-breadcrumb-item>新闻</a-breadcrumb-item>
        </a-breadcrumb>
      </span>
      <span data-pair="link" :data-target="parts('arco')">
        <a-breadcrumb>
          <template #separator>/</template>
          <a-breadcrumb-item><a href="#breadcrumb">首页</a></a-breadcrumb-item>
          <a-breadcrumb-item><a href="#breadcrumb">频道</a></a-breadcrumb-item>
          <a-breadcrumb-item>新闻</a-breadcrumb-item>
        </a-breadcrumb>
      </span>
    </template>
  </CompareCase>
</template>
