// figma=Result
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=22-126
// source=https://element-plus.org/en-US/component/result.html
// component=ElResult
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const icon = instance.getEnum('Icon', { Success: 'success', Warning: 'warning', Error: 'error', Info: 'info' })
let extra = ''
if (instance.getBoolean('Show extra')) {
  const btn = instance.findConnectedInstance('el-button')
  if (btn && btn.type === 'INSTANCE') extra = `\n  <template #extra>\n${ind(ind(btn.executeTemplate().metadata.props.code))}\n  </template>\n`
}
const head = `<el-result icon="${icon}" title="${instance.getString('Title')}" sub-title="${instance.getString('Sub title')}"`
const code = extra ? `${head}>${extra}</el-result>` : `${head} />`

export default {
  example: figma.code`${code}`,
  id: 'el-result',
  metadata: { nestable: true, props: { code } },
}
