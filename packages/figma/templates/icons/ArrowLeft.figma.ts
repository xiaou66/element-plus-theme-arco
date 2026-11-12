// figma=Icon/ArrowLeft
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-22
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/arrow-left.svg
// component=ArrowLeft
import figma from 'figma'

const code = '<el-icon><ArrowLeft /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { ArrowLeft } from '@element-plus/icons-vue'"],
  id: 'icon-ArrowLeft',
  // Button / Input 等父模板通过 iconName 生成 :icon="ArrowLeft"
  metadata: { nestable: true, props: { code, iconName: 'ArrowLeft' } },
}
