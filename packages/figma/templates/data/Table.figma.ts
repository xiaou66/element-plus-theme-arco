// figma=Table
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=23-235
// source=https://element-plus.org/en-US/component/table.html
// component=ElTable
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const border = instance.getEnum('Border', { False: false, True: true })
// 第一行（表头）的单元格就是列定义
const cols = instance.findConnectedInstances(n => n.codeConnectId() === 'el-table-column', { traverseInstances: false }).map(n => n.executeTemplate().metadata.props.code)
const code = `<el-table :data="tableData"${border ? ' border' : ''} style="width: 100%">\n${ind(cols.join('\n'))}\n</el-table>`

export default {
  example: figma.code`${code}`,
  id: 'el-table',
  metadata: { nestable: true, props: { code } },
}
