// figma=Checkbox
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=16-144
// source=https://element-plus.org/en-US/component/checkbox.html
// component=ElCheckbox
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const showLabel = instance.getBoolean('Show label')
const checked = instance.getEnum('Checked', { False: 'false', True: 'true', Indeterminate: 'indeterminate' })
const disabled = instance.getEnum('State', { Default: false, Hover: false, Disabled: true })
let attrs = ' v-model="checked"'
if (checked === 'indeterminate') attrs += ' indeterminate'
if (disabled) attrs += ' disabled'
const code = showLabel ? `<el-checkbox${attrs} label="${label}" />` : `<el-checkbox${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-checkbox',
  metadata: { nestable: true, props: { code, label, checked } },
}
