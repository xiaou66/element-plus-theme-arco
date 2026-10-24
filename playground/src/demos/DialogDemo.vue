<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

// 两侧都渲染在格子里：EP 默认不 append-to-body，Arco 用 :render-to-body="false"；
// fixed 的遮罩 / 容器在 playground.css 的 .static-dialog 里改成普通流
const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-dialog|.el-dialog__header|.el-dialog__title|.el-dialog__close svg|.el-dialog__body|.el-dialog__footer|.el-dialog__footer .el-button:nth-child(2)'
    : '.arco-modal|.arco-modal-header|.arco-modal-title|.arco-modal-close-btn svg|.arco-modal-body|.arco-modal-footer|.arco-modal-footer .arco-btn:nth-child(2)'
const drawerParts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-drawer|.el-drawer__header|.el-drawer__title|.el-drawer__close-btn svg|.el-drawer__body|.el-drawer__footer'
    : '.arco-drawer|.arco-drawer-header|.arco-drawer-title|.arco-drawer-close-btn svg|.arco-drawer-body|.arco-drawer-footer'
</script>

<template>
  <CompareCase id="dialog-basic" title="Dialog" note="EP 默认（标题靠左）↔ Arco title-align=&quot;start&quot;；EP center ↔ Arco 居中">
    <template #ep>
      <div data-pair="dialog" class="static-dialog" data-pos data-width :data-target="parts('ep')">
        <el-dialog :model-value="true" title="对话框标题" :modal="false" :lock-scroll="false">
          这是对话框的内容。
          <template #footer>
            <el-button>取消</el-button>
            <el-button type="primary">确定</el-button>
          </template>
        </el-dialog>
      </div>
    </template>
    <template #arco>
      <div data-pair="dialog" class="static-dialog" :data-target="parts('arco')">
        <a-modal :visible="true" title="对话框标题" title-align="start" :render-to-body="false" :mask="false">
          这是对话框的内容。
        </a-modal>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="drawer-basic" title="Drawer" note="宽度写在行内样式上，用例两侧都传 300px">
    <template #ep>
      <div data-pair="drawer" class="static-dialog drawer-box" data-pos data-width :data-target="drawerParts('ep')">
        <el-drawer :model-value="true" title="抽屉标题" size="300px" :modal="false" :lock-scroll="false">
          这是抽屉的内容。
          <template #footer>
            <el-button>取消</el-button>
            <el-button type="primary">确定</el-button>
          </template>
        </el-drawer>
      </div>
    </template>
    <template #arco>
      <div data-pair="drawer" class="static-dialog drawer-box" :data-target="drawerParts('arco')">
        <a-drawer :visible="true" title="抽屉标题" :width="300" :render-to-body="false" :mask="false">
          这是抽屉的内容。
        </a-drawer>
      </div>
    </template>
  </CompareCase>
</template>
