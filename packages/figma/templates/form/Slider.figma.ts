// figma=Slider
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=17-138
// source=https://element-plus.org/en-US/component/slider.html
// component=ElSlider
import figma from 'figma'
const instance = figma.selectedInstance

const range = instance.getEnum('Range', { False: false, True: true })
const disabled = instance.getEnum('State', { Default: false, Hover: false, Disabled: true })
let attrs = range ? ' v-model="range" range' : ' v-model="value"'
if (disabled) attrs += ' disabled'
const code = `<el-slider${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-slider',
  metadata: { nestable: true, props: { code } },
}
