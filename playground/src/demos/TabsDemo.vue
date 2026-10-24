<script setup lang="ts">
import { ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const tabs = ['选项一', '选项二', '选项三']
const active = ref('选项一')
const activeArco = ref('选项一')
const active2 = ref('选项一')
const activeArco2 = ref('选项一')

const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-tabs__item:nth-child(2)|.el-tabs__item:nth-child(3)|.el-tabs__item.is-disabled|.el-tabs__active-bar'
    : '.arco-tabs-tab:nth-child(1)|.arco-tabs-tab:nth-child(2)|.arco-tabs-tab-disabled|.arco-tabs-nav-ink'
const cardParts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-tabs__item:nth-child(1)|.el-tabs__item:nth-child(2)|.el-tabs__content'
    : '.arco-tabs-tab:nth-child(1)|.arco-tabs-tab:nth-child(2)|.arco-tabs-content'
</script>

<template>
  <CompareCase id="tabs-line" title="line（默认）" note="hover 时文字后面出现 fill-2 胶囊底；选中项主色 / 500">
    <template #ep>
      <span data-pair="line" class="desc-box" data-pos data-width :data-target="parts('ep')">
        <el-tabs v-model="active">
          <el-tab-pane v-for="t in tabs" :key="t" :label="t" :name="t">{{ t }} 的内容</el-tab-pane>
          <el-tab-pane label="禁用" name="disabled" disabled />
        </el-tabs>
      </span>
    </template>
    <template #arco>
      <span data-pair="line" class="desc-box" :data-target="parts('arco')">
        <a-tabs v-model:active-key="activeArco" :animation="false">
          <a-tab-pane v-for="t in tabs" :key="t" :title="t">{{ t }} 的内容</a-tab-pane>
          <a-tab-pane key="disabled" title="禁用" disabled />
        </a-tabs>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="tabs-card" title="card" note="EP type=&quot;card&quot; ↔ Arco type=&quot;card&quot;">
    <template #ep>
      <span data-pair="card" class="desc-box" data-pos data-width :data-target="cardParts('ep')">
        <el-tabs v-model="active2" type="card">
          <el-tab-pane v-for="t in tabs" :key="t" :label="t" :name="t">{{ t }} 的内容</el-tab-pane>
        </el-tabs>
      </span>
    </template>
    <template #arco>
      <span data-pair="card" class="desc-box" :data-target="cardParts('arco')">
        <a-tabs v-model:active-key="activeArco2" type="card" :animation="false">
          <a-tab-pane v-for="t in tabs" :key="t" :title="t">{{ t }} 的内容</a-tab-pane>
        </a-tabs>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="tabs-props" title="border-card / closable / 位置（Arco 无对应项）" note="border-card 保留 EP 的结构、按 Arco token 着色；tab-position=&quot;left&quot; 沿用 EP 布局">
    <template #ep>
      <span class="desc-box">
        <el-tabs type="border-card" model-value="a">
          <el-tab-pane label="选项一" name="a">border-card 内容</el-tab-pane>
          <el-tab-pane label="选项二" name="b" />
        </el-tabs>
      </span>
      <span class="desc-box">
        <el-tabs type="card" closable model-value="a">
          <el-tab-pane label="可关闭一" name="a" />
          <el-tab-pane label="可关闭二" name="b" />
        </el-tabs>
      </span>
      <span class="desc-box">
        <el-tabs tab-position="left" model-value="a" style="height: 120px">
          <el-tab-pane label="左侧一" name="a">左侧标签</el-tab-pane>
          <el-tab-pane label="左侧二" name="b" />
        </el-tabs>
      </span>
    </template>
    <template #arco>
      <span class="desc-box">
        <a-tabs type="card-gutter" editable :animation="false">
          <a-tab-pane key="a" title="可关闭一" closable />
          <a-tab-pane key="b" title="可关闭二" closable />
        </a-tabs>
      </span>
    </template>
  </CompareCase>
</template>
