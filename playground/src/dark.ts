// 两边的暗色开关不同：EP 是 html.dark，Arco 是 body[arco-theme="dark"]，这里同时切换。
// 状态放在 URL 的 ?dark=1 上，截图脚本可以直接用。
export const isDark = () => new URLSearchParams(location.search).get('dark') === '1'

export function applyDark(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  if (dark) document.body.setAttribute('arco-theme', 'dark')
  else document.body.removeAttribute('arco-theme')

  const url = new URL(location.href)
  if (dark) url.searchParams.set('dark', '1')
  else url.searchParams.delete('dark')
  history.replaceState(null, '', url)
}
