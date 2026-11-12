// 通过 Figma REST API 读取设计稿，产出与 extract.js 相同的精简实例树。
// 需要个人访问令牌（Figma → Settings → Security → Personal access tokens，权限 File content: Read only），
// 所有套餐都能生成。读取一次只发 1 个请求（GET /v1/files/:key/nodes，Tier 1 接口）。

/** 从 Figma 链接解析 fileKey 和 nodeId（分支链接取分支 key） */
export function parseFigmaUrl(input) {
  let url
  try {
    url = new URL(input)
  } catch {
    return null
  }
  const parts = url.pathname.split('/').filter(Boolean)
  const kind = parts[0]
  if (!['design', 'file', 'proto'].includes(kind) || !parts[1]) return null
  const fileKey = parts[2] === 'branch' && parts[3] ? parts[3] : parts[1]
  const raw = url.searchParams.get('node-id')
  const nodeId = raw ? decodeURIComponent(raw).replace('-', ':') : null
  return { fileKey, nodeId: nodeId && /^\d+:\d+$/.test(nodeId) ? nodeId : null }
}

export async function fetchTree({ fileKey, nodeId, token }) {
  const api = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`
  const res = await fetch(api, { headers: { 'X-Figma-Token': token } })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    const hint = {
      403: '令牌无效、已过期，或没有这个文件的访问权限（令牌需要 File content: Read only 权限）',
      404: '找不到文件，检查链接是否正确、令牌所属账号能否打开这个文件',
      429: '请求太频繁或额度用完（View / Collab 席位每月只有约 20 次）；可以改用 Figma MCP 导出（extract 命令）',
    }[res.status]
    throw new Error(`Figma API 返回 ${res.status}${hint ? `：${hint}` : ''}\n${body.slice(0, 300)}`)
  }
  const data = await res.json()
  const entry = data.nodes && data.nodes[nodeId]
  if (!entry || !entry.document) throw new Error(`文件里没有节点 ${nodeId}`)
  const components = entry.components || {}
  const sets = entry.componentSets || {}

  const nameOf = id => {
    const c = components[id]
    if (!c) return null
    return c.componentSetId && sets[c.componentSetId] ? sets[c.componentSetId].name : c.name
  }

  const visit = (node, inInstance = false) => {
    if (node.visible === false || node.type === 'TEXT') return null
    const kids = []
    for (const child of node.children || []) {
      const v = visit(child, inInstance || node.type === 'INSTANCE')
      if (!v) continue
      // 实例内部的普通容器摊平，只保留实例层级
      if (node.type === 'INSTANCE' && !v.c) kids.push(...(v.k || []))
      else kids.push(v)
    }
    if (node.type === 'INSTANCE') {
      const c = nameOf(node.componentId)
      // 组件内部的图标已经体现在属性里（"@Icon/xxx"）；直接摆在设计稿里的图标保留
      if (inInstance && c && c.startsWith('Icon/')) return null
      const p = {}
      for (const [key, prop] of Object.entries(node.componentProperties || {})) {
        p[key.split('#')[0]] = prop.type === 'INSTANCE_SWAP' ? '@' + (nameOf(prop.value) || '?') : prop.value
      }
      const out = { c, p }
      if (kids.length) out.k = kids
      return out
    }
    if (!kids.length) return null
    return { n: node.name, k: kids }
  }

  return visit(entry.document)
}
