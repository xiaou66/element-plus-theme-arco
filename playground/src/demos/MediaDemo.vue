<script setup lang="ts">
import CompareCase from '../components/CompareCase.vue'

// 内联 SVG 当图片，两侧一致、不依赖网络
const svg = (c1: string, c2: string, text: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><defs><linearGradient id="g"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="320" height="200" fill="url(#g)"/><text x="160" y="110" font-size="28" text-anchor="middle" fill="#fff">${text}</text></svg>`,
  )}`
const images = [svg('#165dff', '#722ed1', '1'), svg('#00b42a', '#14c9c9', '2'), svg('#ff7d00', '#f53f3f', '3')]
const slides = [1, 2, 3]
const slideStyle = (i: number) => ({ background: ['#165dff', '#00b42a', '#ff7d00'][i - 1], height: '100%' })

const viewerEp = '.el-image-viewer__close|.el-image-viewer__prev|.el-image-viewer__next'
const viewerArco = '.arco-image-preview-close-btn|.arco-image-preview-arrow-left|.arco-image-preview-arrow-right'
// 工具栏：Arco 的操作比 EP 多一个，宽度和位置本来就不同，只比较高度、底色、圆角；单个操作 Arco 的圆角和内边距分在两层，看截图
const toolbarEp = '.el-image-viewer__actions'
const toolbarArco = '.arco-image-preview-toolbar'
const dots = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-carousel__indicator:nth-child(1) .el-carousel__button|.el-carousel__indicator:nth-child(2) .el-carousel__button|.el-carousel__arrow--left|.el-carousel__arrow--right'
    : '.arco-carousel-indicator-item:nth-child(1)|.arco-carousel-indicator-item:nth-child(2)|.arco-carousel-arrow-left|.arco-carousel-arrow-right'
</script>

<template>
  <CompareCase id="image-basic" title="Image" note="2px 圆角；加载失败 EP 只有文字（Arco 是图标 + alt），对齐颜色和字号（加载失败只看截图）">
    <template #ep>
      <span data-pair="img" data-width data-target=".el-image">
        <el-image :src="images[0]" style="width: 160px; height: 100px" fit="cover" />
      </span>
      <el-image src="/not-found.png" style="width: 160px; height: 100px" />
    </template>
    <template #arco>
      <span data-pair="img" data-target=".arco-image">
        <a-image :src="images[0]" width="160" height="100" fit="cover" :preview="false" />
      </span>
      <a-image src="/not-found.png" width="160" height="100" alt="加载失败" :preview="false" />
    </template>
  </CompareCase>

  <CompareCase id="image-viewer" title="ImageViewer ↔ ImagePreview" note="关闭 32px、切换 32px 圆；工具栏 bg-2 底、操作 40px 见方。图标形状和数量不同（只比较外框）">
    <template #ep>
      <div class="stack">
        <div class="static-viewer" data-pair="viewer" data-pos data-width :data-target="viewerEp">
          <el-image-viewer :url-list="images" :initial-index="1" :teleported="false" />
        </div>
        <div class="static-viewer" data-pair="toolbar" :data-target="toolbarEp">
          <el-image-viewer :url-list="images" :initial-index="1" :teleported="false" />
        </div>
      </div>
    </template>
    <template #arco>
      <div class="stack">
        <div class="static-viewer" data-pair="viewer" :data-target="viewerArco">
          <a-image-preview-group :src-list="images" :default-current="1" visible :render-to-body="false" />
        </div>
        <div class="static-viewer" data-pair="toolbar" :data-target="toolbarArco">
          <a-image-preview-group :src-list="images" :default-current="1" visible :render-to-body="false" />
        </div>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="carousel-basic" title="Carousel" note="EP 默认指示器 ↔ Arco 默认圆点；箭头 24px 圆；outside ↔ outer；EP 指示器默认 hover 就切换（Arco 是点击），用例传 trigger=&quot;click&quot; 让两侧停在同一张">
    <template #ep>
      <div class="stack carousel-box">
        <div data-pair="inner" data-pos data-width :data-target="dots('ep')">
          <el-carousel height="160px" :autoplay="false" arrow="always" trigger="click">
            <el-carousel-item v-for="i in slides" :key="i"><div :style="slideStyle(i)" /></el-carousel-item>
          </el-carousel>
        </div>
        <div data-pair="outside" data-pos data-width :data-target="'.el-carousel__indicator:nth-child(1) .el-carousel__button|.el-carousel__indicator:nth-child(2) .el-carousel__button'">
          <el-carousel height="120px" :autoplay="false" indicator-position="outside" arrow="never" trigger="click">
            <el-carousel-item v-for="i in slides" :key="i"><div :style="slideStyle(i)" /></el-carousel-item>
          </el-carousel>
        </div>
        <div data-pair="vertical" data-pos :data-target="'.el-carousel__indicator:nth-child(1) .el-carousel__button|.el-carousel__indicator:nth-child(2) .el-carousel__button'">
          <el-carousel height="120px" :autoplay="false" direction="vertical" arrow="never" trigger="click">
            <el-carousel-item v-for="i in slides" :key="i"><div :style="slideStyle(i)" /></el-carousel-item>
          </el-carousel>
        </div>
        <el-carousel height="140px" :autoplay="false" type="card">
          <el-carousel-item v-for="i in slides" :key="i"><div :style="slideStyle(i)" /></el-carousel-item>
        </el-carousel>
      </div>
    </template>
    <template #arco>
      <div class="stack carousel-box">
        <div data-pair="inner" :data-target="dots('arco')">
          <a-carousel :style="{ height: '160px' }" :auto-play="false" show-arrow="always">
            <a-carousel-item v-for="i in slides" :key="i"><div :style="slideStyle(i)" /></a-carousel-item>
          </a-carousel>
        </div>
        <div data-pair="outside" :data-target="'.arco-carousel-indicator-item:nth-child(1)|.arco-carousel-indicator-item:nth-child(2)'">
          <a-carousel :style="{ height: '120px' }" :auto-play="false" indicator-position="outer" show-arrow="never">
            <a-carousel-item v-for="i in slides" :key="i"><div :style="slideStyle(i)" /></a-carousel-item>
          </a-carousel>
        </div>
        <div data-pair="vertical" :data-target="'.arco-carousel-indicator-item:nth-child(1)|.arco-carousel-indicator-item:nth-child(2)'">
          <a-carousel :style="{ height: '120px' }" :auto-play="false" direction="vertical" indicator-position="right" show-arrow="never">
            <a-carousel-item v-for="i in slides" :key="i"><div :style="slideStyle(i)" /></a-carousel-item>
          </a-carousel>
        </div>
        <a-carousel :style="{ height: '140px' }" :auto-play="false" animation-name="card" indicator-type="dot">
          <a-carousel-item v-for="i in slides" :key="i" style="width: 50%"><div :style="slideStyle(i)" /></a-carousel-item>
        </a-carousel>
      </div>
    </template>
  </CompareCase>
</template>
