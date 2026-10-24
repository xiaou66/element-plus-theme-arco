<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import CompareCase from '../components/CompareCase.vue'

const data = [
  {
    label: '一级 1',
    key: '1',
    children: [
      { label: '二级 1-1', key: '1-1' },
      { label: '二级 1-2（禁用）', key: '1-2', disabled: true },
    ],
  },
  { label: '一级 2', key: '2', children: [{ label: '二级 2-1', key: '2-1' }] },
]
const arcoData = data.map((d) => ({ title: d.label, key: d.key, children: d.children?.map((c) => ({ title: c.label, key: c.key, disabled: c.disabled })) }))
const cascaderOptions = [
  { value: 'zj', label: '浙江', children: [{ value: 'hz', label: '杭州' }, { value: 'nb', label: '宁波' }] },
  { value: 'js', label: '江苏', children: [{ value: 'nj', label: '南京' }] },
  { value: 'gd', label: '广东（禁用）', disabled: true },
]
const cascader = ref()
onMounted(() => cascader.value?.togglePopperVisible(true))

// 展开图标比较未展开的节点：EP 展开时旋转整个图标元素（包围盒宽高对调），Arco 只旋转里面的 svg
const treeParts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-tree-node__content:nth-child(1)|.el-tree > .el-tree-node:nth-child(1) > .el-tree-node__content .el-tree-node__label|.el-tree-node__children .el-tree-node:nth-child(1) .el-tree-node__label|.el-tree > .el-tree-node:nth-child(2) > .el-tree-node__content .el-tree-node__expand-icon'
    : '.arco-tree-node:nth-child(1)|.arco-tree-node:nth-child(1) .arco-tree-node-title|.arco-tree-node:nth-child(2) .arco-tree-node-title|.arco-tree-node:nth-child(4) .arco-tree-node-switcher-icon'
// 两侧都不带值：Arco 打开时不会按值展开路径，只显示第一列
const checkParts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-tree > .el-tree-node:nth-child(1) > .el-tree-node__content .el-checkbox|.el-tree-node__children .el-tree-node:nth-child(1) .el-tree-node__label|.el-tree-node__children .el-tree-node:nth-child(2) .el-tree-node__label'
    : '.arco-tree-node:nth-child(1) .arco-checkbox|.arco-tree-node:nth-child(2) .arco-tree-node-title|.arco-tree-node:nth-child(3) .arco-tree-node-title'
const panel = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-cascader__dropdown|.el-cascader-menu:nth-child(1)|.el-cascader-menu:nth-child(1) .el-cascader-node:nth-child(1)|.el-cascader-menu:nth-child(1) .el-cascader-node:nth-child(2)|.el-cascader-menu:nth-child(1) .el-cascader-node.is-disabled'
    : '.arco-cascader-panel|.arco-cascader-panel-column:nth-child(1)|.arco-cascader-panel-column:nth-child(1) .arco-cascader-option:nth-child(1)|.arco-cascader-panel-column:nth-child(1) .arco-cascader-option:nth-child(2)|.arco-cascader-panel-column:nth-child(1) .arco-cascader-option-disabled'
</script>

<template>
  <CompareCase id="tree-basic" title="Tree" note="只有标题有 hover 底色；EP 的缩进是 indent 属性（默认 18px，行内样式），用例传 22 与 Arco 一致；EP 不带复选框时禁用节点没有样式（也没有可识别的类），保持原样">
    <template #ep>
      <span data-pair="tree" class="menu-box" data-skip="focus" data-pos data-width :data-target="treeParts('ep')">
        <el-tree :data="data" node-key="key" :default-expanded-keys="['1']" :indent="22" />
      </span>
      <span data-pair="checkable" class="menu-box" data-skip="focus" data-pos data-width :data-target="checkParts('ep')">
        <el-tree :data="data" node-key="key" show-checkbox :default-expanded-keys="['1']" :indent="22" />
      </span>
    </template>
    <template #arco>
      <span data-pair="tree" class="menu-box" :data-target="treeParts('arco')">
        <a-tree :data="arcoData" :default-expanded-keys="['1']" />
      </span>
      <span data-pair="checkable" class="menu-box" :data-target="checkParts('arco')">
        <a-tree :data="arcoData" checkable :default-expanded-keys="['1']" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="cascader-panel" title="Cascader 面板" note="无箭头、距输入框 4px；展开路径 fill-2 底、text-1、不加粗（两侧都不带值，只显示第一列）；Arco 打开时输入框是聚焦态，EP 用 ref 打开没有聚焦，实际点击打开时两边一致">
    <template #ep>
      <span data-pair="panel" class="sel-box pop-box" data-skip="focus" data-pos data-width :data-target="panel('ep')">
        <el-cascader ref="cascader" :options="cascaderOptions" :teleported="false" />
      </span>
    </template>
    <template #arco>
      <span id="pop-cascader" data-pair="panel" class="sel-box pop-box" :data-target="panel('arco')">
        <a-cascader :options="cascaderOptions" popup-visible popup-container="#pop-cascader" :trigger-props="{ autoFitPosition: false }" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="cascader-selected" title="Cascader 选中项" note="只看截图：选中路径 fill-2 底，选中的叶子没有 EP 的勾（Arco 没有）。Arco 打开时不按值展开路径，右侧不放">
    <template #ep>
      <el-cascader-panel :model-value="['zj', 'hz']" :options="cascaderOptions" />
    </template>
    <template #arco>
      <span />
    </template>
  </CompareCase>

  <CompareCase id="upload-drag" title="Upload 拖拽区 / 图片卡片" note="拖拽区图标形状不同（EP 是上传云，Arco 是加号），缩到 Arco 的尺寸">
    <template #ep>
      <div class="stack">
        <span data-pair="drag" data-pos data-width data-target=".el-upload-dragger|.el-upload__text">
          <el-upload drag action="#" :auto-upload="false"><el-icon class="el-icon--upload"><svg viewBox="0 0 1024 1024"><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z" /></svg></el-icon><div class="el-upload__text">点击或拖拽文件到此处上传</div></el-upload>
        </span>
        <span data-pair="card" data-width data-target=".el-upload--picture-card">
          <el-upload list-type="picture-card" action="#" :auto-upload="false"><el-icon><Plus /></el-icon></el-upload>
        </span>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <span data-pair="drag" data-target=".arco-upload-drag|.arco-upload-drag-text">
          <a-upload draggable action="#" :auto-upload="false" />
        </span>
        <span data-pair="card" data-target=".arco-upload-picture-card">
          <a-upload list-type="picture-card" action="#" :auto-upload="false" />
        </span>
      </div>
    </template>
  </CompareCase>

</template>
