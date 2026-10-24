<script setup lang="ts">
import { ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const list = ref(['a'])
const listArco = ref(['a'])
const btn = ref(['a', 'b'])

const parts = (n: number, side: 'ep' | 'arco') =>
  side === 'ep'
    ? `.el-checkbox:nth-child(${n})|.el-checkbox:nth-child(${n}) .el-checkbox__inner|.el-checkbox:nth-child(${n}) .el-checkbox__label`
    : `.arco-checkbox:nth-child(${n})|.arco-checkbox:nth-child(${n}) .arco-checkbox-icon|.arco-checkbox:nth-child(${n}) .arco-checkbox-label`
const three = (side: 'ep' | 'arco') => [1, 2, 3].map((n) => parts(n, side)).join('|')
</script>

<template>
  <CompareCase id="checkbox-basic" title="基础 / 选中 / 半选" note="label 不随选中变色；hover 描边变深并出现 24px 灰色圆底">
    <template #ep>
      <span data-pair="group" data-pos data-width :data-target="three('ep')">
        <el-checkbox-group v-model="list">
          <el-checkbox value="a">选项 A</el-checkbox>
          <el-checkbox value="b">选项 B</el-checkbox>
          <el-checkbox indeterminate>半选</el-checkbox>
        </el-checkbox-group>
      </span>
    </template>
    <template #arco>
      <span data-pair="group" :data-target="three('arco')">
        <a-checkbox-group v-model="listArco">
          <a-checkbox value="a">选项 A</a-checkbox>
          <a-checkbox value="b">选项 B</a-checkbox>
          <a-checkbox indeterminate>半选</a-checkbox>
        </a-checkbox-group>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="checkbox-disabled" title="禁用">
    <template #ep>
      <span data-pair="disabled" data-pos data-width :data-target="three('ep')">
        <el-checkbox-group :model-value="['a']" disabled>
          <el-checkbox value="a">选中禁用</el-checkbox>
          <el-checkbox value="b">禁用</el-checkbox>
          <el-checkbox indeterminate>半选禁用</el-checkbox>
        </el-checkbox-group>
      </span>
    </template>
    <template #arco>
      <span data-pair="disabled" :data-target="three('arco')">
        <a-checkbox-group :default-value="['a']" disabled>
          <a-checkbox value="a">选中禁用</a-checkbox>
          <a-checkbox value="b">禁用</a-checkbox>
          <a-checkbox indeterminate>半选禁用</a-checkbox>
        </a-checkbox-group>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="checkbox-button" title="按钮组（Arco 无对应项）" note="el-checkbox-button 按 Arco 单选按钮组的样式做，不成对比较">
    <template #ep>
      <el-checkbox-group v-model="btn">
        <el-checkbox-button value="a">北京</el-checkbox-button>
        <el-checkbox-button value="b">上海</el-checkbox-button>
        <el-checkbox-button value="c">广州</el-checkbox-button>
        <el-checkbox-button value="d" disabled>深圳</el-checkbox-button>
      </el-checkbox-group>
    </template>
    <template #arco>
      <a-radio-group default-value="b" type="button">
        <a-radio value="a">北京</a-radio>
        <a-radio value="b">上海</a-radio>
        <a-radio value="c">广州</a-radio>
        <a-radio value="d" disabled>深圳</a-radio>
      </a-radio-group>
    </template>
  </CompareCase>

  <CompareCase id="checkbox-sizes" title="尺寸（Arco 无对应项）" note="large / small 按 EP 原样：固定高度 36 / 28px，small 的方框和文字是 12px">
    <template #ep>
      <el-checkbox :model-value="true" :value="true" size="large">large</el-checkbox>
      <el-checkbox :model-value="true" :value="true">default</el-checkbox>
      <el-checkbox :model-value="true" :value="true" size="small">small</el-checkbox>
      <el-checkbox :model-value="true" :value="true" border>border</el-checkbox>
    </template>
    <template #arco>
      <a-checkbox :model-value="true">Arco</a-checkbox>
    </template>
  </CompareCase>
</template>
