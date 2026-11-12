// figma=Splitter
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=29-27
// source=https://element-plus.org/en-US/component/splitter.html
// component=ElSplitter
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-splitter>
  <el-splitter-panel>Panel 1</el-splitter-panel>
  <el-splitter-panel>Panel 2</el-splitter-panel>
</el-splitter>`

export default {
  example: figma.code`${code}`,
  id: 'el-splitter',
  metadata: { nestable: true, props: { code } },
}
