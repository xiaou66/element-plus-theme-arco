<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'
</script>

<template>
  <CompareCase id="splitter" title="Splitter" note="只看截图：结构保留 EP，只换颜色（方案 A）——分隔线默认 neutral-3、hover neutral-4、拖动中主色；折叠按钮 neutral-3 底、text-1 图标、hover neutral-4。右侧是 Arco Split 作参照">
    <template #ep>
      <div class="stack">
        <div class="split-box">
          <el-splitter>
            <el-splitter-panel collapsible><div class="split-pane">左</div></el-splitter-panel>
            <el-splitter-panel collapsible><div class="split-pane">右</div></el-splitter-panel>
          </el-splitter>
        </div>
        <div class="split-box">
          <el-splitter layout="vertical">
            <el-splitter-panel><div class="split-pane">上</div></el-splitter-panel>
            <el-splitter-panel><div class="split-pane">下</div></el-splitter-panel>
          </el-splitter>
        </div>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <div class="split-box">
          <a-split default-size="0.5" style="height: 100%"><template #first><div class="split-pane">左</div></template><template #second><div class="split-pane">右</div></template></a-split>
        </div>
        <div class="split-box">
          <a-split direction="vertical" default-size="0.5" style="height: 100%"><template #first><div class="split-pane">上</div></template><template #second><div class="split-pane">下</div></template></a-split>
        </div>
      </div>
    </template>
  </CompareCase>
</template>
