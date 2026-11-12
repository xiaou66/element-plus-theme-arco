// figma=Icon/Minus
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-94
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/minus.svg
// component=Minus
import figma from 'figma'

const code = '<el-icon><Minus /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Minus } from '@element-plus/icons-vue'"],
  id: 'icon-Minus',
  // Button / Input 等父模板通过 iconName 生成 :icon="Minus"
  metadata: { nestable: true, props: { code, iconName: 'Minus' } },
}
