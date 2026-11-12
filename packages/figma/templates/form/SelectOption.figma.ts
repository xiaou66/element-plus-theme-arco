// figma=Select Option
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=15-81
// source=https://element-plus.org/en-US/component/select.html
// component=ElOption
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const disabled = instance.getEnum('State', { Default: false, Hover: false, Selected: false, Disabled: true })
instance.getEnum('Multiple', { False: false, True: true })
const code = `<el-option label="${label}" value="${label}"${disabled ? ' disabled' : ''} />`

export default {
  example: figma.code`${code}`,
  id: 'el-option',
  metadata: { nestable: true, props: { code } },
}
