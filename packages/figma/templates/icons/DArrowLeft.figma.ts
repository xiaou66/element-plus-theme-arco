// figma=Icon/DArrowLeft
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-297
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/darrow-left.svg
// component=DArrowLeft
import figma from 'figma'

const code = '<el-icon><DArrowLeft /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { DArrowLeft } from '@element-plus/icons-vue'"],
  id: 'icon-DArrowLeft',
  // Button / Input 等父模板通过 iconName 生成 :icon="DArrowLeft"
  metadata: { nestable: true, props: { code, iconName: 'DArrowLeft' } },
}
