<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const steps = [
  { title: '已完成', description: '这是描述' },
  { title: '进行中', description: '这是描述' },
  { title: '待进行', description: '这是描述' },
]
// 第一步（已完成）不比较：EP 的 finish 状态显示数字，Arco 显示对勾图标
const parts = (side: 'ep' | 'arco') =>
  [2, 3]
    .map((n) =>
      side === 'ep'
        ? `.el-step:nth-child(${n}) .el-step__icon`
        : `.arco-steps-item:nth-child(${n}) .arco-steps-icon`,
    )
    .join('|')
</script>

<template>
  <CompareCase id="steps-center" title="居中（图标在上）" note="EP align-center ↔ Arco label-placement=&quot;vertical&quot;；两边的排布宽度算法不同，只比较进行中、待进行的图标，标题和描述看截图；EP 已完成显示数字、Arco 显示对勾（JS 渲染）">
    <template #ep>
      <span data-pair="center" class="desc-box" :data-target="parts('ep')">
        <el-steps :active="1" align-center>
          <el-step v-for="s in steps" :key="s.title" v-bind="s" />
        </el-steps>
      </span>
    </template>
    <template #arco>
      <span data-pair="center" class="desc-box" :data-target="parts('arco')">
        <a-steps :current="2" label-placement="vertical">
          <a-step v-for="s in steps" :key="s.title" v-bind="s" />
        </a-steps>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="steps-props" title="默认 / 错误 / simple / 纵向（Arco 无对应项）" note="EP 默认（图标在上、靠左）、simple、direction=&quot;vertical&quot; 沿用 EP 布局，按 Arco token 着色">
    <template #ep>
      <span class="desc-box">
        <el-steps :active="1">
          <el-step v-for="s in steps" :key="s.title" v-bind="s" />
        </el-steps>
      </span>
      <span class="desc-box">
        <el-steps :active="1" process-status="error">
          <el-step v-for="s in steps" :key="s.title" v-bind="s" />
        </el-steps>
      </span>
      <span class="desc-box">
        <el-steps :active="1" simple>
          <el-step v-for="s in steps" :key="s.title" :title="s.title" />
        </el-steps>
      </span>
      <span class="desc-box" style="height: 220px">
        <el-steps :active="1" direction="vertical">
          <el-step v-for="s in steps" :key="s.title" v-bind="s" />
        </el-steps>
      </span>
    </template>
    <template #arco>
      <span class="desc-box">
        <a-steps :current="2">
          <a-step v-for="s in steps" :key="s.title" v-bind="s" />
        </a-steps>
      </span>
      <span class="desc-box">
        <a-steps :current="2" status="error">
          <a-step v-for="s in steps" :key="s.title" v-bind="s" />
        </a-steps>
      </span>
    </template>
  </CompareCase>
</template>
