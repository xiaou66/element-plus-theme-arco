// figma=Icon/CircleClose
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-51
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/circle-close.svg
// component=CircleClose
import figma from 'figma'

const code = '<el-icon><CircleClose /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { CircleClose } from '@element-plus/icons-vue'"],
  id: 'icon-CircleClose',
  // Button / Input 等父模板通过 iconName 生成 :icon="CircleClose"
  metadata: { nestable: true, props: { code, iconName: 'CircleClose' } },
}
