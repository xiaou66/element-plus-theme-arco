<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-collapse|.el-collapse-item:nth-child(1) .el-collapse-item__header|.el-collapse-item:nth-child(1) .el-collapse-item__arrow|.el-collapse-item:nth-child(1) .el-collapse-item__content|.el-collapse-item:nth-child(2) .el-collapse-item__header|.el-collapse-item.is-disabled .el-collapse-item__header'
    : '.arco-collapse|.arco-collapse-item:nth-child(1) .arco-collapse-item-header|.arco-collapse-item:nth-child(1) .arco-collapse-item-expand-icon|.arco-collapse-item:nth-child(1) .arco-collapse-item-content|.arco-collapse-item:nth-child(2) .arco-collapse-item-header|.arco-collapse-item-header-disabled'
</script>

<template>
  <CompareCase id="collapse-right" title="箭头在右（EP 默认）" note="EP 默认 ↔ Arco expand-icon-position=&quot;right&quot;；EP 键盘聚焦时标题变主色（Arco 没有焦点样式，保留 EP 的），不比较 focus">
    <template #ep>
      <span data-pair="right" class="desc-box" data-skip="focus" data-pos data-width :data-target="parts('ep')">
        <el-collapse :model-value="['a']">
          <el-collapse-item title="面板一" name="a">面板一的内容</el-collapse-item>
          <el-collapse-item title="面板二" name="b">面板二的内容</el-collapse-item>
          <el-collapse-item title="禁用" name="c" disabled>禁用面板</el-collapse-item>
        </el-collapse>
      </span>
    </template>
    <template #arco>
      <span data-pair="right" class="desc-box" :data-target="parts('arco')">
        <a-collapse :default-active-key="['a']" expand-icon-position="right">
          <a-collapse-item header="面板一" key="a">面板一的内容</a-collapse-item>
          <a-collapse-item header="面板二" key="b">面板二的内容</a-collapse-item>
          <a-collapse-item header="禁用" key="c" disabled>禁用面板</a-collapse-item>
        </a-collapse>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="collapse-left" title="箭头在左" note="EP expand-icon-position=&quot;left&quot; ↔ Arco 默认">
    <template #ep>
      <span data-pair="left" class="desc-box" data-skip="focus" data-pos data-width :data-target="parts('ep')">
        <el-collapse :model-value="['a']" expand-icon-position="left">
          <el-collapse-item title="面板一" name="a">面板一的内容</el-collapse-item>
          <el-collapse-item title="面板二" name="b">面板二的内容</el-collapse-item>
          <el-collapse-item title="禁用" name="c" disabled>禁用面板</el-collapse-item>
        </el-collapse>
      </span>
    </template>
    <template #arco>
      <span data-pair="left" class="desc-box" :data-target="parts('arco')">
        <a-collapse :default-active-key="['a']">
          <a-collapse-item header="面板一" key="a">面板一的内容</a-collapse-item>
          <a-collapse-item header="面板二" key="b">面板二的内容</a-collapse-item>
          <a-collapse-item header="禁用" key="c" disabled>禁用面板</a-collapse-item>
        </a-collapse>
      </span>
    </template>
  </CompareCase>
</template>
