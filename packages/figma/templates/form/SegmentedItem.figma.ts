// figma=Segmented Item
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=17-226
// source=https://element-plus.org/en-US/component/segmented.html
// component=ElSegmented
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const state = instance.getEnum('State', { Default: 'default', Hover: 'default', Selected: 'selected', Disabled: 'disabled' })
const code = `'${label}'`

export default {
  example: figma.code`${code}`,
  id: 'el-segmented-item',
  metadata: { nestable: true, props: { code, label, state } },
}
