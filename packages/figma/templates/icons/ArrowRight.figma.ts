// figma=Icon/ArrowRight
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-29
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/arrow-right.svg
// component=ArrowRight
import figma from 'figma'

const code = '<el-icon><ArrowRight /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { ArrowRight } from '@element-plus/icons-vue'"],
  id: 'icon-ArrowRight',
  // Button / Input 等父模板通过 iconName 生成 :icon="ArrowRight"
  metadata: { nestable: true, props: { code, iconName: 'ArrowRight' } },
}
