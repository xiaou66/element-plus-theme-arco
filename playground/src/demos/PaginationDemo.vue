<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

const items = (side: 'ep' | 'arco', n: number[]) =>
  n
    .map((i) => (side === 'ep' ? `.el-pager li:nth-child(${i})` : `.arco-pagination-list > li:nth-child(${i + 1})`))
    .join('|') + (side === 'ep' ? '|.btn-prev|.btn-next' : '|.arco-pagination-item-previous|.arco-pagination-item-next')
const sizes = ['small', 'default', 'large'] as const
const arcoSize = { small: 'small', default: 'medium', large: 'large' } as const
</script>

<template>
  <CompareCase id="pagination-basic" title="基础 / 尺寸" note="EP 默认（无背景）↔ Arco 默认；当前页浅主色底；EP 的页码获得焦点时会重新渲染列表，不比较 focus">
    <template #ep>
      <div class="stack">
        <span v-for="s in sizes" :key="s" :data-pair="s" data-skip="focus" data-pos data-width :data-target="items('ep', [1, 2, 3])">
          <el-pagination :total="50" :default-current-page="2" :size="s" layout="prev, pager, next" />
        </span>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <span v-for="s in sizes" :key="s" :data-pair="s" :data-target="items('arco', [1, 2, 3])">
          <a-pagination :total="50" :current="2" :size="arcoSize[s]" />
        </span>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="pagination-props" title="background / 禁用 / 完整布局（Arco 无对应项）" note="background 保留 EP 的实心形态；total / sizes / jumper 用 Select、Input 的样式">
    <template #ep>
      <div class="stack">
        <el-pagination :total="50" :default-current-page="2" background layout="prev, pager, next" />
        <el-pagination :total="50" :default-current-page="2" disabled layout="prev, pager, next" />
        <el-pagination :total="500" :default-current-page="2" layout="total, sizes, prev, pager, next, jumper" />
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <a-pagination :total="50" :current="2" disabled />
        <a-pagination :total="500" :current="2" show-total show-jumper show-page-size />
      </div>
    </template>
  </CompareCase>
</template>
