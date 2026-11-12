// figma=Check Tag
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=10-118
// source=https://element-plus.org/en-US/component/tag.html
// component=ElCheckTag
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const checked = instance.getEnum('Checked', { False: false, True: true })
const type = instance.getEnum('Type', { Primary: 'primary', Success: 'success', Warning: 'warning', Danger: 'danger', Info: 'info' })
const code = `<el-check-tag :checked="${checked}" type="${type}" @change="onChange">${label}</el-check-tag>`

export default {
  example: figma.code`${code}`,
  id: 'el-check-tag',
  metadata: { nestable: true, props: { code } },
}
