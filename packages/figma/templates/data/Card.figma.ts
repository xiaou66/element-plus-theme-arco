// figma=Card
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=21-104
// source=https://element-plus.org/en-US/component/card.html
// component=ElCard
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const content = instance.getString('Content')
const never = instance.getEnum('Shadow', { Never: true, Always: false })
const header = instance.getEnum('Header', { True: true, False: false })
let attrs = never ? ' shadow="never"' : ''
if (header) attrs += ` header="${title}"`
const code = `<el-card${attrs}>\n  <p>${content}</p>\n</el-card>`

export default {
  example: figma.code`${code}`,
  id: 'el-card',
  metadata: { nestable: true, props: { code } },
}
