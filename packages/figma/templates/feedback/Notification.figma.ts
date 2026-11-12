// figma=Notification
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=27-181
// source=https://element-plus.org/en-US/component/notification.html
// component=ElNotification
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', { None: '', Success: 'success', Warning: 'warning', Info: 'info', Error: 'error' })
const code = `ElNotification({\n  title: '${instance.getString('Title')}',\n  message: '${instance.getString('Content')}',${type ? `\n  type: '${type}',` : ''}\n})`

export default {
  example: figma.code`${code}`,
  imports: [`import { ElNotification } from 'element-plus'`],
  id: 'el-notification',
  metadata: { nestable: true, props: { code } },
}
