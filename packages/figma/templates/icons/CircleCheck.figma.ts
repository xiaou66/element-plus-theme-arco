// figma=Icon/CircleCheck
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-73
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/circle-check.svg
// component=CircleCheck
import figma from 'figma'

const code = '<el-icon><CircleCheck /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { CircleCheck } from '@element-plus/icons-vue'"],
  id: 'icon-CircleCheck',
  // Button / Input 等父模板通过 iconName 生成 :icon="CircleCheck"
  metadata: { nestable: true, props: { code, iconName: 'CircleCheck' } },
}
