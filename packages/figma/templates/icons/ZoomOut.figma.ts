// figma=Icon/ZoomOut
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-325
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/zoom-out.svg
// component=ZoomOut
import figma from 'figma'

const code = '<el-icon><ZoomOut /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { ZoomOut } from '@element-plus/icons-vue'"],
  id: 'icon-ZoomOut',
  // Button / Input 等父模板通过 iconName 生成 :icon="ZoomOut"
  metadata: { nestable: true, props: { code, iconName: 'ZoomOut' } },
}
