// figma=Menu Horizontal
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-180
// source=https://element-plus.org/en-US/component/menu.html
// component=ElMenu
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const items = instance.findConnectedInstances(n => n.codeConnectId() === 'el-menu-item-horizontal').map(n => n.executeTemplate().metadata.props)
const active = items.find(p => p.active)
const code = `<el-menu mode="horizontal"${active ? ` default-active="${active.index}"` : ''} :ellipsis="false">\n${ind(items.map(p => p.code).join('\n'))}\n</el-menu>`

export default {
  example: figma.code`${code}`,
  id: 'el-menu-horizontal',
  metadata: { nestable: true, props: { code } },
}
