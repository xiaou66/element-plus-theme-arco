<script setup lang="ts">
// Arco 设计变量（分组、变量名、描述和 Arco 官网一致）。
// 有 CSS 变量的读实时值；Arco 里只是 Less 变量（字号、尺寸等）的显示 Arco 的值，CSS 变量一栏为“-”；
// “对应变量”是主题导出的等价变量（大多是 EP 的 --el-*），用户可以直接用。
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import groups from '../arco-tokens.json'
import { readVar, resolveColor, useStyleTick } from '../composables/useStyleTick'
import CopyText from './CopyText.vue'

const props = defineProps<{ group: string }>()
const { lang } = useData()
const zh = computed(() => lang.value.startsWith('zh'))
const tick = useStyleTick()

// Arco 变量 → 主题导出的等价变量（值相同）
const ladder: Record<string, string> = { 6: '', 5: '-light-3', 7: '-dark-2', 4: '-light-4', 3: '-light-5', 2: '-light-7', 1: '-light-9' }
const fixed: Record<string, string> = {
  'color-border-1': '--el-border-color-light',
  'color-border-2': '--el-border-color',
  'color-border-3': '--el-border-color-dark',
  'color-border-4': '--el-border-color-darker',
  'color-fill-1': '--el-fill-color-light',
  'color-fill-2': '--el-fill-color',
  'color-fill-3': '--el-fill-color-dark',
  'color-fill-4': '--el-fill-color-darker',
  'color-text-1': '--el-text-color-primary',
  'color-text-2': '--el-text-color-regular',
  'color-text-3': '--el-text-color-secondary',
  'color-text-4': '--el-text-color-disabled',
  'color-bg-2': '--el-bg-color',
  'color-bg-5': '--el-bg-color-overlay',
  'color-bg-white': '--el-fill-color-blank',
  'font-size-body-3': '--el-font-size-base',
  'font-size-body-2': '--el-font-size-small',
  'font-size-body-1': '--el-font-size-extra-small',
  'font-size-title-1': '--el-font-size-medium',
  'font-size-title-2': '--el-font-size-extra-large',
  'size-small': '--el-component-size-small',
  'size-default': '--el-component-size',
  'size-large': '--el-component-size-large',
  'border-1': '--el-border-width',
  'border-radius-small': '--el-border-radius-small',
}
function equivalent(name: string) {
  const m = name.match(/^(primary|success|warning|danger)-(\d)$/)
  if (m) return `--el-color-${m[1]}${ladder[m[2]]}`
  return fixed[name] ?? ''
}

const isColor = (name: string) => /^(primary|success|warning|danger|link)-\d$|^color-/.test(name)
// Arco 色阶变量存的是“r,g,b”三元组，用 rgb(var(--x)) 取色
const colorExpr = (cssVar: string, name: string) => (/^[a-z]+-\d$/.test(name) ? `rgb(var(${cssVar}))` : `var(${cssVar})`)

const data = computed(() => groups.find((g) => g.zh === props.group || g.en === props.group))
const values = ref<Record<string, string>>({})
/** 首次读取由挂载后的样式更新触发，保持服务端与浏览器接管页面时的初始内容一致。 */
watch(
  [tick, data],
  () => {
    if (typeof document === 'undefined' || !data.value) return
    const next: Record<string, string> = {}
    for (const row of data.value.rows) {
      if (row.cssVar === '-') next[row.name] = row.value
      else if (isColor(row.name)) next[row.name] = readVar(row.cssVar) ? resolveColor(colorExpr(row.cssVar, row.name)) : '—'
      else next[row.name] = readVar(row.cssVar) || '—'
    }
    values.value = next
  },
)
</script>

<template>
  <table v-if="data" class="token-table">
    <thead>
      <tr>
        <th>{{ zh ? '变量名' : 'Token' }}</th>
        <th>{{ zh ? '变量值' : 'Value' }}</th>
        <th>{{ zh ? 'CSS 变量' : 'CSS Var' }}</th>
        <th>{{ zh ? '对应变量' : 'Equivalent' }}</th>
        <th>{{ zh ? '描述' : 'Description' }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data.rows" :key="row.name">
        <td>
          <span class="token-name">
            <i v-if="isColor(row.name)" class="token-swatch" :style="{ background: values[row.name] }" />
            <i v-else-if="row.name.startsWith('shadow')" class="token-shadow" :style="{ boxShadow: row.value }" />
            {{ row.name }}
          </span>
        </td>
        <td><code>{{ values[row.name] ?? row.value }}</code></td>
        <td><CopyText v-if="row.cssVar !== '-'" :text="row.cssVar" /><span v-else>-</span></td>
        <td><CopyText v-if="equivalent(row.name)" :text="equivalent(row.name)" /><span v-else>-</span></td>
        <td>{{ zh ? row.zh : row.en }}</td>
      </tr>
    </tbody>
  </table>
</template>
