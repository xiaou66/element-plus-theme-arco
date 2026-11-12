// figma=Input Group
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=9-108
// source=https://element-plus.org/en-US/component/input.html
// component=ElInput
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('Value')
const addon = instance.getEnum('Addon', { Prepend: 'prepend', Append: 'append', Both: 'both' })
let slots = ''
if (addon !== 'append') slots += `\n  <template #prepend>${instance.getString('Prepend')}</template>`
if (addon !== 'prepend') slots += `\n  <template #append>${instance.getString('Append')}</template>`
const code = `<el-input v-model="input" placeholder="${placeholder}">${slots}\n</el-input>`

export default {
  example: figma.code`${code}`,
  id: 'el-input-group',
  metadata: { nestable: true, props: { code } },
}
