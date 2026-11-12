// figma=Menu Item Horizontal
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-179
// source=https://element-plus.org/en-US/component/menu.html
// component=ElMenuItem
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const state = instance.getEnum('State', { Default: '', Hover: '', Active: 'active', Disabled: 'disabled' })
const index = label.toLowerCase().replace(/\s+/g, '-')
const code = `<el-menu-item index="${index}"${state === 'disabled' ? ' disabled' : ''}>${label}</el-menu-item>`

export default {
  example: figma.code`${code}`,
  id: 'el-menu-item-horizontal',
  metadata: { nestable: true, props: { code, index, active: state === 'active' } },
}
