// figma=Dropdown Item
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-53
// source=https://element-plus.org/en-US/component/dropdown.html
// component=ElDropdownItem
import figma from 'figma'
const instance = figma.selectedInstance

function iconOf(bool, swapProp) {
  if (!instance.getBoolean(bool)) return undefined
  const swap = instance.getInstanceSwap(swapProp)
  return swap && swap.type === 'INSTANCE' ? swap.executeTemplate().metadata.props.iconName : undefined
}
const label = instance.getString('Label')
const state = instance.getEnum('State', { Default: '', Hover: '', Disabled: 'disabled', Divided: 'divided' })
const icon = iconOf('Show icon', 'Icon')
let attrs = state ? ` ${state}` : ''
if (icon) attrs += ` :icon="${icon}"`
const code = `<el-dropdown-item${attrs}>${label}</el-dropdown-item>`

export default {
  example: figma.code`${code}`,
  imports: icon ? [`import { ${icon} } from '@element-plus/icons-vue'`] : [],
  id: 'el-dropdown-item',
  metadata: { nestable: true, props: { code } },
}
