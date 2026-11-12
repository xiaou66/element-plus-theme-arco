// figma=Menu Item
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-134
// source=https://element-plus.org/en-US/component/menu.html
// component=ElMenuItem
import figma from 'figma'
const instance = figma.selectedInstance

function iconOf(bool, swapProp) {
  if (!instance.getBoolean(bool)) return undefined
  const swap = instance.getInstanceSwap(swapProp)
  return swap && swap.type === 'INSTANCE' ? swap.executeTemplate().metadata.props.iconName : undefined
}
const label = instance.getString('Label')
const sub = instance.getEnum('Type', { Item: false, Submenu: true })
const state = instance.getEnum('State', { Default: '', Hover: '', Active: 'active', Disabled: 'disabled' })
const icon = iconOf('Show icon', 'Icon')
const index = label.toLowerCase().replace(/\s+/g, '-')
const iconCode = icon ? `<el-icon><${icon} /></el-icon>` : ''
const dis = state === 'disabled' ? ' disabled' : ''
const code = sub
  ? `<el-sub-menu index="${index}"${dis}>\n  <template #title>${iconCode}<span>${label}</span></template>\n  <!-- sub menu items -->\n</el-sub-menu>`
  : `<el-menu-item index="${index}"${dis}>${iconCode}<span>${label}</span></el-menu-item>`

export default {
  example: figma.code`${code}`,
  imports: icon ? [`import { ${icon} } from '@element-plus/icons-vue'`] : [],
  id: 'el-menu-item',
  metadata: { nestable: true, props: { code, index, active: state === 'active' } },
}
