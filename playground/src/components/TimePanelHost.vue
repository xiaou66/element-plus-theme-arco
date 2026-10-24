<script setup lang="ts">
// 单独渲染 EP 的时间面板：ElTimePicker 在输入框失焦时会关闭并卸载面板，对比脚本测量前会先让焦点失焦，
// 所以用 EP 导出的 TimePickPanel，自己提供它需要的 pickerBase 注入。
import { provide, reactive, ref } from 'vue'
import { PICKER_BASE_INJECTION_KEY, TimePickPanel, dayjs } from 'element-plus'

const props = defineProps<{ modelValue: Date }>()
const value = ref(dayjs(props.modelValue))
provide(PICKER_BASE_INJECTION_KEY, {
  props: reactive({ modelValue: props.modelValue, isRange: false, format: 'HH:mm:ss', saveOnBlur: false, arrowControl: false }),
})
</script>

<template>
  <div class="el-picker__popper el-popper is-pure is-light" style="position: static; display: inline-block">
    <TimePickPanel visible format="HH:mm:ss" :parsed-value="value" @pick="(v: any) => (value = v)" />
  </div>
</template>
