// figma=Icon/StarFilled
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-202
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/star-filled.svg
// component=StarFilled
import figma from 'figma'

const code = '<el-icon><StarFilled /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { StarFilled } from '@element-plus/icons-vue'"],
  id: 'icon-StarFilled',
  // Button / Input 等父模板通过 iconName 生成 :icon="StarFilled"
  metadata: { nestable: true, props: { code, iconName: 'StarFilled' } },
}
