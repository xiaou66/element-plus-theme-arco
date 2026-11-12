// figma=Table Header Cell
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=23-75
// source=https://element-plus.org/en-US/component/table.html
// component=ElTableColumn
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const type = instance.getEnum('Type', { Text: 'text', Sortable: 'sortable', Selection: 'selection' })
let code
if (type === 'selection') code = `<el-table-column type="selection" width="55" />`
else code = `<el-table-column prop="${label.toLowerCase().replace(/\s+/g, '_')}" label="${label}"${type === 'sortable' ? ' sortable' : ''} />`

export default {
  example: figma.code`${code}`,
  id: 'el-table-column',
  metadata: { nestable: true, props: { code } },
}
