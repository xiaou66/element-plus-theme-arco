// figma=Input Tag
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=12-139
// source=https://element-plus.org/en-US/component/input-tag.html
// component=ElInputTag
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('Placeholder')
const disabled = instance.getEnum('State', { Default: false, Hover: false, Focus: false, Disabled: true })
const code = `<el-input-tag v-model="tags" placeholder="${placeholder}"${disabled ? ' disabled' : ''} />`

export default {
  example: figma.code`${code}`,
  id: 'el-input-tag',
  metadata: { nestable: true, props: { code } },
}
