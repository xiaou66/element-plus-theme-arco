<script setup lang="ts">
import { ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const a = ref(3)
const b = ref(3)
const c = ref(3)
const d = ref(3)
const sizes = ['small', 'default', 'large'] as const
const arcoSize = { small: 'small', default: 'medium', large: 'large' } as const

const btn = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-input__wrapper|.el-input-number__decrease|.el-input-number__increase'
    : '.arco-input-wrapper|.arco-input-prepend .arco-input-number-step-button|.arco-input-append .arco-input-number-step-button'
const wrapper = (side: 'ep' | 'arco') => (side === 'ep' ? '.el-input__wrapper' : '.arco-input-wrapper')
const embed = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-input__wrapper|.el-input-number__increase|.el-input-number__decrease'
    : '.arco-input-wrapper|.arco-input-number-step-button:first-child|.arco-input-number-step-button:last-child'
</script>

<template>
  <CompareCase id="input-number-button" title="两侧按钮" note="EP 默认 ↔ Arco mode=&quot;button&quot;；EP 默认文字居中，Arco 靠左，用例传 align=&quot;left&quot;">
    <template #ep>
      <span v-for="s in sizes" :key="s" :data-pair="s" data-skip="focus" data-pos data-width :data-target="btn('ep')">
        <el-input-number v-model="a" :size="s" align="left" style="width: 160px" />
      </span>
      <span data-pair="disabled" data-skip="focus" data-pos data-width :data-target="btn('ep')">
        <el-input-number :model-value="3" disabled align="left" style="width: 160px" />
      </span>
    </template>
    <template #arco>
      <span v-for="s in sizes" :key="s" :data-pair="s" :data-target="btn('arco')">
        <a-input-number v-model="b" mode="button" :size="arcoSize[s]" style="width: 160px" />
      </span>
      <span data-pair="disabled" :data-target="btn('arco')">
        <a-input-number :model-value="3" mode="button" disabled style="width: 160px" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="input-number-focus" title="聚焦" note="按钮只测 default / hover：EP 的按钮是不可聚焦的 span，Arco 是 button；这里单独测输入区的聚焦态">
    <template #ep>
      <span data-pair="button" data-width :data-target="wrapper('ep')"><el-input-number :model-value="3" align="left" style="width: 160px" /></span>
      <span data-pair="embed" data-width :data-target="wrapper('ep')">
        <el-input-number :model-value="3" controls-position="right" align="left" style="width: 160px" />
      </span>
    </template>
    <template #arco>
      <span data-pair="button" :data-target="wrapper('arco')"><a-input-number :model-value="3" mode="button" style="width: 160px" /></span>
      <span data-pair="embed" :data-target="wrapper('arco')"><a-input-number :model-value="3" style="width: 160px" /></span>
    </template>
  </CompareCase>

  <CompareCase id="input-number-embed" title="右侧按钮" note="EP controls-position=&quot;right&quot; ↔ Arco 默认（embed，hover / 聚焦时才出现按钮）">
    <template #ep>
      <span v-for="s in sizes" :key="s" :data-pair="s" data-skip="focus" data-pos data-width :data-target="embed('ep')">
        <el-input-number v-model="c" :size="s" controls-position="right" align="left" style="width: 160px" />
      </span>
    </template>
    <template #arco>
      <span v-for="s in sizes" :key="s" :data-pair="s" :data-target="embed('arco')">
        <a-input-number v-model="d" :size="arcoSize[s]" style="width: 160px" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="input-number-no-controls" title="无按钮" note="EP :controls=&quot;false&quot; ↔ Arco hide-button：输入区占满整宽">
    <template #ep>
      <span data-pair="no-controls" data-width data-target=".el-input__wrapper"><el-input-number :model-value="3" :controls="false" align="left" style="width: 160px" /></span>
      <span data-pair="no-controls-small" data-width data-target=".el-input__wrapper"><el-input-number :model-value="3" :controls="false" size="small" align="left" style="width: 160px" /></span>
    </template>
    <template #arco>
      <span data-pair="no-controls" data-target=".arco-input-wrapper"><a-input-number :model-value="3" hide-button style="width: 160px" /></span>
      <span data-pair="no-controls-small" data-target=".arco-input-wrapper"><a-input-number :model-value="3" hide-button size="small" style="width: 160px" /></span>
    </template>
  </CompareCase>
</template>
