// figma=Icon/Star
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-195
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/star.svg
// component=Star
import figma from 'figma'

const code = '<el-icon><Star /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Star } from '@element-plus/icons-vue'"],
  id: 'icon-Star',
  // Button / Input 等父模板通过 iconName 生成 :icon="Star"
  metadata: { nestable: true, props: { code, iconName: 'Star' } },
}
