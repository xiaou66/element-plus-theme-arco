// figma=Message Box
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=27-270
// source=https://element-plus.org/en-US/component/message-box.html
// component=ElMessageBox
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', { None: '', Success: 'success', Warning: 'warning', Info: 'info', Error: 'error' })
const code = `ElMessageBox.confirm('${instance.getString('Content')}', '${instance.getString('Title')}', {
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',${type ? `\n  type: '${type}',` : ''}
})`

export default {
  example: figma.code`${code}`,
  imports: [`import { ElMessageBox } from 'element-plus'`],
  id: 'el-message-box',
  metadata: { nestable: true, props: { code } },
}
