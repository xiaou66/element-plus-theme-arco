<script setup lang="ts">
import { ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const tags = ref(['Vue', 'Arco'])
const tagsArco = ref(['Vue', 'Arco'])
const empty = ref<string[]>([])
const emptyArco = ref<string[]>([])

const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-input-tag|.el-tag:nth-child(1)|.el-tag:nth-child(2)|.el-input-tag__input'
    : '.arco-input-tag|.arco-input-tag-tag:nth-child(1)|.arco-input-tag-tag:nth-child(2)|.arco-input-tag-input'
</script>

<template>
  <CompareCase id="input-tag-basic" title="有标签 / 空 / 禁用" note="标签在灰底里是白底 fill-3 描边，聚焦后变 fill-2 底">
    <template #ep>
      <span data-pair="tags" class="tag-box" data-pos :data-target="parts('ep')">
        <el-input-tag v-model="tags" placeholder="请输入" />
      </span>
      <span data-pair="empty" class="tag-box" data-pos data-target=".el-input-tag|.el-input-tag__input">
        <el-input-tag v-model="empty" placeholder="请输入" />
      </span>
      <span data-pair="disabled" class="tag-box" data-pos :data-target="parts('ep')">
        <el-input-tag :model-value="['Vue', 'Arco']" disabled />
      </span>
    </template>
    <template #arco>
      <span data-pair="tags" class="tag-box" :data-target="parts('arco')">
        <a-input-tag v-model="tagsArco" placeholder="请输入" />
      </span>
      <span data-pair="empty" class="tag-box" data-target=".arco-input-tag|.arco-input-tag-input">
        <a-input-tag v-model="emptyArco" placeholder="请输入" />
      </span>
      <span data-pair="disabled" class="tag-box" :data-target="parts('arco')">
        <a-input-tag :model-value="['Vue', 'Arco']" disabled />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="input-tag-props" title="tag-type / tag-effect（Arco 无对应项）" note="只有默认的 info + light 标签按 Arco 改成白底；其它取值沿用 Tag 的映射">
    <template #ep>
      <span class="tag-box"><el-input-tag :model-value="['Vue', 'Arco']" tag-type="primary" /></span>
      <span class="tag-box"><el-input-tag :model-value="['Vue', 'Arco']" tag-effect="dark" /></span>
    </template>
    <template #arco>
      <span class="tag-box"><a-input-tag :model-value="['Vue', 'Arco']" /></span>
    </template>
  </CompareCase>
</template>
