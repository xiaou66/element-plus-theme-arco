<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

// EP type → Arco type
// Arco normal 没有默认图标，EP info 一侧也不显示图标
const types = [
  { ep: 'primary', arco: 'info' },
  { ep: 'success', arco: 'success' },
  { ep: 'warning', arco: 'warning' },
  { ep: 'error', arco: 'error' },
  { ep: 'info', arco: 'normal' },
] as const
const parts = (side: 'ep' | 'arco') =>
  side === 'ep' ? '.el-alert|.el-alert__title' : '.arco-alert|.arco-alert-content'
const iconParts = (side: 'ep' | 'arco') =>
  side === 'ep' ? '.el-alert|.el-alert__icon svg|.el-alert__title' : '.arco-alert|.arco-alert-icon svg|.arco-alert-content'
const descParts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-alert|.el-alert__icon svg|.el-alert__title|.el-alert__description'
    : '.arco-alert|.arco-alert-icon svg|.arco-alert-title|.arco-alert-content'
</script>

<template>
  <CompareCase id="alert-types" title="类型" note="EP primary ↔ Arco info；EP info ↔ Arco normal">
    <template #ep>
      <div class="stack">
        <span v-for="t in types" :key="t.ep" :data-pair="t.ep" data-pos :data-target="t.ep === 'info' ? parts('ep') : iconParts('ep')">
          <el-alert :type="t.ep" title="这是一条提示信息" :show-icon="t.ep !== 'info'" :closable="false" />
        </span>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <span v-for="t in types" :key="t.ep" :data-pair="t.ep" :data-target="t.ep === 'info' ? parts('arco') : iconParts('arco')">
          <a-alert :type="t.arco">这是一条提示信息</a-alert>
        </span>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="alert-description" title="标题 + 描述" note="EP title + description ↔ Arco title + 内容">
    <template #ep>
      <div class="stack">
        <span v-for="t in types.slice(0, 2)" :key="t.ep" :data-pair="t.ep" data-pos :data-target="descParts('ep')">
          <el-alert :type="t.ep" title="提示标题" description="这是一段补充说明的描述文字。" show-icon :closable="false" />
        </span>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <span v-for="t in types.slice(0, 2)" :key="t.ep" :data-pair="t.ep" :data-target="descParts('arco')">
          <a-alert :type="t.arco" title="提示标题">这是一段补充说明的描述文字。</a-alert>
        </span>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="alert-closable" title="可关闭 / 无图标">
    <template #ep>
      <div class="stack">
        <span data-pair="closable" data-pos data-target=".el-alert|.el-alert__close-btn svg|.el-alert__title">
          <el-alert type="primary" title="可关闭的提示" show-icon />
        </span>
        <span data-pair="closable-desc" data-pos data-target=".el-alert|.el-alert__close-btn svg">
          <el-alert type="primary" title="可关闭的提示" description="描述文字" show-icon />
        </span>
        <span data-pair="no-icon" data-pos data-target=".el-alert|.el-alert__title">
          <el-alert type="success" title="没有图标" :closable="false" />
        </span>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <span data-pair="closable" data-target=".arco-alert|.arco-alert-close-btn svg|.arco-alert-content">
          <a-alert closable>可关闭的提示</a-alert>
        </span>
        <span data-pair="closable-desc" data-target=".arco-alert|.arco-alert-close-btn svg">
          <a-alert title="可关闭的提示" closable>描述文字</a-alert>
        </span>
        <span data-pair="no-icon" data-target=".arco-alert|.arco-alert-content">
          <a-alert type="success" :show-icon="false">没有图标</a-alert>
        </span>
      </div>
    </template>
  </CompareCase>
</template>
