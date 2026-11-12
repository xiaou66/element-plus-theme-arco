// figma=Icon/MoreFilled
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-166
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/more-filled.svg
// component=MoreFilled
import figma from 'figma'

const code = '<el-icon><MoreFilled /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { MoreFilled } from '@element-plus/icons-vue'"],
  id: 'icon-MoreFilled',
  // Button / Input 等父模板通过 iconName 生成 :icon="MoreFilled"
  metadata: { nestable: true, props: { code, iconName: 'MoreFilled' } },
}
