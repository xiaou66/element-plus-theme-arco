// figma=Tree Node
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=23-353
// source=https://element-plus.org/en-US/component/tree.html
// component=ElTree
import figma from 'figma'
const instance = figma.selectedInstance

instance.getString('Label')
instance.getEnum('Expand', { Collapsed: '', Expanded: '', Leaf: '' })
instance.getEnum('State', { Default: '', Hover: '', Current: '', Disabled: '' })
const showCheckbox = instance.getBoolean('Show checkbox')
const code = `<el-tree :data="data" node-key="id"${showCheckbox ? ' show-checkbox' : ''} />`

export default {
  example: figma.code`${code}`,
  id: 'el-tree-node',
  metadata: { nestable: true, props: { code, showCheckbox } },
}
