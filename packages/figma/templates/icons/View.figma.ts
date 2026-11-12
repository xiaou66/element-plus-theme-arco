// figma=Icon/View
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-237
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/view.svg
// component=View
import figma from 'figma'

const code = '<el-icon><View /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { View } from '@element-plus/icons-vue'"],
  id: 'icon-View',
  // Button / Input 等父模板通过 iconName 生成 :icon="View"
  metadata: { nestable: true, props: { code, iconName: 'View' } },
}
