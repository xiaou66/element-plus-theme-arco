// figma=Backtop
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=26-212
// source=https://element-plus.org/en-US/component/backtop.html
// component=ElBacktop
import figma from 'figma'
const instance = figma.selectedInstance

instance.getEnum('State', { Default: '', Hover: '' })
const code = `<el-backtop :right="40" :bottom="40" />`

export default {
  example: figma.code`${code}`,
  id: 'el-backtop',
  metadata: { nestable: true, props: { code } },
}
