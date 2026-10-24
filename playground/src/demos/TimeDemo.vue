<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import CompareCase from '../components/CompareCase.vue'
import TimePanelHost from '../components/TimePanelHost.vue'

const epTime = ref(new Date(2026, 9, 14, 9, 30, 15))
const arcoTime = ref('09:30:15')
const epSelect = ref('09:30')

const panel = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-time-spinner__wrapper:nth-child(1)|.el-time-spinner__wrapper:nth-child(1) .el-time-spinner__item.is-active + li|.el-time-spinner__wrapper:nth-child(1) .el-time-spinner__item.is-active|.el-time-panel__footer|.el-time-panel__btn.cancel|.el-time-panel__btn.confirm'
    : '.arco-timepicker-column:nth-child(1)|.arco-timepicker-column:nth-child(1) .arco-timepicker-cell-selected + li|.arco-timepicker-column:nth-child(1) .arco-timepicker-cell-selected|.arco-timepicker-footer-btn-wrapper|.arco-timepicker-footer-btn-wrapper .arco-btn:nth-child(1)|.arco-timepicker-footer-btn-wrapper .arco-btn:nth-child(2)'
</script>

<template>
  <CompareCase id="time-panel" title="TimePicker 面板" note="选中项停在列顶部（Arco 的方式）；每列 64px、项 32px；底部按钮 EP 是“取消 / 确定”、Arco 是“此刻 / 确定”（文字不同，只比较外框）；EP 直接渲染 TimePickPanel（ElTimePicker 失焦时会卸载面板，脚本测不到），Arco 用弹出层，面板不比较位置">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div data-pair="panel" :data-target="panel('ep')">
          <TimePanelHost :model-value="epTime" />
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div class="pop-box" style="height: 320px">
        <div id="pop-time" data-pair="panel" :data-target="panel('arco')">
          <a-time-picker v-model="arcoTime" popup-visible :trigger-props="{ popupContainer: '#pop-time', autoFitPosition: false }" style="width: 200px" />
        </div>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="time-input" title="TimePicker 输入框" note="同 DatePicker：图标在右侧、文字 text-2">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <span data-pair="input" data-skip="focus" data-width :data-target="'.el-input__wrapper|.el-input__prefix svg'">
          <el-time-picker v-model="epTime" style="width: 200px" />
        </span>
      </el-config-provider>
    </template>
    <template #arco>
      <span data-pair="input" :data-target="'.arco-picker|.arco-picker-suffix-icon svg'">
        <a-time-picker v-model="arcoTime" style="width: 200px" />
      </span>
    </template>
  </CompareCase>

  <CompareCase id="time-select" title="TimeSelect" note="只看截图：EP 的 TimeSelect 就是 Select（已迁移），Arco 没有对应组件">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <el-time-select v-model="epSelect" start="08:30" step="00:15" end="18:30" style="width: 200px" />
      </el-config-provider>
    </template>
    <template #arco>
      <span />
    </template>
  </CompareCase>
</template>
