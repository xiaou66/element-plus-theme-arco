<script setup lang="ts">
import { ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const value = ref('a')
const valueArco = ref('a')
const btn = ref('b')
const btnArco = ref('b')
const sizes = ['small', 'default', 'large'] as const
const arcoSize = { small: 'small', default: 'medium', large: 'large' } as const

// 每一项测圆圈、文字和整体，带位置
const parts = (n: number, side: 'ep' | 'arco') =>
  side === 'ep'
    ? `.el-radio:nth-child(${n})|.el-radio:nth-child(${n}) .el-radio__inner|.el-radio:nth-child(${n}) .el-radio__label`
    : `.arco-radio:nth-child(${n})|.arco-radio:nth-child(${n}) .arco-radio-icon|.arco-radio:nth-child(${n}) .arco-radio-label`
const btnParts = (n: number, side: 'ep' | 'arco') =>
  Array.from({ length: n }, (_, i) =>
    side === 'ep' ? `.el-radio-button:nth-child(${i + 1}) .el-radio-button__inner` : `.arco-radio-button:nth-child(${i + 1})`,
  ).join('|')
</script>

<template>
  <CompareCase id="radio-basic" title="基础 / 选中 / 禁用" note="label 不随选中变色；hover 出现 24px 灰色圆底">
    <template #ep>
      <span data-pair="group" data-pos data-width :data-target="[1, 2].map((n) => parts(n, 'ep')).join('|')">
        <el-radio-group v-model="value">
          <el-radio value="a">选项 A</el-radio>
          <el-radio value="b">选项 B</el-radio>
        </el-radio-group>
      </span>
      <span data-pair="disabled" data-pos data-width :data-target="[1, 2].map((n) => parts(n, 'ep')).join('|')">
        <el-radio-group model-value="a" disabled>
          <el-radio value="a">选中禁用</el-radio>
          <el-radio value="b">禁用</el-radio>
        </el-radio-group>
      </span>
    </template>
    <template #arco>
      <span data-pair="group" :data-target="[1, 2].map((n) => parts(n, 'arco')).join('|')">
        <a-radio-group v-model="valueArco">
          <a-radio value="a">选项 A</a-radio>
          <a-radio value="b">选项 B</a-radio>
        </a-radio-group>
      </span>
      <span data-pair="disabled" :data-target="[1, 2].map((n) => parts(n, 'arco')).join('|')">
        <a-radio-group default-value="a" disabled>
          <a-radio value="a">选中禁用</a-radio>
          <a-radio value="b">禁用</a-radio>
        </a-radio-group>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="radio-button" title="按钮组" note="el-radio-button ↔ Arco type=&quot;button&quot;">
    <template #ep>
      <span v-for="s in sizes" :key="s" :data-pair="s" data-pos data-width :data-target="btnParts(3, 'ep')">
        <el-radio-group v-model="btn" :size="s">
          <el-radio-button value="a">北京</el-radio-button>
          <el-radio-button value="b">上海</el-radio-button>
          <el-radio-button value="c">广州</el-radio-button>
        </el-radio-group>
      </span>
      <span data-pair="disabled" data-pos data-width :data-target="btnParts(3, 'ep')">
        <el-radio-group model-value="b" disabled>
          <el-radio-button value="a">北京</el-radio-button>
          <el-radio-button value="b">上海</el-radio-button>
          <el-radio-button value="c">广州</el-radio-button>
        </el-radio-group>
      </span>
    </template>
    <template #arco>
      <span v-for="s in sizes" :key="s" :data-pair="s" :data-target="btnParts(3, 'arco')">
        <a-radio-group v-model="btnArco" type="button" :size="arcoSize[s]">
          <a-radio value="a">北京</a-radio>
          <a-radio value="b">上海</a-radio>
          <a-radio value="c">广州</a-radio>
        </a-radio-group>
      </span>
      <span data-pair="disabled" :data-target="btnParts(3, 'arco')">
        <a-radio-group default-value="b" type="button" disabled>
          <a-radio value="a">北京</a-radio>
          <a-radio value="b">上海</a-radio>
          <a-radio value="c">广州</a-radio>
        </a-radio-group>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="radio-sizes" title="尺寸（Arco 无对应项）" note="large / small 按 EP 原样：固定高度 36 / 28px，small 的圆圈和文字是 12px">
    <template #ep>
      <el-radio :model-value="true" :value="true" size="large">large</el-radio>
      <el-radio :model-value="true" :value="true">default</el-radio>
      <el-radio :model-value="true" :value="true" size="small">small</el-radio>
      <el-radio :model-value="true" :value="true" border>border</el-radio>
    </template>
    <template #arco>
      <a-radio :model-value="true">Arco</a-radio>
    </template>
  </CompareCase>
</template>
