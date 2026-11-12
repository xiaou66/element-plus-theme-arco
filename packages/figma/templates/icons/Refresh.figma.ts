// figma=Icon/Refresh
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-283
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/refresh.svg
// component=Refresh
import figma from 'figma'

const code = '<el-icon><Refresh /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Refresh } from '@element-plus/icons-vue'"],
  id: 'icon-Refresh',
  // Button / Input 等父模板通过 iconName 生成 :icon="Refresh"
  metadata: { nestable: true, props: { code, iconName: 'Refresh' } },
}
