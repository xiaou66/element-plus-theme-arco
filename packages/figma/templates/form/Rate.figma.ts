// figma=Rate
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=17-214
// source=https://element-plus.org/en-US/component/rate.html
// component=ElRate
import figma from 'figma'
const instance = figma.selectedInstance

const value = instance.getEnum('Value', { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 })
const showText = instance.getBoolean('Show text')
const code = `<!-- rate initial value: ${value} -->\n<el-rate v-model="rate"${showText ? ' show-text' : ''} />`

export default {
  example: figma.code`${code}`,
  id: 'el-rate',
  metadata: { nestable: true, props: { code } },
}
