<script setup lang="ts">
import { onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import CompareCase from '../components/CompareCase.vue'

// ElMessageBox 用 appendTo 挂到格子里；Arco 一侧用 simple 形态的 Modal（Modal.confirm 的渲染方式）
onMounted(() => {
  ElMessageBox.confirm('确定要删除这条记录吗？', '删除确认', {
    type: 'warning',
    center: true,
    appendTo: '#mb-ep',
    modal: false,
    lockScroll: false,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
  }).catch(() => {})
  ElMessageBox.alert('这是 EP 默认形态：图标在内容里、按钮靠右。', '提示', {
    type: 'info',
    appendTo: '#mb-ep-default',
    modal: false,
    lockScroll: false,
    confirmButtonText: '确定',
  }).catch(() => {})
})
const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-message-box|.el-message-box__title|.el-message-box__status svg|.el-message-box__container|.el-message-box__btns .el-button:nth-child(1)|.el-message-box__btns .el-button:nth-child(2)'
    : '.arco-modal|.arco-modal-title|.arco-modal-title-icon svg|.arco-modal-body|.arco-modal-footer .arco-btn:nth-child(1)|.arco-modal-footer .arco-btn:nth-child(2)'
</script>

<template>
  <CompareCase id="message-box-center" title="MessageBox（center）" note="EP center: true ↔ Arco Modal.confirm（simple）；EP 默认形态只改尺寸颜色，对齐保持 EP 的">
    <template #ep>
      <div id="mb-ep" data-pair="box" class="static-dialog" data-skip="focus" data-pos data-width :data-target="parts('ep')" />
    </template>
    <template #arco>
      <div data-pair="box" class="static-dialog" :data-target="parts('arco')">
        <a-modal :visible="true" simple message-type="warning" title="删除确认" :render-to-body="false" :mask="false" :closable="false">
          确定要删除这条记录吗？
        </a-modal>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="message-box-default" title="MessageBox 默认形态（不成对）" note="尺寸、颜色同 Arco simple，对齐保持 EP 的；要和 Arco 一致传 center: true">
    <template #ep>
      <div id="mb-ep-default" class="static-dialog" />
    </template>
    <template #arco>
      <div class="static-dialog">
        <a-modal :visible="true" simple message-type="info" title="提示" :render-to-body="false" :mask="false" hide-cancel>
          Arco simple 形态
        </a-modal>
      </div>
    </template>
  </CompareCase>
</template>
