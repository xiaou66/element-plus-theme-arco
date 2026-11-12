// figma=Avatar
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=21-53
// source=https://element-plus.org/en-US/component/avatar.html
// component=ElAvatar
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Text')
const square = instance.getEnum('Shape', { Circle: false, Square: true })
const content = instance.getEnum('Content', { Icon: 'icon', Text: 'text', Image: 'image' })
const size = instance.getEnum('Size', { Large: 'large', Default: '', Small: 'small' })
let attrs = ''
if (size) attrs += ` size="${size}"`
if (square) attrs += ' shape="square"'
let code
if (content === 'icon') code = `<el-avatar${attrs} :icon="UserFilled" />`
else if (content === 'image') code = `<el-avatar${attrs} :src="avatarUrl" />`
else code = `<el-avatar${attrs}>${text}</el-avatar>`

export default {
  example: figma.code`${code}`,
  imports: content === 'icon' ? [`import { UserFilled } from '@element-plus/icons-vue'`] : [],
  id: 'el-avatar',
  metadata: { nestable: true, props: { code, text, content } },
}
