<script setup lang="ts">
import { Location, Setting } from '@element-plus/icons-vue'
import { IconLocation, IconSettings } from '@arco-design/web-vue/es/icon'
import CompareCase from '../components/CompareCase.vue'

const vparts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-menu|.el-menu > .el-menu-item:nth-child(1)|.el-menu > .el-menu-item:nth-child(2)|.el-sub-menu__title|.el-sub-menu .el-menu-item|.el-menu-item.is-disabled'
    : '.arco-menu|.arco-menu-inner > .arco-menu-item:nth-child(1)|.arco-menu-inner > .arco-menu-item:nth-child(2)|.arco-menu-inline-header|.arco-menu-inline-content .arco-menu-item|.arco-menu-item.arco-menu-disabled'
const hparts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-menu|.el-menu-item:nth-child(1)|.el-menu-item:nth-child(2)|.el-menu-item.is-disabled'
    : '.arco-menu|.arco-menu-overflow-wrap > .arco-menu-item:nth-child(2)|.arco-menu-overflow-wrap > .arco-menu-item:nth-child(3)|.arco-menu-item.arco-menu-disabled'
</script>

<template>
  <CompareCase id="menu-vertical" title="纵向" note="EP 纵向 ↔ Arco mode=&quot;vertical&quot;（子菜单 inline 展开）">
    <template #ep>
      <span data-pair="vertical" class="menu-box" data-pos data-width :data-target="vparts('ep')">
        <el-menu default-active="1" :default-openeds="['sub']">
          <el-menu-item index="1"><el-icon><Location /></el-icon><span>导航一</span></el-menu-item>
          <el-menu-item index="2"><el-icon><Setting /></el-icon><span>导航二</span></el-menu-item>
          <el-sub-menu index="sub">
            <template #title><el-icon><Location /></el-icon><span>子菜单</span></template>
            <el-menu-item index="3">选项三</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="4" disabled><el-icon><Setting /></el-icon><span>禁用</span></el-menu-item>
        </el-menu>
      </span>
    </template>
    <template #arco>
      <span data-pair="vertical" class="menu-box" :data-target="vparts('arco')">
        <a-menu :default-selected-keys="['1']" :default-open-keys="['sub']">
          <a-menu-item key="1"><template #icon><IconLocation /></template>导航一</a-menu-item>
          <a-menu-item key="2"><template #icon><IconSettings /></template>导航二</a-menu-item>
          <a-sub-menu key="sub">
            <template #icon><IconLocation /></template>
            <template #title>子菜单</template>
            <a-menu-item key="3">选项三</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="4" disabled><template #icon><IconSettings /></template>禁用</a-menu-item>
        </a-menu>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="menu-horizontal" title="横向" note="EP mode=&quot;horizontal&quot; ↔ Arco mode=&quot;horizontal&quot;；EP 菜单项可键盘聚焦（显示 hover 样式），Arco 不可聚焦，不比较 focus">
    <template #ep>
      <span data-pair="horizontal" class="desc-box" data-skip="focus" data-pos data-width :data-target="hparts('ep')">
        <el-menu mode="horizontal" default-active="1" :ellipsis="false">
          <el-menu-item index="1">导航一</el-menu-item>
          <el-menu-item index="2">导航二</el-menu-item>
          <el-menu-item index="3" disabled>禁用</el-menu-item>
        </el-menu>
      </span>
    </template>
    <template #arco>
      <span data-pair="horizontal" class="desc-box" :data-target="hparts('arco')">
        <a-menu mode="horizontal" :default-selected-keys="['1']">
          <a-menu-item key="1">导航一</a-menu-item>
          <a-menu-item key="2">导航二</a-menu-item>
          <a-menu-item key="3" disabled>禁用</a-menu-item>
        </a-menu>
      </span>
    </template>
  </CompareCase>
</template>
