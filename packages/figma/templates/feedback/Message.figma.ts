// figma=Message
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=27-139
// source=https://element-plus.org/en-US/component/message.html
// component=ElMessage
import figma from 'figma'
const instance = figma.selectedInstance

const message = instance.getString('Message')
const type = instance.getEnum('Type', { Primary: 'primary', Success: 'success', Warning: 'warning', Error: 'error', Info: 'info' })
const showClose = instance.getBoolean('Show close')
const code = `ElMessage({ message: '${message}', type: '${type}'${showClose ? ', showClose: true' : ''} })`

export default {
  example: figma.code`${code}`,
  imports: [`import { ElMessage } from 'element-plus'`],
  id: 'el-message',
  metadata: { nestable: true, props: { code } },
}
