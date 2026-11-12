// figma=Color Picker
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=17-252
// source=https://element-plus.org/en-US/component/color-picker.html
// component=ElColorPicker
import figma from 'figma'
const instance = figma.selectedInstance

const state = instance.getEnum('State', { Default: '', Hover: '', Disabled: 'disabled', Empty: '' })
const code = `<el-color-picker v-model="color"${state ? ' disabled' : ''} />`

export default {
  example: figma.code`${code}`,
  id: 'el-color-picker',
  metadata: { nestable: true, props: { code } },
}
