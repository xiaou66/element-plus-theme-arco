// figma=Button
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=6-485
// source=https://element-plus.org/en-US/component/button.html
// component=ElButton
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const type = instance.getEnum('Type', { Default: '', Primary: 'primary', Success: 'success', Warning: 'warning', Danger: 'danger', Info: 'info' })
const style = instance.getEnum('Style', { Solid: '', Plain: 'plain', Dashed: 'dashed', Text: 'text', Link: 'link' })
// Hover / Active 是交互态，代码里没有对应属性
const disabled = instance.getEnum('State', { Default: false, Hover: false, Active: false, Disabled: true })
let icon
if (instance.getBoolean('Show icon')) {
  const swap = instance.getInstanceSwap('Icon')
  if (swap && swap.type === 'INSTANCE') icon = swap.executeTemplate().metadata.props.iconName
}

let attrs = ''
if (type) attrs += ` type="${type}"`
if (style) attrs += ` ${style}`
if (disabled) attrs += ' disabled'
if (icon) attrs += ` :icon="${icon}"`
const code = `<el-button${attrs}>${label}</el-button>`

export default {
  example: figma.code`${code}`,
  imports: icon ? [`import { ${icon} } from '@element-plus/icons-vue'`] : [],
  id: 'el-button',
  metadata: { nestable: true, props: { code, label } },
}
