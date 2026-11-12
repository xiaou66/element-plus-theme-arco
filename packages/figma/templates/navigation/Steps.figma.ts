// figma=Steps
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=26-134
// source=https://element-plus.org/en-US/component/steps.html
// component=ElSteps
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const steps = instance.findConnectedInstances(n => n.codeConnectId() === 'el-step').map(n => n.executeTemplate().metadata.props)
let active = steps.findIndex(p => p.status === 'process')
if (active < 0) active = steps.filter(p => p.status === 'finish' || p.status === 'success').length
const code = `<el-steps :active="${active}">\n${ind(steps.map(p => p.code).join('\n'))}\n</el-steps>`

export default {
  example: figma.code`${code}`,
  id: 'el-steps',
  metadata: { nestable: true, props: { code } },
}
