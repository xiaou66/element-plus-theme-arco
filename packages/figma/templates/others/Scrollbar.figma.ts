// figma=Scrollbar
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=29-13
// source=https://element-plus.org/en-US/component/scrollbar.html
// component=ElScrollbar
import figma from 'figma'
const instance = figma.selectedInstance

instance.getEnum('Direction', { Vertical: '', Horizontal: '' })
instance.getEnum('State', { Default: '', Hover: '' })
const code = `<el-scrollbar height="400px">\n  <!-- scrollable content -->\n</el-scrollbar>`

export default {
  example: figma.code`${code}`,
  id: 'el-scrollbar',
  metadata: { nestable: true, props: { code } },
}
