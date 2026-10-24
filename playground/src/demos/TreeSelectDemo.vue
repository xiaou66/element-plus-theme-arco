<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import CompareCase from '../components/CompareCase.vue'

// 单独一页：打开 TreeSelect 会让同一页上其它弹出层（Cascader）失焦关闭
// TreeSelect 只暴露树和输入框的方法（没有 toggleMenu），点一下选择框打开
onMounted(async () => {
  await nextTick()
  document.querySelector<HTMLElement>('[data-case="tree-select"] .side-ep .el-select__wrapper')?.click()
})
const tsData = [
  { value: '1', label: '一级 1', children: [{ value: '1-1', label: '二级 1-1' }, { value: '1-2', label: '二级 1-2' }] },
  { value: '2', label: '一级 2' },
]
const arcoTsData = tsData.map((d) => ({ key: d.value, title: d.label, children: d.children?.map((c) => ({ key: c.value, title: c.label })) }))
</script>

<template>
  <CompareCase id="tree-select" title="TreeSelect" note="选择框同 Select；面板里的树同 Tree（32px 节点、标题 hover 圆角底、选中主色字），面板左 10px 右 4px；EP 传 show-arrow=false（同 Select）。只看截图：面板失焦就会关闭，对比脚本测不到；树和下拉外壳分别在 Tree、Select 的用例里自动对比">
    <template #ep>
      <span class="sel-box pop-box" style="height: 200px">
        <el-tree-select model-value="2" :data="tsData" :teleported="false" :show-arrow="false" style="width: 200px" />
      </span>
    </template>
    <template #arco>
      <span id="pop-ts" class="sel-box pop-box" style="height: 200px">
        <a-tree-select model-value="2" :data="arcoTsData" popup-visible popup-container="#pop-ts" :trigger-props="{ autoFitPosition: false }" style="width: 200px" />
      </span>
    </template>
  </CompareCase>
</template>
