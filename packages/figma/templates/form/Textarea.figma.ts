// figma=Textarea
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=9-125
// source=https://element-plus.org/en-US/component/input.html
// component=ElInput
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('Value')
const disabled = instance.getEnum('State', { Default: false, Hover: false, Focus: false, Disabled: true, Error: false })
let attrs = ' v-model="textarea" type="textarea" :rows="3"'
if (placeholder) attrs += ` placeholder="${placeholder}"`
if (disabled) attrs += ' disabled'
if (instance.getBoolean('Word limit')) attrs += ' maxlength="200" show-word-limit'
const code = `<el-input${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-textarea',
  metadata: { nestable: true, props: { code } },
}
