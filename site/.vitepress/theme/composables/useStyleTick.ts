// 明暗或“Arco 主题 / EP 原版”切换后递增，设计变量表据此重新读取 CSS 变量的值
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

export function useStyleTick() {
  const tick = ref(0)
  const { isDark } = useData()
  // 等新样式生效（class 切换、<link> 启用）后再读
  const bump = () => requestAnimationFrame(() => requestAnimationFrame(() => tick.value++))
  watch(isDark, bump)
  onMounted(() => {
    window.addEventListener('site-theme-change', bump)
    // 第一次打开时组件样式（<link>）可能还没加载完，这时读到的变量都是空的；加载完再读一遍
    for (const link of document.querySelectorAll('link[data-site-style]')) link.addEventListener('load', bump)
    window.addEventListener('load', bump, { once: true })
    bump()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('site-theme-change', bump)
    for (const link of document.querySelectorAll('link[data-site-style]')) link.removeEventListener('load', bump)
  })
  return tick
}

// 把颜色表达式（var(--x) / rgb(var(--x))）解析成实际的 rgb 值
export function resolveColor(expr: string) {
  const probe = document.createElement('span')
  probe.style.color = expr
  document.body.appendChild(probe)
  const value = getComputedStyle(probe).color
  probe.remove()
  return value
}

export const readVar = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
