// figma=Radio
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=16-177
// source=https://element-plus.org/en-US/component/radio.html
// component=ElRadio
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
instance.getEnum('Checked', { False: false, True: true })
const disabled = instance.getEnum('State', { Default: false, Hover: false, Disabled: true })
const code = `<el-radio v-model="radio" value="${label}"${disabled ? ' disabled' : ''}>${label}</el-radio>`

export default {
  example: figma.code`${code}`,
  id: 'el-radio',
  metadata: { nestable: true, props: { code } },
}
