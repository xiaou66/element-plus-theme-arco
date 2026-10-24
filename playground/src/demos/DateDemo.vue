<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import CompareCase from '../components/CompareCase.vue'

const day = new Date(2026, 9, 14)
const epDate = ref(day)
const arcoDate = ref('2026-10-14')
const epEmpty = ref()
const arcoEmpty = ref()
const epRange = ref([new Date(2026, 9, 8), new Date(2026, 9, 21)])
const arcoRange = ref(['2026-10-08', '2026-10-21'])
const sizes = ['small', 'default', 'large'] as const
const arcoSize = { small: 'small', default: 'medium', large: 'large' } as const
</script>

<template>
  <CompareCase id="date-input" title="DatePicker 输入框" note="图标挪到右侧（和 Arco 一致）；文字 text-2、占位符 text-3；Arco 的外层 div 不能直接聚焦（脚本的 focus 测不到），实际点击时两侧一致，不比较 focus">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <span v-for="s in sizes" :key="s" :data-pair="s" data-skip="focus" data-width :data-target="'.el-input__wrapper|.el-input__prefix svg'">
          <el-date-picker v-model="epDate" :size="s" style="width: 200px" />
        </span>
        <span data-pair="empty" data-skip="focus" data-width :data-target="'.el-input__wrapper'">
          <el-date-picker v-model="epEmpty" placeholder="请选择日期" style="width: 200px" />
        </span>
        <span data-pair="disabled" data-width :data-target="'.el-input__wrapper'">
          <el-date-picker v-model="epDate" disabled style="width: 200px" />
        </span>
      </el-config-provider>
    </template>
    <template #arco>
      <span v-for="s in sizes" :key="s" :data-pair="s" :data-target="'.arco-picker|.arco-picker-suffix-icon svg'">
        <a-date-picker v-model="arcoDate" :size="arcoSize[s]" style="width: 200px" />
      </span>
      <span data-pair="empty" :data-target="'.arco-picker'">
        <a-date-picker v-model="arcoEmpty" placeholder="请选择日期" style="width: 200px" />
      </span>
      <span data-pair="disabled" :data-target="'.arco-picker'">
        <a-date-picker v-model="arcoDate" disabled style="width: 200px" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="date-range-input" title="DatePicker 范围输入框" note="图标在右侧；分隔符 text-3、左右 8px">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <span data-pair="range" data-skip="focus" data-width :data-target="'.el-range-editor|.el-range-input:nth-of-type(1)|.el-range-separator|.el-range__icon'">
          <el-date-picker v-model="epRange" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" style="--el-date-editor-width: 300px" />
        </span>
      </el-config-provider>
    </template>
    <template #arco>
      <span data-pair="range" :data-target="'.arco-picker|.arco-picker-input:nth-of-type(1) input|.arco-picker-separator|.arco-picker-suffix-icon'">
        <a-range-picker v-model="arcoRange" style="width: 300px" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="date-panel" title="DatePicker 面板" note="两侧都直接渲染面板（EP DatePickerPanel ↔ Arco hide-trigger；Arco 面板在弹出层里是 267px，独立渲染时会撑满容器，用例写死 267px）；Arco 默认带“今天”底栏（EP 只有日期时间类型才有底栏），面板整体不配对；标题 EP 是“2026 年”、Arco 是“2026年”，看截图">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div data-pair="panel" data-pos data-width :data-target="'.el-date-table th:nth-child(1)|.el-date-table td.current .el-date-table-cell__text|.el-date-table tr:nth-child(3) td:nth-child(2) .el-date-table-cell__text|.el-date-table td.prev-month .el-date-table-cell__text'">
          <el-date-picker-panel v-model="epDate" />
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div data-pair="panel" :data-target="'.arco-picker-week-list-item:nth-child(1)|.arco-picker-cell-selected .arco-picker-date-value|.arco-picker-body .arco-picker-row:nth-child(2) .arco-picker-cell:nth-child(2) .arco-picker-date-value|.arco-picker-cell:not(.arco-picker-cell-in-view) .arco-picker-date-value'">
        <a-date-picker v-model="arcoDate" hide-trigger style="width: 267px" />
      </div>
    </template>
  </CompareCase>

  <CompareCase id="date-range-panel" title="DatePicker 范围面板" note="范围内 primary-light-1 底，起止日期主色圆；两侧都直接渲染面板">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div data-pair="range" data-pos :data-target="'.el-date-table td.start-date .el-date-table-cell|.el-date-table td.start-date .el-date-table-cell__text|.el-date-table td.in-range:not(.start-date):not(.end-date) .el-date-table-cell|.el-date-table td.end-date .el-date-table-cell'">
          <el-date-picker-panel v-model="epRange" type="daterange" />
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div data-pair="range" :data-target="'.arco-picker-cell-range-start .arco-picker-date|.arco-picker-cell-range-start .arco-picker-date-value|.arco-picker-cell-in-range:not(.arco-picker-cell-range-start):not(.arco-picker-cell-range-end) .arco-picker-date|.arco-picker-cell-range-end .arco-picker-date'">
        <a-range-picker v-model="arcoRange" hide-trigger style="width: 532px" />
      </div>
    </template>
  </CompareCase>

  <CompareCase id="date-month-year" title="DatePicker 月份 / 年份面板" note="只看截图：EP type=&quot;month&quot; / &quot;year&quot; ↔ Arco MonthPicker / YearPicker">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div class="stack">
          <el-date-picker-panel v-model="epDate" type="month" />
          <el-date-picker-panel v-model="epDate" type="year" />
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div class="stack">
        <a-month-picker v-model="arcoDate" hide-trigger style="width: 267px" />
        <a-year-picker v-model="arcoDate" hide-trigger style="width: 267px" />
      </div>
    </template>
  </CompareCase>

  <CompareCase id="date-time-panel" title="DatePicker 日期时间面板" note="只看截图：EP 是日期面板顶部加日期 / 时间输入框，Arco 是日期和时间列左右并排，结构不同；底部按钮按 Arco 的 mini 按钮">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <el-date-picker-panel v-model="epDate" type="datetime" />
      </el-config-provider>
    </template>
    <template #arco>
      <a-date-picker v-model="arcoDate" show-time hide-trigger style="width: 470px" />
    </template>
  </CompareCase>
</template>
