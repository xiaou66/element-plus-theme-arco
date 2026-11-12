// figma=Icon/ZoomIn
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-318
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/zoom-in.svg
// component=ZoomIn
import figma from 'figma'

const code = '<el-icon><ZoomIn /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { ZoomIn } from '@element-plus/icons-vue'"],
  id: 'icon-ZoomIn',
  // Button / Input 等父模板通过 iconName 生成 :icon="ZoomIn"
  metadata: { nestable: true, props: { code, iconName: 'ZoomIn' } },
}
