<script setup lang="ts">
import { Plus, Search, Delete } from '@element-plus/icons-vue'
import { IconPlus, IconSearch, IconDelete } from '@arco-design/web-vue/es/icon'
import CompareCase from '../components/CompareCase.vue'

const statuses = ['success', 'warning', 'danger'] as const
</script>

<template>
  <CompareCase id="button-types" title="基础类型" note="EP 默认按钮 ↔ Arco secondary；plain ↔ outline">
    <template #ep>
      <span data-pair="primary"><el-button type="primary">Primary</el-button></span>
      <span data-pair="secondary"><el-button>Secondary</el-button></span>
      <span data-pair="outline"><el-button type="primary" plain>Outline</el-button></span>
      <span data-pair="dashed"><el-button dashed>Dashed</el-button></span>
      <span data-pair="text"><el-button text>Text</el-button></span>
    </template>
    <template #arco>
      <span data-pair="primary"><a-button type="primary">Primary</a-button></span>
      <span data-pair="secondary"><a-button>Secondary</a-button></span>
      <span data-pair="outline"><a-button type="outline">Outline</a-button></span>
      <span data-pair="dashed"><a-button type="dashed">Dashed</a-button></span>
      <span data-pair="text"><a-button type="text">Text</a-button></span>
    </template>
  </CompareCase>

  <CompareCase
    v-for="s in statuses"
    :id="`button-status-${s}`"
    :key="s"
    :title="`状态：${s}`"
  >
    <template #ep>
      <span :data-pair="`${s}-primary`"><el-button :type="s">Primary</el-button></span>
      <span :data-pair="`${s}-outline`"><el-button :type="s" plain>Outline</el-button></span>
      <span :data-pair="`${s}-dashed`"><el-button :type="s" dashed>Dashed</el-button></span>
      <span :data-pair="`${s}-text`"><el-button :type="s" text>Text</el-button></span>
    </template>
    <template #arco>
      <span :data-pair="`${s}-primary`"><a-button type="primary" :status="s">Primary</a-button></span>
      <span :data-pair="`${s}-outline`"><a-button type="outline" :status="s">Outline</a-button></span>
      <span :data-pair="`${s}-dashed`"><a-button type="dashed" :status="s">Dashed</a-button></span>
      <span :data-pair="`${s}-text`"><a-button type="text" :status="s">Text</a-button></span>
    </template>
  </CompareCase>

  <CompareCase id="button-disabled" title="禁用">
    <template #ep>
      <span data-pair="primary"><el-button type="primary" disabled>Primary</el-button></span>
      <span data-pair="secondary"><el-button disabled>Secondary</el-button></span>
      <span data-pair="outline"><el-button type="primary" plain disabled>Outline</el-button></span>
      <span data-pair="dashed"><el-button dashed disabled>Dashed</el-button></span>
      <span data-pair="text"><el-button text disabled>Text</el-button></span>
    </template>
    <template #arco>
      <span data-pair="primary"><a-button type="primary" disabled>Primary</a-button></span>
      <span data-pair="secondary"><a-button disabled>Secondary</a-button></span>
      <span data-pair="outline"><a-button type="outline" disabled>Outline</a-button></span>
      <span data-pair="dashed"><a-button type="dashed" disabled>Dashed</a-button></span>
      <span data-pair="text"><a-button type="text" disabled>Text</a-button></span>
    </template>
  </CompareCase>

  <CompareCase id="button-sizes" title="尺寸" note="EP small/default/large ↔ Arco small/medium/large（28/32/36）">
    <template #ep>
      <span data-pair="small"><el-button type="primary" size="small">Small</el-button></span>
      <span data-pair="default"><el-button type="primary">Default</el-button></span>
      <span data-pair="large"><el-button type="primary" size="large">Large</el-button></span>
    </template>
    <template #arco>
      <span data-pair="small"><a-button type="primary" size="small">Small</a-button></span>
      <span data-pair="default"><a-button type="primary">Default</a-button></span>
      <span data-pair="large"><a-button type="primary" size="large">Large</a-button></span>
    </template>
  </CompareCase>

  <CompareCase id="button-shape" title="图标 / 形状 / 加载">
    <template #ep>
      <span data-pair="icon"><el-button type="primary" :icon="Plus">Create</el-button></span>
      <span data-pair="circle"><el-button type="primary" :icon="Search" circle /></span>
      <span data-pair="round"><el-button type="primary" round>Round</el-button></span>
      <span data-pair="icon-secondary"><el-button :icon="Delete">Delete</el-button></span>
      <span data-pair="loading" data-skip="focus"><el-button type="primary" loading>Loading</el-button></span>
    </template>
    <template #arco>
      <span data-pair="icon"><a-button type="primary"><template #icon><IconPlus /></template>Create</a-button></span>
      <span data-pair="circle"><a-button type="primary" shape="circle"><IconSearch /></a-button></span>
      <span data-pair="round"><a-button type="primary" shape="round">Round</a-button></span>
      <span data-pair="icon-secondary"><a-button><template #icon><IconDelete /></template>Delete</a-button></span>
      <span data-pair="loading"><a-button type="primary" loading>Loading</a-button></span>
    </template>
  </CompareCase>

  <CompareCase id="button-group" title="ButtonGroup" note="实心按钮直接相邻，右边框是分隔线（secondary-hover / primary-5 / 状态色 -5）；描边按钮重叠 1px；只有两端有圆角">
    <template #ep>
      <div class="stack">
        <span data-pair="secondary" data-pos data-width :data-target="'.el-button:nth-child(1)|.el-button:nth-child(2)|.el-button:nth-child(3)'"><el-button-group><el-button>左</el-button><el-button>中</el-button><el-button>右</el-button></el-button-group></span>
        <span data-pair="primary" data-pos data-width :data-target="'.el-button:nth-child(1)|.el-button:nth-child(2)|.el-button:nth-child(3)'"><el-button-group><el-button type="primary">左</el-button><el-button type="primary">中</el-button><el-button type="primary">右</el-button></el-button-group></span>
        <span data-pair="outline" data-pos data-width :data-target="'.el-button:nth-child(1)|.el-button:nth-child(2)|.el-button:nth-child(3)'"><el-button-group><el-button type="primary" plain>左</el-button><el-button type="primary" plain>中</el-button><el-button type="primary" plain>右</el-button></el-button-group></span>
        <span data-pair="danger" data-pos data-width :data-target="'.el-button:nth-child(1)|.el-button:nth-child(2)|.el-button:nth-child(3)'"><el-button-group><el-button type="danger">左</el-button><el-button type="danger">中</el-button><el-button type="danger">右</el-button></el-button-group></span>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <span data-pair="secondary" :data-target="'.arco-btn:nth-child(1)|.arco-btn:nth-child(2)|.arco-btn:nth-child(3)'"><a-button-group><a-button>左</a-button><a-button>中</a-button><a-button>右</a-button></a-button-group></span>
        <span data-pair="primary" :data-target="'.arco-btn:nth-child(1)|.arco-btn:nth-child(2)|.arco-btn:nth-child(3)'"><a-button-group type="primary"><a-button>左</a-button><a-button>中</a-button><a-button>右</a-button></a-button-group></span>
        <span data-pair="outline" :data-target="'.arco-btn:nth-child(1)|.arco-btn:nth-child(2)|.arco-btn:nth-child(3)'"><a-button-group type="outline"><a-button>左</a-button><a-button>中</a-button><a-button>右</a-button></a-button-group></span>
        <span data-pair="danger" :data-target="'.arco-btn:nth-child(1)|.arco-btn:nth-child(2)|.arco-btn:nth-child(3)'"><a-button-group type="primary" status="danger"><a-button>左</a-button><a-button>中</a-button><a-button>右</a-button></a-button-group></span>
      </div>
    </template>
  </CompareCase>
</template>
