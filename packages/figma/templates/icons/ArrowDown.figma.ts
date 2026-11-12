// figma=Icon/ArrowDown
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-8
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/arrow-down.svg
// component=ArrowDown
import figma from 'figma'

const code = '<el-icon><ArrowDown /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { ArrowDown } from '@element-plus/icons-vue'"],
  id: 'icon-ArrowDown',
  // Button / Input 等父模板通过 iconName 生成 :icon="ArrowDown"
  metadata: { nestable: true, props: { code, iconName: 'ArrowDown' } },
}
