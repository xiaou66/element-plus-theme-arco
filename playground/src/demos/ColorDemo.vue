<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import CompareCase from '../components/CompareCase.vue'

const color = ref('#165DFF')
const predefine = ['#165DFF', '#00B42A', '#FF7D00', '#F53F3F', 'rgba(22, 93, 255, 0.5)']
const sizes = ['small', 'default', 'large'] as const
const arcoSize = { small: 'small', default: 'medium', large: 'large' } as const
</script>

<template>
  <CompareCase id="color-trigger" title="ColorPicker 触发器" note="fill-2 底、无边框、2px 圆角，hover fill-3；色块 border-2 描边、无圆角、没有下拉箭头；禁用保留 EP 色块的 30% 透明度；EP 的颜色画在色块里层的元素上、Arco 画在色块本身，色块看截图">
    <template #ep>
      <span v-for="s in sizes" :key="s" :data-pair="s" data-width :data-target="'.el-color-picker__trigger'">
        <el-color-picker v-model="color" :size="s" />
      </span>
      <span data-pair="disabled" data-skip="hover" data-width :data-target="'.el-color-picker__trigger'">
        <el-color-picker v-model="color" disabled />
      </span>
    </template>
    <template #arco>
      <span v-for="s in sizes" :key="s" :data-pair="s" :data-target="'.arco-color-picker'">
        <a-color-picker v-model="color" :size="arcoSize[s]" />
      </span>
      <span data-pair="disabled" :data-target="'.arco-color-picker'">
        <a-color-picker v-model="color" disabled />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="color-panel" title="ColorPicker 面板" note="只看截图：两侧都直接渲染面板（EP ColorPickerPanel ↔ Arco hide-trigger）。EP 的色相条竖排在色板右侧（JS 按竖直方向定位），保留 EP 的布局，只换手柄、圆角、描边、预设色块">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <el-color-picker-panel v-model="color" show-alpha :predefine="predefine" />
      </el-config-provider>
    </template>
    <template #arco>
      <a-color-picker v-model="color" hide-trigger show-preset :preset-colors="predefine" />
    </template>
  </CompareCase>
</template>
