// figma=Step
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=26-133
// source=https://element-plus.org/en-US/component/steps.html
// component=ElStep
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const description = instance.getString('Description')
instance.getString('Number')
instance.getBoolean('Show line')
const status = instance.getEnum('Status', { Wait: 'wait', Process: 'process', Finish: 'finish', Success: 'success', Error: 'error' })
// 状态通常由 el-steps 的 active 推算；success / error 需要显式写 status
const explicit = status === 'success' || status === 'error'
const code = `<el-step title="${title}" description="${description}"${explicit ? ` status="${status}"` : ''} />`

export default {
  example: figma.code`${code}`,
  id: 'el-step',
  metadata: { nestable: true, props: { code, status } },
}
