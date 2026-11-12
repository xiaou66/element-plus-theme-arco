// figma=Icon/Back
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-340
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/back.svg
// component=Back
import figma from 'figma'

const code = '<el-icon><Back /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Back } from '@element-plus/icons-vue'"],
  id: 'icon-Back',
  // Button / Input 等父模板通过 iconName 生成 :icon="Back"
  metadata: { nestable: true, props: { code, iconName: 'Back' } },
}
