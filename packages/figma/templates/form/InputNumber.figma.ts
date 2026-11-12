// figma=Input Number
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=12-77
// source=https://element-plus.org/en-US/component/input-number.html
// component=ElInputNumber
import figma from 'figma'
const instance = figma.selectedInstance

const value = instance.getString('Value')
const right = instance.getEnum('Controls', { Both: false, Right: true })
const disabled = instance.getEnum('State', { Default: false, Hover: false, Focus: false, Disabled: true })
let attrs = ' v-model="num"'
if (right) attrs += ' controls-position="right"'
if (disabled) attrs += ' disabled'
const code = `<el-input-number${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-input-number',
  metadata: { nestable: true, props: { code, value } },
}
