// figma=Button Shape
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=6-529
// source=https://element-plus.org/en-US/component/button.html
// component=ElButton
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const type = instance.getEnum('Type', { Default: '', Primary: 'primary', Success: 'success', Warning: 'warning', Danger: 'danger', Info: 'info' })
const shape = instance.getEnum('Shape', { Round: 'round', Circle: 'circle' })
let icon
const swap = instance.getInstanceSwap('Icon')
if (swap && swap.type === 'INSTANCE') icon = swap.executeTemplate().metadata.props.iconName

let attrs = type ? ` type="${type}"` : ''
attrs += ` ${shape}`
let code
if (shape === 'circle') code = `<el-button${attrs}${icon ? ` :icon="${icon}"` : ''} />`
else code = `<el-button${attrs}>${label}</el-button>`

export default {
  example: figma.code`${code}`,
  imports: shape === 'circle' && icon ? [`import { ${icon} } from '@element-plus/icons-vue'`] : [],
  id: 'el-button-shape',
  metadata: { nestable: true, props: { code } },
}
