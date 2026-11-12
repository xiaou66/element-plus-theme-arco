// figma=Icon/Warning
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-138
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/warning.svg
// component=Warning
import figma from 'figma'

const code = '<el-icon><Warning /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Warning } from '@element-plus/icons-vue'"],
  id: 'icon-Warning',
  // Button / Input 等父模板通过 iconName 生成 :icon="Warning"
  metadata: { nestable: true, props: { code, iconName: 'Warning' } },
}
