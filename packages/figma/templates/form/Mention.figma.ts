// figma=Mention
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=19-376
// source=https://element-plus.org/en-US/component/mention.html
// component=ElMention
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-mention v-model="value" type="textarea" :options="options" placeholder="Please input" />`

export default {
  example: figma.code`${code}`,
  id: 'el-mention',
  metadata: { nestable: true, props: { code } },
}
