// figma=Icon/CircleCheckFilled
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-80
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/circle-check-filled.svg
// component=CircleCheckFilled
import figma from 'figma'

const code = '<el-icon><CircleCheckFilled /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { CircleCheckFilled } from '@element-plus/icons-vue'"],
  id: 'icon-CircleCheckFilled',
  // Button / Input 等父模板通过 iconName 生成 :icon="CircleCheckFilled"
  metadata: { nestable: true, props: { code, iconName: 'CircleCheckFilled' } },
}
