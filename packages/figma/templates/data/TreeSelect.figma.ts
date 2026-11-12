// figma=Tree Select
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=23-434
// source=https://element-plus.org/en-US/component/tree-select.html
// component=ElTreeSelect
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-tree-select v-model="value" :data="data" :render-after-expand="false" placeholder="Select" />`

export default {
  example: figma.code`${code}`,
  id: 'el-tree-select',
  metadata: { nestable: true, props: { code } },
}
