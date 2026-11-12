// figma=Icon/Check
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-65
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/check.svg
// component=Check
import figma from 'figma'

const code = '<el-icon><Check /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Check } from '@element-plus/icons-vue'"],
  id: 'icon-Check',
  // Button / Input 等父模板通过 iconName 生成 :icon="Check"
  metadata: { nestable: true, props: { code, iconName: 'Check' } },
}
