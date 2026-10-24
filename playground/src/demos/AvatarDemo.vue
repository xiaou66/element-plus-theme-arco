<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import { IconUser } from '@arco-design/web-vue/es/icon'
import CompareCase from '../components/CompareCase.vue'

const sizes = [
  { ep: 'small', px: 24 },
  { ep: 'default', px: 40 },
  { ep: 'large', px: 56 },
] as const
</script>

<template>
  <CompareCase id="avatar-basic" title="文字 / 尺寸 / 形状" note="EP size ↔ Arco :size 相同数值；square 圆角 4px">
    <template #ep>
      <span v-for="s in sizes" :key="s.ep" :data-pair="s.ep" data-width><el-avatar :size="s.ep">A</el-avatar></span>
      <span data-pair="square" data-width><el-avatar shape="square">A</el-avatar></span>
      <span data-pair="icon" data-width data-target=".el-avatar|.el-avatar svg"><el-avatar :icon="UserFilled" /></span>
    </template>
    <template #arco>
      <span v-for="s in sizes" :key="s.ep" :data-pair="s.ep"><a-avatar :size="s.px">A</a-avatar></span>
      <span data-pair="square"><a-avatar shape="square">A</a-avatar></span>
      <span data-pair="icon" data-target=".arco-avatar|.arco-avatar svg"><a-avatar><IconUser /></a-avatar></span>
    </template>
  </CompareCase>

  <CompareCase id="avatar-group" title="头像组" note="2px bg-2 描边，叠放 10px">
    <template #ep>
      <span data-pair="group" data-width data-pos data-target=".el-avatar:nth-child(1)|.el-avatar:nth-child(2)|.el-avatar:nth-child(3)">
        <el-avatar-group>
          <el-avatar>A</el-avatar>
          <el-avatar>B</el-avatar>
          <el-avatar>C</el-avatar>
        </el-avatar-group>
      </span>
    </template>
    <template #arco>
      <span data-pair="group" data-target=".arco-avatar:nth-child(1)|.arco-avatar:nth-child(2)|.arco-avatar:nth-child(3)">
        <a-avatar-group>
          <a-avatar>A</a-avatar>
          <a-avatar>B</a-avatar>
          <a-avatar>C</a-avatar>
        </a-avatar-group>
      </span>
    </template>
  </CompareCase>
</template>
