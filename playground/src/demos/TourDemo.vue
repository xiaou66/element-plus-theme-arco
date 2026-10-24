<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import CompareCase from '../components/CompareCase.vue'

// Tour 打开后遮罩盖住整个视口，单独放一页；右侧用打开的 Arco Popover 作参照
const open = ref(true)
const target = ref()
</script>

<template>
  <CompareCase id="tour-basic" title="Tour ↔ Arco Popover 外壳" note="只看截图：Arco 没有 Tour，卡片按 Popover（12px 16px、neutral-3 描边、4px 圆角、标题 16px / 500、正文 text-2），遮罩按 Arco 的 mask 色">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div class="tour-box">
          <el-button ref="target">目标按钮</el-button>
          <el-tour v-model="open" :z-index="10">
            <el-tour-step :target="() => target?.$el" title="第一步" description="这是引导的正文内容，说明这个按钮的用途。" placement="bottom-start" />
            <el-tour-step title="第二步" description="第二步的内容" />
          </el-tour>
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div id="pop-tour" class="tour-box">
        <a-popover title="第一步" popup-visible position="bl" :popup-container="'#pop-tour'">
          <a-button>目标按钮</a-button>
          <template #content><p style="margin: 0">这是引导的正文内容，说明这个按钮的用途。</p></template>
        </a-popover>
      </div>
    </template>
  </CompareCase>
</template>
