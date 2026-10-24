<script setup lang="ts">
// 顶栏语言切换（替换 VitePress 的 VPNavBarTranslations，见 config.mts 的 alias），按 Arco 官网的语言选择器：
// 触发器直接显示当前语言 + 12px 下箭头（展开时朝上）；弹出层在顶栏下边线下方、104px、上下 4px、1px 边框、4px 圆角、0 4px 10px 阴影；
// 选项 36px 高、左右 12px，当前项 fill-2 底、500 字重、前面打勾（其余项的勾透明占位，文字对齐）。
// 链接规则同 VitePress 的 useLangs：切换语言时跳到另一种语言的同一页面，保留锚点
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { site, localeIndex, page, hash } = useData()
const open = ref(false)
const root = ref<HTMLElement>()

const localeLink = (key: string) => site.value.locales[key]?.link || (key === 'root' ? '/' : `/${key}/`)

const langs = computed(() => {
  const current = localeLink(localeIndex.value)
  const path = page.value.relativePath
    .slice(current.length - 1)
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, site.value.cleanUrls ? '' : '.html')
  return Object.entries(site.value.locales).map(([key, locale]) => ({
    key,
    label: locale.label ?? key,
    active: key === localeIndex.value,
    link: localeLink(key).replace(/\/$/, '') + '/' + path.replace(/^\//, '') + hash.value,
  }))
})
const currentLabel = computed(() => langs.value.find((l) => l.active)?.label)

// 点外面或按 Esc 收起
function onDocClick(e: MouseEvent) {
  if (open.value && !root.value?.contains(e.target as Node)) open.value = false
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div v-if="langs.length > 1 && currentLabel" ref="root" class="VPNavBarTranslations site-lang">
    <button type="button" class="site-lang-trigger" :aria-expanded="open" aria-haspopup="listbox" @click="open = !open">
      {{ currentLabel }}
      <svg class="site-lang-arrow" :class="{ open }" viewBox="0 0 48 48" width="12" height="12" fill="none" stroke="currentColor" stroke-width="4" aria-hidden="true">
        <path d="M39.6 17.443 24.043 33 8.487 17.443" />
      </svg>
    </button>
    <ul v-show="open" class="site-lang-popup" role="listbox">
      <li v-for="lang in langs" :key="lang.key" role="option" :aria-selected="lang.active">
        <a class="site-lang-option" :class="{ active: lang.active }" :href="lang.link" :lang="site.locales[lang.key]?.lang" @click="open = false">
          <svg class="site-lang-check" viewBox="0 0 48 48" width="14" height="14" fill="none" stroke="currentColor" stroke-width="4" aria-hidden="true">
            <path d="M41.678 11.05 19.05 33.678 6.322 20.95" />
          </svg>
          {{ lang.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* 同 VitePress 原组件：1280px 以下收进顶栏的“更多”菜单 */
.site-lang {
  position: relative;
  display: none;
}

@media (min-width: 1280px) {
  .site-lang {
    display: flex;
    align-items: center;
  }
}

.site-lang-trigger {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  height: 32px;
  padding: 0 11px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.site-lang-arrow {
  color: var(--vp-c-text-2);
  transition: transform 0.1s;
}

.site-lang-arrow.open {
  transform: rotate(180deg);
}

/* Arco 的弹出层在顶栏下边线下方 3.5px：触发器 32px 高、在 60px 顶栏里居中，所以离触发器底边 17.5px */
.site-lang-popup {
  position: absolute;
  top: calc(100% + 17.5px);
  left: -5px;
  z-index: var(--vp-z-index-nav);
  min-width: 104px;
  margin: 0;
  padding: 4px 0;
  list-style: none;
  background-color: var(--site-popup-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.site-lang-option {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  font-size: 14px;
  white-space: nowrap;
  color: var(--vp-c-text-1);
}

/* 同 Arco：鼠标在弹出层里时只有悬停项有背景，选中项让出背景，避免两块背景连在一起 */
.site-lang-option:hover,
.site-lang-option.active {
  background-color: var(--site-fill-2);
}

.site-lang-popup:hover .site-lang-option.active:not(:hover) {
  background-color: transparent;
}

.site-lang-option.active {
  font-weight: 500;
}

.site-lang-check {
  flex: none;
  margin-right: 8px;
  opacity: 0;
}

.site-lang-option.active .site-lang-check {
  opacity: 1;
}
</style>
