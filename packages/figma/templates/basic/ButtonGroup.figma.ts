// figma=Button Group
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=32-703
// source=https://element-plus.org/en-US/component/button.html
// component=ElButtonGroup
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const buttons = instance
  .findConnectedInstances(n => n.codeConnectId() === 'el-button')
  .map(n => n.executeTemplate().metadata.props.code)
const code = `<el-button-group>\n${ind(buttons.join('\n'))}\n</el-button-group>`

export default {
  example: figma.code`${code}`,
  id: 'el-button-group',
  metadata: { nestable: true, props: { code } },
}
