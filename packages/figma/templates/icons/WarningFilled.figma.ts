// figma=Icon/WarningFilled
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-131
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/warning-filled.svg
// component=WarningFilled
import figma from 'figma'

const code = '<el-icon><WarningFilled /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { WarningFilled } from '@element-plus/icons-vue'"],
  id: 'icon-WarningFilled',
  // Button / Input 等父模板通过 iconName 生成 :icon="WarningFilled"
  metadata: { nestable: true, props: { code, iconName: 'WarningFilled' } },
}
