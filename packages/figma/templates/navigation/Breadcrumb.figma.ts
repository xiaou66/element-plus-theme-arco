// figma=Breadcrumb
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-16
// source=https://element-plus.org/en-US/component/breadcrumb.html
// component=ElBreadcrumb
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const items = instance.findConnectedInstances(n => n.codeConnectId() === 'el-breadcrumb-item').map(n => n.executeTemplate().metadata.props.code)
const sep = instance.findConnectedInstance('el-breadcrumb-separator')
const separator = sep && sep.type === 'INSTANCE' ? sep.executeTemplate().metadata.props.separator : '/'
const code = `<el-breadcrumb separator="${separator}">\n${ind(items.join('\n'))}\n</el-breadcrumb>`

export default {
  example: figma.code`${code}`,
  id: 'el-breadcrumb',
  metadata: { nestable: true, props: { code } },
}
