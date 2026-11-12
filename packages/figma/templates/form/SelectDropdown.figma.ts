// figma=Select Dropdown
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=15-84
// source=https://element-plus.org/en-US/component/select.html
// component=ElSelect
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const options = instance
  .findConnectedInstances(n => n.codeConnectId() === 'el-option')
  .map(n => n.executeTemplate().metadata.props.code)
const code = `<el-select v-model="value" placeholder="Select">\n${ind(options.join('\n'))}\n</el-select>`

export default {
  example: figma.code`${code}`,
  id: 'el-select-dropdown',
  metadata: { nestable: true, props: { code } },
}
