// figma=Icon/Plus
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-87
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/plus.svg
// component=Plus
import figma from 'figma'

const code = '<el-icon><Plus /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Plus } from '@element-plus/icons-vue'"],
  id: 'icon-Plus',
  // Button / Input 等父模板通过 iconName 生成 :icon="Plus"
  metadata: { nestable: true, props: { code, iconName: 'Plus' } },
}
