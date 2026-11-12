// figma=Calendar
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=24-337
// source=https://element-plus.org/en-US/component/calendar.html
// component=ElCalendar
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-calendar v-model="date" />`

export default {
  example: figma.code`${code}`,
  id: 'el-calendar',
  metadata: { nestable: true, props: { code } },
}
