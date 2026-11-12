// figma=Descriptions
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=21-204
// source=https://element-plus.org/en-US/component/descriptions.html
// component=ElDescriptions
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const border = instance.getEnum('Bordered', { False: false, True: true })
const code = `<el-descriptions title="${title}" :column="3"${border ? ' border' : ''}>
  <el-descriptions-item label="Name">Socrates</el-descriptions-item>
  <el-descriptions-item label="Mobile">123-1234-1234</el-descriptions-item>
  <el-descriptions-item label="Address">…</el-descriptions-item>
</el-descriptions>`

export default {
  example: figma.code`${code}`,
  id: 'el-descriptions',
  metadata: { nestable: true, props: { code } },
}
