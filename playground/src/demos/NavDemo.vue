<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const seg = ref('周')
const segOptions = ['日', '周', '月', { label: '年（禁用）', value: '年', disabled: true }]

// 两侧各一个滚动容器和对应的章节；挂载后点一下第一个链接，让它进入激活状态。
// EP 的链接点击时不阻止默认跳转，会改掉 URL 的 hash（playground 靠 hash 切换页面），用例里用 @click 阻止
const sections = ['一', '二', '三']
onMounted(async () => {
  await nextTick()
  setTimeout(() => {
    for (const a of document.querySelectorAll<HTMLElement>('[data-case^="anchor-"] .el-anchor__item:first-child > .el-anchor__link, [data-case^="anchor-"] .arco-anchor-link-item:first-child > .arco-anchor-link')) a.click()
  }, 200)
})

const vParts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-anchor__item:nth-child(1) > .el-anchor__link|.el-anchor__item:nth-child(2) > .el-anchor__link|.el-anchor__list .el-anchor__list .el-anchor__link'
    : '.arco-anchor-link-item:nth-child(1) > .arco-anchor-link|.arco-anchor-link-item:nth-child(2) > .arco-anchor-link|.arco-anchor-sublist .arco-anchor-link'
</script>

<template>
  <CompareCase id="segmented" title="Segmented" note="Arco 没有对应组件，保留 EP 的结构，只换圆角和字号（只看截图）：large / default / small、禁用项、block、vertical">
    <template #ep>
      <div class="stack">
        <div><el-segmented v-model="seg" :options="segOptions" size="large" /></div>
        <div><el-segmented v-model="seg" :options="segOptions" /></div>
        <div><el-segmented v-model="seg" :options="segOptions" size="small" /></div>
        <div><el-segmented v-model="seg" :options="segOptions" block style="width: 360px" /></div>
        <div><el-segmented v-model="seg" :options="segOptions" direction="vertical" /></div>
      </div>
    </template>
    <template #arco>
      <span />
    </template>
  </CompareCase>

  <CompareCase id="anchor-default" title="Anchor 默认 ↔ Arco line-less" note="激活项主色字 + fill-2 底；EP 的圆角标记块不显示；Arco 自带 width: 150px，两侧容器都设 150px">
    <template #ep>
      <div class="anchor-box">
        <div data-pair="v" data-pos data-width :data-target="vParts('ep')">
          <el-anchor container="#ep-scroll-1" :offset="0" @click="(e: MouseEvent) => e.preventDefault()">
            <el-anchor-link v-for="s in sections" :key="s" :href="`#ep-1-${s}`" :title="`章节${s}`">
              <template v-if="s === '一'" #sub-link><el-anchor-link href="#ep-1-sub" title="子章节" /></template>
            </el-anchor-link>
          </el-anchor>
        </div>
        <div id="ep-scroll-1" class="anchor-scroll"><p v-for="s in [...sections, 'sub']" :id="`ep-1-${s}`" :key="s">{{ s }}</p></div>
      </div>
    </template>
    <template #arco>
      <div class="anchor-box">
        <div data-pair="v" :data-target="vParts('arco')">
          <a-anchor line-less scroll-container="#ar-scroll-1" :change-hash="false">
            <a-anchor-link v-for="s in sections" :key="s" :href="`#ar-1-${s}`" :title="`章节${s}`">
              <template v-if="s === '一'" #sublist><a-anchor-link href="#ar-1-sub" title="子章节" /></template>
            </a-anchor-link>
          </a-anchor>
        </div>
        <div id="ar-scroll-1" class="anchor-scroll"><p v-for="s in [...sections, 'sub']" :id="`ar-1-${s}`" :key="s">{{ s }}</p></div>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="anchor-underline" title="Anchor underline ↔ Arco 默认" note="2px fill-3 轨道 + 2px × 12px 主色滑块；激活项 text-1 / 500">
    <template #ep>
      <div class="anchor-box">
        <div data-pair="v" data-pos data-width :data-target="`${vParts('ep')}|.el-anchor__marker`">
          <el-anchor type="underline" container="#ep-scroll-2" :offset="0" @click="(e: MouseEvent) => e.preventDefault()">
            <el-anchor-link v-for="s in sections" :key="s" :href="`#ep-2-${s}`" :title="`章节${s}`">
              <template v-if="s === '一'" #sub-link><el-anchor-link href="#ep-2-sub" title="子章节" /></template>
            </el-anchor-link>
          </el-anchor>
        </div>
        <div id="ep-scroll-2" class="anchor-scroll"><p v-for="s in [...sections, 'sub']" :id="`ep-2-${s}`" :key="s">{{ s }}</p></div>
      </div>
    </template>
    <template #arco>
      <div class="anchor-box">
        <div data-pair="v" :data-target="`${vParts('arco')}|.arco-anchor-line-slider`">
          <a-anchor scroll-container="#ar-scroll-2" :change-hash="false">
            <a-anchor-link v-for="s in sections" :key="s" :href="`#ar-2-${s}`" :title="`章节${s}`">
              <template v-if="s === '一'" #sublist><a-anchor-link href="#ar-2-sub" title="子章节" /></template>
            </a-anchor-link>
          </a-anchor>
        </div>
        <div id="ar-scroll-2" class="anchor-scroll"><p v-for="s in [...sections, 'sub']" :id="`ar-2-${s}`" :key="s">{{ s }}</p></div>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="anchor-horizontal" title="Anchor 横向" note="underline ↔ Arco 默认横向（滑块左右缩进 8px）；默认 ↔ line-less 横向；Arco 横向滑块本身宽 0、颜色在伪元素上，只看截图；h-line 只比默认状态（链接 hover 在 h-less 里比较）">
    <template #ep>
      <div class="stack">
        <div data-pair="h-line" data-skip="hover focus" data-pos data-width :data-target="'.el-anchor__item:nth-child(1) > .el-anchor__link|.el-anchor__item:nth-child(2) > .el-anchor__link'">
          <el-anchor type="underline" direction="horizontal" container="#ep-scroll-3" :offset="0" @click="(e: MouseEvent) => e.preventDefault()">
            <el-anchor-link v-for="s in sections" :key="s" :href="`#ep-3-${s}`" :title="`章节${s}`" />
          </el-anchor>
        </div>
        <div data-pair="h-less" data-pos data-width :data-target="'.el-anchor__item:nth-child(1) > .el-anchor__link|.el-anchor__item:nth-child(2) > .el-anchor__link'">
          <el-anchor direction="horizontal" container="#ep-scroll-3" :offset="0" @click="(e: MouseEvent) => e.preventDefault()">
            <el-anchor-link v-for="s in sections" :key="s" :href="`#ep-3-${s}`" :title="`章节${s}`" />
          </el-anchor>
        </div>
        <div id="ep-scroll-3" class="anchor-scroll"><p v-for="s in sections" :id="`ep-3-${s}`" :key="s">{{ s }}</p></div>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <div data-pair="h-line" :data-target="'.arco-anchor-link-item:nth-child(1) > .arco-anchor-link|.arco-anchor-link-item:nth-child(2) > .arco-anchor-link'">
          <a-anchor direction="horizontal" scroll-container="#ar-scroll-3" :change-hash="false">
            <a-anchor-link v-for="s in sections" :key="s" :href="`#ar-3-${s}`" :title="`章节${s}`" />
          </a-anchor>
        </div>
        <div data-pair="h-less" :data-target="'.arco-anchor-link-item:nth-child(1) > .arco-anchor-link|.arco-anchor-link-item:nth-child(2) > .arco-anchor-link'">
          <a-anchor direction="horizontal" line-less scroll-container="#ar-scroll-3" :change-hash="false">
            <a-anchor-link v-for="s in sections" :key="s" :href="`#ar-3-${s}`" :title="`章节${s}`" />
          </a-anchor>
        </div>
        <div id="ar-scroll-3" class="anchor-scroll"><p v-for="s in sections" :id="`ar-3-${s}`" :key="s">{{ s }}</p></div>
      </div>
    </template>
  </CompareCase>
</template>
