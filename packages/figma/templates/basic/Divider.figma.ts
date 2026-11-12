// figma=Divider
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=8-189
// source=https://element-plus.org/en-US/component/divider.html
// component=ElDivider
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const vertical = instance.getEnum('Direction', { Horizontal: false, Vertical: true })
const position = instance.getEnum('Content', { None: '', Left: 'left', Center: 'center', Right: 'right' })
const dashed = instance.getEnum('Border', { Solid: false, Dashed: true })
let attrs = ''
if (vertical) attrs += ' direction="vertical"'
if (dashed) attrs += ' border-style="dashed"'
if (!vertical && position && position !== 'center') attrs += ` content-position="${position}"`
const code = !vertical && position ? `<el-divider${attrs}>${label}</el-divider>` : `<el-divider${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-divider',
  metadata: { nestable: true, props: { code } },
}
