// figma=Link
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=8-107
// source=https://element-plus.org/en-US/component/link.html
// component=ElLink
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const type = instance.getEnum('Type', { Default: '', Primary: 'primary', Success: 'success', Warning: 'warning', Danger: 'danger', Info: 'info' })
const disabled = instance.getEnum('State', { Default: false, Hover: false, Active: false, Disabled: true })
let icon
if (instance.getBoolean('Show icon')) {
  const swap = instance.getInstanceSwap('Icon')
  if (swap && swap.type === 'INSTANCE') icon = swap.executeTemplate().metadata.props.iconName
}
let attrs = ''
if (type) attrs += ` type="${type}"`
if (disabled) attrs += ' disabled'
if (icon) attrs += ` :icon="${icon}"`
const code = `<el-link${attrs}>${label}</el-link>`

export default {
  example: figma.code`${code}`,
  imports: icon ? [`import { ${icon} } from '@element-plus/icons-vue'`] : [],
  id: 'el-link',
  metadata: { nestable: true, props: { code } },
}
