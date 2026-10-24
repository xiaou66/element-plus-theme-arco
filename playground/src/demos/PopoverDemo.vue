<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

// 弹出层两侧都常开、渲染在 wrapper 内部（EP :teleported="false"，Arco popup-container），对比脚本才测得到
</script>

<template>
  <CompareCase id="tooltip-basic" title="Tooltip" note="EP effect=&quot;dark&quot;（默认）↔ Arco Tooltip">
    <template #ep>
      <span data-pair="tooltip" class="pop-box" data-pos data-width data-target=".el-popper">
        <el-tooltip content="提示文字" placement="bottom" :visible="true" :teleported="false">
          <el-button>Tooltip</el-button>
        </el-tooltip>
      </span>
    </template>
    <template #arco>
      <span id="pop-tooltip" data-pair="tooltip" class="pop-box" data-target=".arco-tooltip-content">
        <a-tooltip content="提示文字" position="bottom" :auto-fit-position="false" popup-visible popup-container="#pop-tooltip">
          <a-button>Tooltip</a-button>
        </a-tooltip>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="popover-basic" title="Popover" note="EP width=&quot;auto&quot;（EP 默认宽度 150px 写在行内样式上）↔ Arco Popover">
    <template #ep>
      <span data-pair="popover" class="pop-box" data-pos data-width data-target=".el-popover|.el-popover__title">
        <el-popover title="标题" content="这是一段弹出内容" placement="bottom" width="auto" :visible="true" :teleported="false">
          <template #reference><el-button>Popover</el-button></template>
        </el-popover>
      </span>
    </template>
    <template #arco>
      <span id="pop-popover" data-pair="popover" class="pop-box" data-target=".arco-popover-popup-content|.arco-popover-title">
        <a-popover title="标题" content="这是一段弹出内容" position="bottom" :auto-fit-position="false" popup-visible popup-container="#pop-popover">
          <a-button>Popover</a-button>
        </a-popover>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="popconfirm-basic" title="Popconfirm" note="取消按钮保留 EP 的文字按钮（Arco 是灰底，需要时传 cancel-button-type=&quot;default&quot;），不比较；EP 默认图标 ↔ Arco 默认 info 图标（主色）；EP 的按钮文字默认是英文，用例传了中文">
    <template #ep>
      <span data-pair="popconfirm" class="pop-box" data-pos data-width data-target=".el-popover|.el-popconfirm__icon svg|.el-popconfirm__main|.el-popconfirm__action .el-button:nth-child(2)">
        <el-popconfirm title="确定要删除吗？" cancel-button-text="取消" confirm-button-text="确定" placement="bottom" width="auto" :visible="true" :teleported="false">
          <template #reference><el-button>Popconfirm</el-button></template>
        </el-popconfirm>
      </span>
    </template>
    <template #arco>
      <span id="pop-popconfirm" data-pair="popconfirm" class="pop-box" data-target=".arco-popconfirm-popup-content|.arco-popconfirm-icon svg|.arco-popconfirm-body|.arco-popconfirm-footer .arco-btn:nth-child(2)">
        <a-popconfirm content="确定要删除吗？" position="bottom" :auto-fit-position="false" popup-visible popup-container="#pop-popconfirm">
          <a-button>Popconfirm</a-button>
        </a-popconfirm>
      </span>
    </template>
  </CompareCase>
</template>
