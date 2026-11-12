// figma=Icon/InfoFilled
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-117
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/info-filled.svg
// component=InfoFilled
import figma from 'figma'

const code = '<el-icon><InfoFilled /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { InfoFilled } from '@element-plus/icons-vue'"],
  id: 'icon-InfoFilled',
  // Button / Input 等父模板通过 iconName 生成 :icon="InfoFilled"
  metadata: { nestable: true, props: { code, iconName: 'InfoFilled' } },
}
