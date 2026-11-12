// figma=Text
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=8-147
// source=https://element-plus.org/en-US/component/text.html
// component=ElText
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const type = instance.getEnum('Type', { Default: '', Primary: 'primary', Success: 'success', Warning: 'warning', Danger: 'danger', Info: 'info' })
const size = instance.getEnum('Size', { Large: 'large', Default: '', Small: 'small' })
let attrs = ''
if (type) attrs += ` type="${type}"`
if (size) attrs += ` size="${size}"`
const code = `<el-text${attrs}>${label}</el-text>`

export default {
  example: figma.code`${code}`,
  id: 'el-text',
  metadata: { nestable: true, props: { code } },
}
