<script setup lang="ts">
// 一个对照用例：左边 EP（套主题），右边 Arco 原版。
// 两侧用相同的 data-pair 标记成对元素，scripts/screenshot.mjs 会据此逐对比较样式。
defineProps<{ id: string; title: string; note?: string }>()
</script>

<template>
  <section class="case" :data-case="id">
    <header class="case-head">
      <h3>{{ title }}</h3>
      <p v-if="note">{{ note }}</p>
    </header>
    <div class="sides">
      <div class="side side-ep">
        <div class="side-label">Element Plus + Arco 主题</div>
        <div class="cell"><slot name="ep" /></div>
      </div>
      <div class="side side-arco">
        <div class="side-label">Arco Design Vue</div>
        <div class="cell"><slot name="arco" /></div>
      </div>
    </div>
  </section>
</template>
