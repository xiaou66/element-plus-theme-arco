<script setup lang="ts">
import { ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const options = ['北京', '上海', '广州']
const value = ref('')
const valueArco = ref('')
const query = (q: string, cb: (items: { value: string }[]) => void) => cb(options.map((value) => ({ value })))
</script>

<template>
  <CompareCase id="autocomplete-basic" title="下拉面板" note="输入框同 Input；EP :show-arrow=&quot;false&quot; ↔ Arco 下拉（4px 距离）；EP 默认保留箭头（10px）">
    <template #ep>
      <span data-pair="input" class="ac-box ac-ep" data-width>
        <el-autocomplete v-model="value" :fetch-suggestions="query" :show-arrow="false" placeholder="请输入城市" />
      </span>
    </template>
    <template #arco>
      <span data-pair="input" class="ac-box ac-arco">
        <a-auto-complete v-model="valueArco" :data="options" placeholder="请输入城市" :filter-option="false" />
      </span>
    </template>
  </CompareCase>
</template>
