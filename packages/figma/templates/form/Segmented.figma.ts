// figma=Segmented
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=17-227
// source=https://element-plus.org/en-US/component/segmented.html
// component=ElSegmented
import figma from 'figma'
const instance = figma.selectedInstance

const items = instance.findConnectedInstances(n => n.codeConnectId() === 'el-segmented-item').map(n => n.executeTemplate().metadata.props)
const hasDisabled = items.some(p => p.state === 'disabled')
const opts = items.map(p => (hasDisabled ? `{ label: '${p.label}', value: '${p.label}'${p.state === 'disabled' ? ', disabled: true' : ''} }` : `'${p.label}'`))
const active = items.find(p => p.state === 'selected')
const code = `<!-- value initial value: '${active ? active.label : ''}' -->\n<el-segmented v-model="value" :options="[${opts.join(', ')}]" />`

export default {
  example: figma.code`${code}`,
  id: 'el-segmented',
  metadata: { nestable: true, props: { code } },
}
