// figma=Icon/Calendar
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-101
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/calendar.svg
// component=Calendar
import figma from 'figma'

const code = '<el-icon><Calendar /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Calendar } from '@element-plus/icons-vue'"],
  id: 'icon-Calendar',
  // Button / Input 等父模板通过 iconName 生成 :icon="Calendar"
  metadata: { nestable: true, props: { code, iconName: 'Calendar' } },
}
