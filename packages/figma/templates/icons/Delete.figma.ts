// figma=Icon/Delete
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-188
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/delete.svg
// component=Delete
import figma from 'figma'

const code = '<el-icon><Delete /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Delete } from '@element-plus/icons-vue'"],
  id: 'icon-Delete',
  // Button / Input 等父模板通过 iconName 生成 :icon="Delete"
  metadata: { nestable: true, props: { code, iconName: 'Delete' } },
}
