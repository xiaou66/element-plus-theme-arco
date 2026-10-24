<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import CompareCase from '../components/CompareCase.vue'

const epData = [1, 2, 3, 4].map((i) => ({ key: i, label: `选项 ${i}`, disabled: i === 2 }))
const arcoData = [1, 2, 3, 4].map((i) => ({ value: String(i), label: `选项 ${i}`, disabled: i === 2 }))
const epValue = ref([4])
const arcoValue = ref(['4'])
const epValue2 = ref([4])
const arcoValue2 = ref(['4'])

const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-transfer-panel:nth-child(1)|.el-transfer-panel:nth-child(1) .el-transfer-panel__header|.el-transfer-panel:nth-child(1) .el-transfer-panel__item:nth-child(1)|.el-transfer-panel:nth-child(1) .el-transfer-panel__item:nth-child(1) .el-checkbox__inner|.el-transfer-panel:nth-child(1) .el-transfer-panel__item.is-disabled|.el-transfer__buttons|.el-transfer__button:nth-child(2)|.el-transfer-panel:nth-child(3)'
    : '.arco-transfer-view-source|.arco-transfer-view-source .arco-transfer-view-header|.arco-transfer-view-source .arco-transfer-list-item:nth-child(1)|.arco-transfer-view-source .arco-transfer-list-item:nth-child(1) .arco-checkbox-icon|.arco-transfer-view-source .arco-transfer-list-item-disabled|.arco-transfer-operations|.arco-transfer-operations .arco-btn:nth-child(1)|.arco-transfer-view-target'
</script>

<template>
  <CompareCase id="transfer-basic" title="Transfer" note="面板 200 × 224、neutral-3 描边；表头 40px fill-1、14px / 500；项 36px，hover fill-2；计数文字 EP 是“0/3”、Arco 是“0 / 3”，不比较">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div data-pair="basic" data-pos data-width :data-target="parts('ep')">
          <el-transfer v-model="epValue" :data="epData" :titles="['源列表', '目标列表']" />
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div data-pair="basic" :data-target="parts('arco')">
        <a-transfer v-model="arcoValue" :data="arcoData" :title="['源列表', '目标列表']" />
      </div>
    </template>
  </CompareCase>

  <CompareCase id="transfer-filter" title="Transfer 搜索" note="filterable ↔ show-search；EP 的搜索图标在左、Arco 在右，只比较搜索区下面第一项的位置（即搜索区高度），搜索框看截图">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div data-pair="filter" class="wide" data-pos data-width :data-target="'.el-transfer-panel:nth-child(1) .el-transfer-panel__item:nth-child(1)'">
          <el-transfer v-model="epValue2" :data="epData" filterable :titles="['源列表', '目标列表']" />
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div data-pair="filter" class="wide" :data-target="'.arco-transfer-view-source .arco-transfer-list-item:nth-child(1)'">
        <a-transfer v-model="arcoValue2" :data="arcoData" show-search :title="['源列表', '目标列表']" />
      </div>
    </template>
  </CompareCase>
</template>
