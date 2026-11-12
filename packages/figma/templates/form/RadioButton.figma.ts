// figma=Radio Button
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=16-189
// source=https://element-plus.org/en-US/component/radio.html
// component=ElRadioButton
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const state = instance.getEnum('State', { Default: 'default', Hover: 'default', Checked: 'checked', Disabled: 'disabled', 'Disabled Checked': 'disabled-checked' })
const disabled = state === 'disabled' || state === 'disabled-checked'
const code = `<el-radio-button value="${label}"${disabled ? ' disabled' : ''}>${label}</el-radio-button>`

export default {
  example: figma.code`${code}`,
  id: 'el-radio-button',
  metadata: { nestable: true, props: { code, label, checked: state === 'checked' || state === 'disabled-checked' } },
}
