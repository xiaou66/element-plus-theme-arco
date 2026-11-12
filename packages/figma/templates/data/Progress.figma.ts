// figma=Progress
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=22-77
// source=https://element-plus.org/en-US/component/progress.html
// component=ElProgress
import figma from 'figma'
const instance = figma.selectedInstance

const circle = instance.getEnum('Type', { Line: false, Circle: true })
const status = instance.getEnum('Status', { Default: '', Success: 'success', Warning: 'warning', Exception: 'exception' })
let attrs = ' :percentage="60"'
if (circle) attrs += ' type="circle"'
if (status) attrs += ` status="${status}"`
const code = `<el-progress${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-progress',
  metadata: { nestable: true, props: { code } },
}
