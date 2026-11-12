// figma=Icon/Sort
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-376
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/sort.svg
// component=Sort
import figma from 'figma'

const code = '<el-icon><Sort /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Sort } from '@element-plus/icons-vue'"],
  id: 'icon-Sort',
  // Button / Input 等父模板通过 iconName 生成 :icon="Sort"
  metadata: { nestable: true, props: { code, iconName: 'Sort' } },
}
