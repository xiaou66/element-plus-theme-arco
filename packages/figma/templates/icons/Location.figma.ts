// figma=Icon/Location
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-262
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/location.svg
// component=Location
import figma from 'figma'

const code = '<el-icon><Location /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Location } from '@element-plus/icons-vue'"],
  id: 'icon-Location',
  // Button / Input 等父模板通过 iconName 生成 :icon="Location"
  metadata: { nestable: true, props: { code, iconName: 'Location' } },
}
