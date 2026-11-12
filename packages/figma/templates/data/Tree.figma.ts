// figma=Tree
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=23-354
// source=https://element-plus.org/en-US/component/tree.html
// component=ElTree
import figma from 'figma'
const instance = figma.selectedInstance

const nodes = instance.findConnectedInstances(n => n.codeConnectId() === 'el-tree-node').map(n => n.executeTemplate().metadata.props)
const showCheckbox = nodes.some(p => p.showCheckbox)
const code = `<el-tree :data="data" node-key="id" highlight-current${showCheckbox ? ' show-checkbox' : ''} />`

export default {
  example: figma.code`${code}`,
  id: 'el-tree',
  metadata: { nestable: true, props: { code } },
}
