// figma=Collapse
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=21-126
// source=https://element-plus.org/en-US/component/collapse.html
// component=ElCollapse
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const items = instance.findConnectedInstances(n => n.codeConnectId() === 'el-collapse-item').map(n => n.executeTemplate().metadata.props)
const open = items.filter(p => p.expanded).map(p => `'${p.name}'`)
const code = `<!-- activeNames initial value: [${open.join(', ')}] -->\n<el-collapse v-model="activeNames">\n${ind(items.map(p => p.code).join('\n'))}\n</el-collapse>`

export default {
  example: figma.code`${code}`,
  id: 'el-collapse',
  metadata: { nestable: true, props: { code } },
}
