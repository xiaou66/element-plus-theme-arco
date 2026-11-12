// figma=Icon/CircleCloseFilled
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-58
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/circle-close-filled.svg
// component=CircleCloseFilled
import figma from 'figma'

const code = '<el-icon><CircleCloseFilled /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { CircleCloseFilled } from '@element-plus/icons-vue'"],
  id: 'icon-CircleCloseFilled',
  // Button / Input 等父模板通过 iconName 生成 :icon="CircleCloseFilled"
  metadata: { nestable: true, props: { code, iconName: 'CircleCloseFilled' } },
}
