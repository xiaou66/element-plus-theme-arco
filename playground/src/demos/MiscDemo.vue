<script setup lang="ts">
import { ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

// Mention：下拉面板在输入框失焦时就会关闭，同一时间只能有一侧打开，对比脚本测不到；输入“@”手动核对
const mentionOptions = [
  { value: 'zhangsan', label: 'zhangsan' },
  { value: 'lisi', label: 'lisi' },
  { value: 'wangwu', label: 'wangwu', disabled: true },
]
const epMention = ref('')
const arcoMention = ref('')

const otp = (side: 'ep' | 'arco') =>
  [1, 2, 3]
    .map((n) => (side === 'ep' ? `.el-input-otp__input-field:nth-child(${n})` : `.arco-input-wrapper:nth-child(${n})`))
    .join('|')
</script>

<template>
  <CompareCase id="input-otp" title="Input OTP" note="EP type=&quot;filled&quot; ↔ Arco VerificationCode（Arco 撑满容器，用例把容器宽度设成格子总宽）；EP 默认的 outlined 和 underlined 保留 EP 形态（下方展示）">
    <template #ep>
      <span data-pair="filled" data-pos data-width :data-target="otp('ep')"><el-input-otp model-value="12" type="filled" /></span>
      <span data-pair="filled-small" data-pos data-width :data-target="otp('ep')"><el-input-otp model-value="12" type="filled" size="small" /></span>
      <span><el-input-otp model-value="12" /></span>
      <span><el-input-otp model-value="12" type="underlined" /></span>
    </template>
    <template #arco>
      <span data-pair="filled" :data-target="otp('arco')" style="width: 212px"><a-verification-code model-value="12" /></span>
      <span data-pair="filled-small" :data-target="otp('arco')" style="width: 188px"><a-verification-code model-value="12" size="small" /></span>
    </template>
  </CompareCase>

  <CompareCase id="scrollbar" title="Scrollbar" note="hover 容器时出现滑块：9px 宽、距边 3px、gray-4；滑块长度由两边的 JS 各自计算，不成对比较；EP always 常显">
    <template #ep>
      <span>
        <el-scrollbar height="120px" always class="scroll-box"><div class="scroll-inner">滚动内容</div></el-scrollbar>
      </span>
    </template>
    <template #arco>
      <span>
        <a-scrollbar style="height: 120px; overflow: auto" class="scroll-box arco-scroll-show"><div class="scroll-inner">滚动内容</div></a-scrollbar>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="mention" title="Mention" note="输入框同 Input；下拉面板同 Select 下拉（36px 项、fill-3 描边、4px 圆角），在输入框失焦时就会关闭，同一时间只能打开一侧，对比脚本测不到，输入“@”手动核对">
    <template #ep>
      <div class="pop-box" style="height: 200px">
        <el-mention v-model="epMention" :options="mentionOptions" :teleported="false" style="width: 240px" />
      </div>
    </template>
    <template #arco>
      <div id="pop-mention" class="pop-box" style="height: 200px">
        <a-mention v-model="arcoMention" :data="mentionOptions.map((o) => o.value)" :trigger-props="{ popupContainer: '#pop-mention' }" style="width: 240px" />
      </div>
    </template>
  </CompareCase>
</template>
