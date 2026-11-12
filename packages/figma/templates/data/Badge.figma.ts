// figma=Badge
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=21-82
// source=https://element-plus.org/en-US/component/badge.html
// component=ElBadge
import figma from 'figma'
const instance = figma.selectedInstance

const value = instance.getString('Value')
const content = instance.getEnum('Content', { Number: 'number', Text: 'text', Dot: 'dot' })
const type = instance.getEnum('Type', { Danger: '', Primary: 'primary', Success: 'success', Warning: 'warning', Info: 'info' })
let attrs = ''
if (content === 'dot') attrs += ' is-dot'
else if (content === 'number') attrs += ` :value="${Number(value) || 0}"`
else attrs += ` value="${value}"`
if (type) attrs += ` type="${type}"`
const code = `<el-badge${attrs}>\n  <el-button>Comments</el-button>\n</el-badge>`

export default {
  example: figma.code`${code}`,
  id: 'el-badge',
  metadata: { nestable: true, props: { code } },
}
