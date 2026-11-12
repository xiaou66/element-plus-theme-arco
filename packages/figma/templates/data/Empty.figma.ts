// figma=Empty
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=21-208
// source=https://element-plus.org/en-US/component/empty.html
// component=ElEmpty
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-empty description="${instance.getString('Description')}" />`

export default {
  example: figma.code`${code}`,
  id: 'el-empty',
  metadata: { nestable: true, props: { code } },
}
