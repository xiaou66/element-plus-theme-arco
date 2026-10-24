<script setup lang="ts">
// 主题导出的全局变量：直接从页面上生效的样式表里读出 :root 上定义的 --el-* 变量，按分组列出实时值。
// 不手写清单，主题改了变量这里自动跟着变。
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { readVar, resolveColor, useStyleTick } from '../composables/useStyleTick'
import CopyText from './CopyText.vue'

const props = defineProps<{ group: string }>()
const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))
const tick = useStyleTick()

// 分组规则：按变量名前缀；color 表示带色块
const exportedGroups: Record<string, { test: RegExp; color?: boolean }> = {
  color: { test: /^--el-color-/, color: true },
  text: { test: /^--el-text-color-/, color: true },
  border: { test: /^--el-border-color/, color: true },
  fill: { test: /^--el-fill-color/, color: true },
  bg: { test: /^--el-bg-color/, color: true },
  overlay: { test: /^--el-(overlay|mask)-color/, color: true },
  'font-size': { test: /^--el-font-size-/ },
  font: { test: /^--el-font-(weight|line-height|family)/ },
  'component-size': { test: /^--el-component-size/ },
  radius: { test: /^--el-border-radius-/ },
  shadow: { test: /^--el-box-shadow/ },
  line: { test: /^--el-border(-width|-style)?$/ },
  disabled: { test: /^--el-disabled-/, color: true },
  index: { test: /^--el-index-/ },
  transition: { test: /^--el-transition-/ },
}

function rootVars() {
  const names = new Set<string>()
  for (const sheet of Array.from(document.styleSheets)) {
    const owner = sheet.ownerNode as HTMLLinkElement | null
    // 只看当前启用的那套
    if (!owner || sheet.disabled || !/\/styles\/(arco|ep)\.css/.test(owner.getAttribute?.('href') ?? '')) continue
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      continue
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule) || rule.selectorText !== ':root') continue
      for (const prop of Array.from(rule.style)) if (prop.startsWith('--el-')) names.add(prop)
    }
  }
  return [...names]
}

const rows = ref<{ name: string; value: string; color: string }[]>([])
/** 首次读取由挂载后的样式更新触发，保持服务端与浏览器接管页面时的初始内容一致。 */
watch(
  tick,
  () => {
    if (typeof document === 'undefined') return
    const g = exportedGroups[props.group]
    rows.value = rootVars()
      .filter((n) => g.test.test(n))
      .sort()
      .map((name) => {
        const value = readVar(name)
        // -rgb 结尾的存的是 r, g, b 三元组
        return { name, value, color: g.color ? resolveColor(name.endsWith('-rgb') ? `rgb(var(${name}))` : `var(${name})`) : '' }
      })
  },
)
</script>

<template>
  <table class="token-table">
    <thead>
      <tr>
        <th>{{ zh ? 'CSS 变量' : 'CSS Var' }}</th>
        <th>{{ zh ? '值' : 'Value' }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.name">
        <td>
          <span class="token-name">
            <i v-if="row.color" class="token-swatch" :style="{ background: row.color }" />
            <i v-else-if="group === 'shadow'" class="token-shadow" :style="{ boxShadow: row.value }" />
            <CopyText :text="row.name" />
          </span>
        </td>
        <td><code>{{ row.value }}</code></td>
      </tr>
    </tbody>
  </table>
</template>
