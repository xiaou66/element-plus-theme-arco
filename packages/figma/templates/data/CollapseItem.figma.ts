// figma=Collapse Item
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=21-125
// source=https://element-plus.org/en-US/component/collapse.html
// component=ElCollapseItem
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const state = instance.getEnum('State', { Collapsed: 'collapsed', Expanded: 'expanded', Disabled: 'disabled' })
const name = title.toLowerCase().replace(/\s+/g, '-')
const code = `<el-collapse-item title="${title}" name="${name}"${state === 'disabled' ? ' disabled' : ''}>\n  <div>…</div>\n</el-collapse-item>`

export default {
  example: figma.code`${code}`,
  id: 'el-collapse-item',
  metadata: { nestable: true, props: { code, name, expanded: state === 'expanded' } },
}
