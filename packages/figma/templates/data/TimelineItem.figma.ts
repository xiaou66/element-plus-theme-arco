// figma=Timeline Item
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=22-226
// source=https://element-plus.org/en-US/component/timeline.html
// component=ElTimelineItem
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Size', { Normal: '', Large: 'large' })
const type = instance.getEnum('Type', { Primary: 'primary', Success: 'success', Warning: 'warning', Danger: 'danger', Info: 'info' })
instance.getBoolean('Show tail')
let attrs = ` timestamp="${instance.getString('Timestamp')}" type="${type}"`
if (size) attrs += ` size="${size}"`
const code = `<el-timeline-item${attrs}>${instance.getString('Content')}</el-timeline-item>`

export default {
  example: figma.code`${code}`,
  id: 'el-timeline-item',
  metadata: { nestable: true, props: { code } },
}
