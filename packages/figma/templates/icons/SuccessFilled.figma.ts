// figma=Icon/SuccessFilled
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-124
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/success-filled.svg
// component=SuccessFilled
import figma from 'figma'

const code = '<el-icon><SuccessFilled /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { SuccessFilled } from '@element-plus/icons-vue'"],
  id: 'icon-SuccessFilled',
  // Button / Input 等父模板通过 iconName 生成 :icon="SuccessFilled"
  metadata: { nestable: true, props: { code, iconName: 'SuccessFilled' } },
}
