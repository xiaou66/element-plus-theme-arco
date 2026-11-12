// figma=Date Picker Panel
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=18-246
// source=https://element-plus.org/en-US/component/date-picker-panel.html
// component=ElDatePickerPanel
import figma from 'figma'
const instance = figma.selectedInstance

const code = '<el-date-picker-panel v-model="date" />'

export default {
  example: figma.code`${code}`,
  id: 'el-date-picker-panel',
  metadata: { nestable: true, props: { code } },
}
