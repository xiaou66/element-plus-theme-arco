// figma=Date Picker
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=18-212
// source=https://element-plus.org/en-US/component/date-picker.html
// component=ElDatePicker
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', { Date: 'date', Range: 'range', Time: 'time' })
const disabled = instance.getEnum('State', { Default: false, Hover: false, Focus: false, Disabled: true })
const dis = disabled ? ' disabled' : ''
let code
if (type === 'date') code = `<el-date-picker v-model="date" type="date" placeholder="${instance.getString('Value')}"${dis} />`
else if (type === 'range')
  code = `<el-date-picker v-model="range" type="daterange" range-separator="-" start-placeholder="${instance.getString('Start')}" end-placeholder="${instance.getString('End')}"${dis} />`
else code = `<el-time-picker v-model="time" placeholder="Select time"${dis} />`

export default {
  example: figma.code`${code}`,
  id: 'el-date-picker',
  metadata: { nestable: true, props: { code } },
}
