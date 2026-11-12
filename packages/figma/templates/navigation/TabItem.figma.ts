// figma=Tab Item
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-229
// source=https://element-plus.org/en-US/component/tabs.html
// component=ElTabPane
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const type = instance.getEnum('Type', { Line: '', Card: 'card' })
const state = instance.getEnum('State', { Default: '', Hover: '', Active: 'active', Disabled: 'disabled' })
const name = label.toLowerCase().replace(/\s+/g, '-')
const code = `<el-tab-pane label="${label}" name="${name}"${state === 'disabled' ? ' disabled' : ''}>…</el-tab-pane>`

export default {
  example: figma.code`${code}`,
  id: 'el-tab-pane',
  metadata: { nestable: true, props: { code, name, type, active: state === 'active' } },
}
