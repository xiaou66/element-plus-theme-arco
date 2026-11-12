// figma=Switch
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=16-250
// source=https://element-plus.org/en-US/component/switch.html
// component=ElSwitch
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Size', { Default: '', Small: 'small', Large: 'large' })
instance.getEnum('Checked', { False: false, True: true })
const state = instance.getEnum('State', { Default: '', Disabled: 'disabled', Loading: 'loading' })
let attrs = ' v-model="enabled"'
if (size) attrs += ` size="${size}"`
if (state) attrs += ` ${state}`
const code = `<el-switch${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-switch',
  metadata: { nestable: true, props: { code } },
}
