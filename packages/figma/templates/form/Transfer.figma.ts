// figma=Transfer
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=20-369
// source=https://element-plus.org/en-US/component/transfer.html
// component=ElTransfer
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-transfer v-model="value" :data="data" :titles="['List 1', 'List 2']" />`

export default {
  example: figma.code`${code}`,
  id: 'el-transfer',
  metadata: { nestable: true, props: { code } },
}
