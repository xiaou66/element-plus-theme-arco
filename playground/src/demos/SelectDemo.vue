<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const options = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州', disabled: true },
]
const sizes = ['small', 'default', 'large'] as const
const arcoSize = { small: 'small', default: 'medium', large: 'large' } as const

const single = ref('beijing')
const singleArco = ref('beijing')
const multi = ref(['beijing', 'shanghai'])
const multiArco = ref(['beijing', 'shanghai'])

// EP Select 没有 visible 属性，挂载后用 toggleMenu() 打开；两侧都渲染在 wrapper 内部
const opened = ref()
onMounted(() => opened.value?.toggleMenu())

const view = (side: 'ep' | 'arco') =>
  side === 'ep' ? '.el-select__wrapper|.el-select__caret' : '.arco-select-view|svg.arco-select-view-arrow-icon'
const panel = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-select__popper|.el-select-dropdown__item:nth-child(1)|.el-select-dropdown__item:nth-child(2)|.el-select-dropdown__item.is-disabled'
    : '.arco-select-dropdown|.arco-select-option:nth-child(1)|.arco-select-option:nth-child(2)|.arco-select-option-disabled'
</script>

<template>
  <CompareCase id="select-view" title="选择框 / 尺寸 / 禁用" note="和 Input 一样是填充式；占位符颜色是伪元素，看截图">
    <template #ep>
      <span v-for="s in sizes" :key="s" :data-pair="s" class="sel-box" data-pos data-width :data-target="view('ep')">
        <el-select v-model="single" :size="s" placeholder="请选择">
          <el-option v-for="o in options" :key="o.value" v-bind="o" />
        </el-select>
      </span>
      <span data-pair="placeholder" class="sel-box" data-target=".el-select__wrapper">
        <el-select placeholder="请选择"><el-option v-for="o in options" :key="o.value" v-bind="o" /></el-select>
      </span>
      <span data-pair="disabled" class="sel-box" data-target=".el-select__wrapper">
        <el-select model-value="beijing" disabled><el-option v-for="o in options" :key="o.value" v-bind="o" /></el-select>
      </span>
    </template>
    <template #arco>
      <span v-for="s in sizes" :key="s" :data-pair="s" class="sel-box" :data-target="view('arco')">
        <a-select v-model="singleArco" :size="arcoSize[s]" placeholder="请选择" :options="options" />
      </span>
      <span data-pair="placeholder" class="sel-box" data-target=".arco-select-view">
        <a-select placeholder="请选择" :options="options" />
      </span>
      <span data-pair="disabled" class="sel-box" data-target=".arco-select-view">
        <a-select model-value="beijing" disabled :options="options" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="select-multiple" title="多选" note="标签是白底 fill-3 描边（同 InputTag）">
    <template #ep>
      <span data-pair="multiple" class="sel-box wide-sel" data-pos data-width data-target=".el-select__selected-item:nth-child(1) .el-tag|.el-select__selected-item:nth-child(2) .el-tag">
        <el-select v-model="multi" multiple placeholder="请选择">
          <el-option v-for="o in options" :key="o.value" v-bind="o" />
        </el-select>
      </span>
    </template>
    <template #arco>
      <span data-pair="multiple" class="sel-box wide-sel" data-target=".arco-select-view-tag:nth-child(1)|.arco-select-view-tag:nth-child(2)">
        <a-select v-model="multiArco" multiple placeholder="请选择" :options="options" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="select-dropdown" title="下拉面板" note="EP :show-arrow=&quot;false&quot; ↔ Arco（距选择框 4px）；EP 默认保留箭头（距离 10px）；选中项 text-1 / 500（EP 原来是主色加粗）">
    <template #ep>
      <span data-pair="panel" class="sel-box pop-box" data-skip="focus" data-pos data-width :data-target="panel('ep')">
        <el-select ref="opened" model-value="beijing" :teleported="false" :show-arrow="false">
          <el-option v-for="o in options" :key="o.value" v-bind="o" />
        </el-select>
      </span>
    </template>
    <template #arco>
      <span id="pop-select" data-pair="panel" class="sel-box pop-box" :data-target="panel('arco')">
        <a-select model-value="beijing" :options="options" popup-visible popup-container="#pop-select" :trigger-props="{ autoFitPosition: false }" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="select-tag-props" title="tag-type / tag-effect（Arco 无对应项）" note="只有默认的 info + light 标签按 Arco 改成白底；其它取值沿用 Tag 的映射">
    <template #ep>
      <span class="sel-box wide-sel"><el-select :model-value="['beijing', 'shanghai']" multiple tag-type="primary"><el-option v-for="o in options" :key="o.value" v-bind="o" /></el-select></span>
      <span class="sel-box wide-sel"><el-select :model-value="['beijing', 'shanghai']" multiple tag-effect="dark"><el-option v-for="o in options" :key="o.value" v-bind="o" /></el-select></span>
      <span class="sel-box wide-sel"><el-select :model-value="['beijing', 'shanghai']" multiple tag-effect="plain"><el-option v-for="o in options" :key="o.value" v-bind="o" /></el-select></span>
    </template>
    <template #arco>
      <span class="sel-box wide-sel"><a-select :model-value="['beijing', 'shanghai']" multiple :options="options" /></span>
    </template>
  </CompareCase>
</template>
