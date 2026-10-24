// 右侧目录的收起状态：两个按钮（目录上方的、收起后贴在窗口右边的）共用。
// 状态写在 <html> 的 class 上（config.mts 的启动脚本在渲染前就设好），并记住上次的选择
import { ref, watch } from 'vue'

const KEY = 'site-outline-collapsed'
const collapsed = ref(false)
let ready = false

export function useOutlineCollapse() {
  if (!ready && typeof window !== 'undefined') {
    ready = true
    collapsed.value = document.documentElement.classList.contains('outline-collapsed')
    watch(collapsed, (v) => {
      document.documentElement.classList.toggle('outline-collapsed', v)
      try {
        localStorage.setItem(KEY, v ? '1' : '0')
      } catch {}
    })
  }
  return collapsed
}
