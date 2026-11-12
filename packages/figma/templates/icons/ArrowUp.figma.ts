// figma=Icon/ArrowUp
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-15
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/arrow-up.svg
// component=ArrowUp
import figma from 'figma'

const code = '<el-icon><ArrowUp /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { ArrowUp } from '@element-plus/icons-vue'"],
  id: 'icon-ArrowUp',
  // Button / Input 等父模板通过 iconName 生成 :icon="ArrowUp"
  metadata: { nestable: true, props: { code, iconName: 'ArrowUp' } },
}
