<script setup lang="ts">
import { ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const on = ref(true)
const off = ref(false)
const onArco = ref(true)
const offArco = ref(false)
const parts = (side: 'ep' | 'arco') =>
  side === 'ep' ? '.el-switch__core|.el-switch__action' : '.arco-switch|.arco-switch-handle'
</script>

<template>
  <CompareCase id="switch-basic" title="开 / 关 / 禁用" note="EP default ↔ Arco default；large 见下方">
    <template #ep>
      <span data-pair="on" data-width data-pos :data-target="parts('ep')"><el-switch v-model="on" /></span>
      <span data-pair="off" data-width data-pos :data-target="parts('ep')"><el-switch v-model="off" /></span>
      <span data-pair="disabled-on" data-width data-pos :data-target="parts('ep')"><el-switch :model-value="true" disabled /></span>
      <span data-pair="disabled-off" data-width data-pos :data-target="parts('ep')"><el-switch :model-value="false" disabled /></span>
    </template>
    <template #arco>
      <span data-pair="on" :data-target="parts('arco')"><a-switch v-model="onArco" /></span>
      <span data-pair="off" :data-target="parts('arco')"><a-switch v-model="offArco" /></span>
      <span data-pair="disabled-on" :data-target="parts('arco')"><a-switch :model-value="true" disabled /></span>
      <span data-pair="disabled-off" :data-target="parts('arco')"><a-switch :model-value="false" disabled /></span>
    </template>
  </CompareCase>

  <CompareCase id="switch-small" title="小尺寸">
    <template #ep>
      <span data-pair="small-on" data-width data-pos :data-target="parts('ep')"><el-switch :model-value="true" size="small" /></span>
      <span data-pair="small-off" data-width data-pos :data-target="parts('ep')"><el-switch :model-value="false" size="small" /></span>
    </template>
    <template #arco>
      <span data-pair="small-on" :data-target="parts('arco')"><a-switch :model-value="true" size="small" /></span>
      <span data-pair="small-off" :data-target="parts('arco')"><a-switch :model-value="false" size="small" /></span>
    </template>
  </CompareCase>

  <CompareCase id="switch-text" title="内嵌文字" note="EP inline-prompt + active-text ↔ Arco checked-text / unchecked-text">
    <template #ep>
      <span data-pair="text-on" data-width data-pos :data-target="parts('ep')">
        <el-switch :model-value="true" inline-prompt active-text="开启" inactive-text="关闭" />
      </span>
      <span data-pair="text-off" data-width data-pos :data-target="parts('ep')">
        <el-switch :model-value="false" inline-prompt active-text="开启" inactive-text="关闭" />
      </span>
    </template>
    <template #arco>
      <span data-pair="text-on" :data-target="parts('arco')">
        <a-switch :model-value="true" checked-text="开启" unchecked-text="关闭" />
      </span>
      <span data-pair="text-off" :data-target="parts('arco')">
        <a-switch :model-value="false" checked-text="开启" unchecked-text="关闭" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="switch-large" title="size=&quot;large&quot;（Arco 无对应项）" note="按 EP 的档差在 Arco default 上延伸：28px 高、50px 宽、20px 圆钮">
    <template #ep>
      <el-switch :model-value="true" size="large" />
      <el-switch :model-value="false" size="large" />
      <el-switch :model-value="true" size="large" inline-prompt active-text="开启" inactive-text="关闭" />
    </template>
    <template #arco>
      <a-switch :model-value="true" />
    </template>
  </CompareCase>
</template>
