// figma=Icon/Edit
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-181
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/edit.svg
// component=Edit
import figma from 'figma'

const code = '<el-icon><Edit /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Edit } from '@element-plus/icons-vue'"],
  id: 'icon-Edit',
  // Button / Input 等父模板通过 iconName 生成 :icon="Edit"
  metadata: { nestable: true, props: { code, iconName: 'Edit' } },
}
