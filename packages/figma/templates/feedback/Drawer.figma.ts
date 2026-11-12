// figma=Drawer
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=28-106
// source=https://element-plus.org/en-US/component/drawer.html
// component=ElDrawer
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const tag = 'el-drawer'
const title = instance.getString('Title')
const body = tag === 'el-dialog' ? instance.getString('Content') : '…'
let footer = ''
if (instance.getBoolean('Show footer')) {
  const buttons = instance.findConnectedInstances(n => n.codeConnectId() === 'el-button').map(n => n.executeTemplate().metadata.props)
  // 第一个按钮视为取消、最后一个视为确认
  const withEvents = buttons.map((p, i) => p.code.replace('<el-button', `<el-button @click="${i === buttons.length - 1 ? 'confirm' : 'visible = false'}"`))
  footer = `\n  <template #footer>\n${ind(ind(withEvents.join('\n')))}\n  </template>`
}
const width = tag === 'el-dialog' ? ' width="520"' : ''
const code = `<${tag} v-model="visible" title="${title}"${width}>\n  <span>${body}</span>${footer}\n</${tag}>`

export default {
  example: figma.code`${code}`,
  id: 'el-drawer',
  metadata: { nestable: true, props: { code } },
}
