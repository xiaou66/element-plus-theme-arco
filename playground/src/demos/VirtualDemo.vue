<script setup lang="ts">
import { onMounted, ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import CompareCase from '../components/CompareCase.vue'

const options = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州', disabled: true },
]
const value = ref('beijing')
const arcoValue = ref('beijing')
const opened = ref()
onMounted(() => opened.value?.toggleMenu())

const rows = [
  { id: 1, name: '张三', age: 32, city: '杭州' },
  { id: 2, name: '李四', age: 28, city: '上海' },
  { id: 3, name: '王五', age: 41, city: '北京' },
]
const v2Columns = [
  { key: 'name', dataKey: 'name', title: '姓名', width: 160 },
  { key: 'age', dataKey: 'age', title: '年龄', width: 120 },
  { key: 'city', dataKey: 'city', title: '城市', width: 160 },
]
const arcoColumns = [
  { title: '姓名', dataIndex: 'name', width: 160 },
  { title: '年龄', dataIndex: 'age', width: 120 },
  { title: '城市', dataIndex: 'city', width: 160 },
]
</script>

<template>
  <CompareCase id="select-v2" title="SelectV2" note="同 Select（按需引入时也生效）；下拉同 Select 传 show-arrow=false；每项高度是 item-height 属性（默认 34），传 36 与 Arco 一致；SelectV2 打开时把键盘 hover 放在选中项上（EP 的交互），选中项不比较底色、焦点会移动键盘 hover，不比较 focus">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <span data-pair="view" data-target=".el-select__wrapper|.el-select__caret">
          <el-select-v2 v-model="value" :options="options" style="width: 200px" />
        </span>
        <span class="sel-box pop-box" style="height: 180px" data-pair="panel" data-skip="focus" data-pos data-width :data-target="'.el-select-dropdown__item:nth-child(2)|.el-select-dropdown__item.is-disabled'">
          <el-select-v2 ref="opened" v-model="value" :options="options" :teleported="false" :show-arrow="false" :item-height="36" style="width: 200px" />
        </span>
      </el-config-provider>
    </template>
    <template #arco>
      <span data-pair="view" data-target=".arco-select-view|svg.arco-select-view-arrow-icon">
        <a-select v-model="arcoValue" :options="options" style="width: 200px" />
      </span>
      <span id="pop-sv2" class="sel-box pop-box" style="height: 180px" data-pair="panel" :data-target="'.arco-select-option:nth-child(2)|.arco-select-option-disabled'">
        <a-select v-model="arcoValue" :options="options" popup-visible popup-container="#pop-sv2" :trigger-props="{ autoFitPosition: false }" style="width: 200px" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="table-v2" title="TableV2" note="颜色同 Table；单元格左右 16px；行高 / 表头高度是属性（默认 50px），用例传 41 / 40 与 Arco 一致；宽度多 6px 给滚动条（表头和行右侧都留了滚动条宽度）">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div data-pair="v2" data-pos data-width :data-target="'.el-table-v2__header-cell:nth-child(1)|.el-table-v2__header-cell:nth-child(2)|.el-table-v2__row:nth-child(1) .el-table-v2__row-cell:nth-child(1)'">
          <el-table-v2 :columns="v2Columns" :data="rows" :width="446" :height="170" :row-height="41" :header-height="40" />
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div data-pair="v2" style="width: 440px" :data-target="'.arco-table-th:nth-child(1)|.arco-table-th:nth-child(2)|tbody .arco-table-tr:nth-child(1) .arco-table-td:nth-child(1) .arco-table-cell'">
        <a-table :columns="arcoColumns" :data="rows" :bordered="false" :pagination="false" />
      </div>
    </template>
  </CompareCase>
</template>
