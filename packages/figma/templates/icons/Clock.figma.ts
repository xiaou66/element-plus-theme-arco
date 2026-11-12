// figma=Icon/Clock
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-110
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/clock.svg
// component=Clock
import figma from 'figma'

const code = '<el-icon><Clock /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Clock } from '@element-plus/icons-vue'"],
  id: 'icon-Clock',
  // Button / Input 等父模板通过 iconName 生成 :icon="Clock"
  metadata: { nestable: true, props: { code, iconName: 'Clock' } },
}
