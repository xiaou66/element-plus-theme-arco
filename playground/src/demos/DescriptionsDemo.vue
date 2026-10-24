<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const data = [
  { label: '姓名', value: '张三' },
  { label: '手机号', value: '123-1234-1234' },
  { label: '居住地', value: '北京' },
  { label: '地址', value: '朝阳区某街道' },
]
</script>

<template>
  <CompareCase id="descriptions-plain" title="无边框" note="EP 无边框（标签与内容在同一格）↔ Arco layout=&quot;inline-horizontal&quot;">
    <template #ep>
      <span data-pair="plain" class="desc-box" data-pos data-target=".el-descriptions__title|.el-descriptions__cell|.el-descriptions__label|.el-descriptions__content">
        <el-descriptions title="用户信息" :column="2">
          <el-descriptions-item v-for="d in data" :key="d.label" :label="d.label">{{ d.value }}</el-descriptions-item>
        </el-descriptions>
      </span>
    </template>
    <template #arco>
      <span data-pair="plain" class="desc-box" data-target=".arco-descriptions-title|.arco-descriptions-item|.arco-descriptions-item-label|.arco-descriptions-item-value">
        <a-descriptions title="用户信息" :column="2" layout="inline-horizontal" :data="data" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="descriptions-bordered" title="有边框" note="EP border ↔ Arco bordered">
    <template #ep>
      <span data-pair="bordered" class="desc-box" data-pos data-target=".el-descriptions__body|.el-descriptions__label|.el-descriptions__content">
        <el-descriptions :column="2" border>
          <el-descriptions-item v-for="d in data" :key="d.label" :label="d.label">{{ d.value }}</el-descriptions-item>
        </el-descriptions>
      </span>
    </template>
    <template #arco>
      <span data-pair="bordered" class="desc-box" data-target=".arco-descriptions-body|.arco-descriptions-item-label|.arco-descriptions-item-value">
        <a-descriptions :column="2" bordered :data="data" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="descriptions-vertical" title="direction=&quot;vertical&quot;" note="EP 纵向布局 ↔ Arco layout=&quot;vertical&quot;；标签格保留 EP 的下内边距">
    <template #ep>
      <span class="desc-box">
        <el-descriptions :column="2" direction="vertical">
          <el-descriptions-item v-for="d in data" :key="d.label" :label="d.label">{{ d.value }}</el-descriptions-item>
        </el-descriptions>
      </span>
    </template>
    <template #arco>
      <span class="desc-box"><a-descriptions :column="2" layout="vertical" :data="data" /></span>
    </template>
  </CompareCase>
</template>
