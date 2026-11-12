// figma=Icon/Close
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-43
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/close.svg
// component=Close
import figma from 'figma'

const code = '<el-icon><Close /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Close } from '@element-plus/icons-vue'"],
  id: 'icon-Close',
  // Button / Input 等父模板通过 iconName 生成 :icon="Close"
  metadata: { nestable: true, props: { code, iconName: 'Close' } },
}
