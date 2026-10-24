<script setup lang="ts">
import { ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

// EP type → Arco color
const types = [
  { ep: 'primary', arco: 'arcoblue', solid: 'rgb(var(--primary-6))' },
  { ep: 'success', arco: 'green', solid: 'rgb(var(--success-6))' },
  { ep: 'warning', arco: 'orange', solid: 'rgb(var(--warning-6))' },
  { ep: 'danger', arco: 'red', solid: 'rgb(var(--danger-6))' },
] as const

const checked = ref([true, false])
const checkedArco = ref([true, false])
</script>

<template>
  <CompareCase id="tag-light" title="默认（light）" note="EP type ↔ Arco color；info ↔ Arco 默认灰色 tag">
    <template #ep>
      <span v-for="t in types" :key="t.ep" :data-pair="t.ep" data-width><el-tag :type="t.ep">Tag</el-tag></span>
      <span data-pair="info" data-width><el-tag type="info">Tag</el-tag></span>
    </template>
    <template #arco>
      <span v-for="t in types" :key="t.ep" :data-pair="t.ep"><a-tag :color="t.arco">Tag</a-tag></span>
      <span data-pair="info"><a-tag>Tag</a-tag></span>
    </template>
  </CompareCase>

  <CompareCase id="tag-plain" title="描边（plain）" note="EP effect=&quot;plain&quot; ↔ Arco bordered">
    <template #ep>
      <span v-for="t in types" :key="t.ep" :data-pair="t.ep" data-width><el-tag :type="t.ep" effect="plain">Tag</el-tag></span>
      <span data-pair="info" data-width><el-tag type="info" effect="plain">Tag</el-tag></span>
    </template>
    <template #arco>
      <span v-for="t in types" :key="t.ep" :data-pair="t.ep"><a-tag :color="t.arco" bordered>Tag</a-tag></span>
      <span data-pair="info"><a-tag bordered>Tag</a-tag></span>
    </template>
  </CompareCase>

  <CompareCase id="tag-dark" title="实心（dark）" note="EP effect=&quot;dark&quot; ↔ Arco 自定义色（6 级色）">
    <template #ep>
      <span v-for="t in types" :key="t.ep" :data-pair="t.ep" data-width><el-tag :type="t.ep" effect="dark">Tag</el-tag></span>
    </template>
    <template #arco>
      <span v-for="t in types" :key="t.ep" :data-pair="t.ep"><a-tag :color="t.solid">Tag</a-tag></span>
    </template>
  </CompareCase>

  <CompareCase id="tag-sizes" title="尺寸 / 可关闭">
    <template #ep>
      <span data-pair="small" data-width><el-tag type="info" size="small">Small</el-tag></span>
      <span data-pair="default" data-width><el-tag type="info">Default</el-tag></span>
      <span data-pair="large" data-width><el-tag type="info" size="large">Large</el-tag></span>
      <span data-pair="closable" data-width><el-tag type="info" closable>Closable</el-tag></span>
      <span data-pair="closable-primary" data-width><el-tag closable>Closable</el-tag></span>
      <span data-pair="closable-large" data-width><el-tag type="info" size="large" closable>Closable</el-tag></span>
    </template>
    <template #arco>
      <span data-pair="small"><a-tag size="small">Small</a-tag></span>
      <span data-pair="default"><a-tag>Default</a-tag></span>
      <span data-pair="large"><a-tag size="large">Large</a-tag></span>
      <span data-pair="closable"><a-tag closable>Closable</a-tag></span>
      <span data-pair="closable-primary"><a-tag color="arcoblue" closable>Closable</a-tag></span>
      <span data-pair="closable-large"><a-tag size="large" closable>Closable</a-tag></span>
    </template>
  </CompareCase>

  <CompareCase id="tag-checkable" title="可选中（CheckTag）" note="el-check-tag ↔ Arco Tag checkable">
    <template #ep>
      <span data-pair="checked" data-width><el-check-tag v-model:checked="checked[0]">Checked</el-check-tag></span>
      <span data-pair="unchecked" data-width><el-check-tag v-model:checked="checked[1]">Unchecked</el-check-tag></span>
      <span data-pair="checked-info" data-width><el-check-tag type="info" checked>Checked</el-check-tag></span>
    </template>
    <template #arco>
      <span data-pair="checked"><a-tag v-model:checked="checkedArco[0]" checkable color="arcoblue">Checked</a-tag></span>
      <span data-pair="unchecked"><a-tag v-model:checked="checkedArco[1]" checkable color="arcoblue">Unchecked</a-tag></span>
      <span data-pair="checked-info"><a-tag checkable :checked="true">Checked</a-tag></span>
    </template>
  </CompareCase>
</template>
