<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'
</script>

<template>
  <CompareCase id="skeleton-basic" title="段落 / 形状" note="EP 默认骨架（4 行）↔ Arco Skeleton.Line rows=4；circle ↔ Skeleton.Shape">
    <template #ep>
      <div class="stack">
        <span data-pair="rows" data-pos data-width data-target=".el-skeleton__item:nth-child(1)|.el-skeleton__item:nth-child(2)|.el-skeleton__item:nth-child(4)">
          <el-skeleton :rows="3" />
        </span>
        <span data-pair="shape" data-width data-target=".el-skeleton__circle|.el-skeleton__rect">
          <el-skeleton>
            <template #template>
              <div class="skeleton-shapes">
                <el-skeleton-item variant="circle" />
                <el-skeleton-item variant="rect" style="width: 48px; height: 48px" />
              </div>
            </template>
          </el-skeleton>
        </span>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <span data-pair="rows" data-target=".arco-skeleton-line:nth-child(1) li|.arco-skeleton-line:nth-child(2) li|.arco-skeleton-line:nth-child(4) li">
          <a-skeleton><a-skeleton-line :rows="4" :widths="['33%', '100%', '100%', '61%']" /></a-skeleton>
        </span>
        <span data-pair="shape" data-target=".arco-skeleton-shape-circle|.arco-skeleton-shape-square">
          <a-skeleton>
            <div class="skeleton-shapes">
              <a-skeleton-shape shape="circle" />
              <a-skeleton-shape />
            </div>
          </a-skeleton>
        </span>
      </div>
    </template>
  </CompareCase>
</template>
