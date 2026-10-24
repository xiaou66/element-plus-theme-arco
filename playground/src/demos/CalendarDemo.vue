<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import CompareCase from '../components/CompareCase.vue'

// 固定到同一个月、选中同一天；“今天”两侧都是真实的今天，不在这个月时不显示
const epValue = ref(new Date(2026, 9, 14))
const arcoValue = ref(new Date(2026, 9, 14))
const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-calendar-table thead th:nth-child(1)|.el-calendar-table tbody tr:nth-child(2) td:nth-child(1)|.el-calendar-table td.is-selected .el-calendar-day > span|.el-calendar-table td.prev .el-calendar-day > span'
    : '.arco-calendar-week-list-item:nth-child(1)|.arco-calendar-month-row:nth-child(2) .arco-calendar-cell:nth-child(1)|.arco-calendar-cell-selected .arco-calendar-date-circle|.arco-calendar-cell:not(.arco-calendar-cell-in-view) .arco-calendar-date-circle'
</script>

<template>
  <CompareCase id="calendar-month" title="Calendar 月视图" note="表头按钮两侧不同（EP 是按钮组，Arco 是图标 + 月/年切换，标题左边有图标），表头不配对（由星期行的位置检查表头高度）；EP 按需要显示 5 或 6 行、Arco 固定 6 行（JS 决定），整体高度看截图；格子 100px、日期在 28px 圆里">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div data-pair="month" class="wide" data-pos data-width :data-target="parts('ep')">
          <el-calendar v-model="epValue" style="width: 100%" />
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div data-pair="month" class="wide" :data-target="parts('arco')">
        <a-calendar v-model="arcoValue" style="width: 100%" />
      </div>
    </template>
  </CompareCase>
</template>
