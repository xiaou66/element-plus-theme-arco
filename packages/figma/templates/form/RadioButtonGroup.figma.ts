// figma=Radio Button Group
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=16-190
// source=https://element-plus.org/en-US/component/radio.html
// component=ElRadioGroup
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const items = instance.findConnectedInstances(n => n.codeConnectId() === 'el-radio-button').map(n => n.executeTemplate().metadata.props)
const active = items.find(p => p.checked)
const code = `<!-- radio initial value: ${active ? active.label : 'none'} -->\n<el-radio-group v-model="radio">\n${ind(items.map(p => p.code).join('\n'))}\n</el-radio-group>`

export default {
  example: figma.code`${code}`,
  id: 'el-radio-group',
  metadata: { nestable: true, props: { code } },
}
