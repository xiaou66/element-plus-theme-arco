// figma=Tabs Card
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-254
// source=https://element-plus.org/en-US/component/tabs.html
// component=ElTabs
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const tabs = instance.findConnectedInstances(n => n.codeConnectId() === 'el-tab-pane').map(n => n.executeTemplate().metadata.props)
const active = tabs.find(p => p.active)
const card = tabs.some(p => p.type === 'card')
const code = `<!-- activeName initial value: '${active ? active.name : ''}' -->\n<el-tabs v-model="activeName"${card ? ' type="card"' : ''}>\n${ind(tabs.map(p => p.code).join('\n'))}\n</el-tabs>`

export default {
  example: figma.code`${code}`,
  id: 'el-tabs-card',
  metadata: { nestable: true, props: { code } },
}
