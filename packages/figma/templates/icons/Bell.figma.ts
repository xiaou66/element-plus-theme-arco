// figma=Icon/Bell
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-254
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/bell.svg
// component=Bell
import figma from 'figma'

const code = '<el-icon><Bell /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Bell } from '@element-plus/icons-vue'"],
  id: 'icon-Bell',
  // Button / Input 等父模板通过 iconName 生成 :icon="Bell"
  metadata: { nestable: true, props: { code, iconName: 'Bell' } },
}
