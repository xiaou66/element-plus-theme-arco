// figma=Tooltip
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=28-151
// source=https://element-plus.org/en-US/component/tooltip.html
// component=ElTooltip
import figma from 'figma'
const instance = figma.selectedInstance

const light = instance.getEnum('Effect', { Dark: false, Light: true })
const code = `<el-tooltip content="${instance.getString('Content')}" placement="top"${light ? ' effect="light"' : ''}>\n  <el-button>Hover me</el-button>\n</el-tooltip>`

export default {
  example: figma.code`${code}`,
  id: 'el-tooltip',
  metadata: { nestable: true, props: { code } },
}
