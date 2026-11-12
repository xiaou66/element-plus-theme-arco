// figma=Icon/Top
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-332
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/top.svg
// component=Top
import figma from 'figma'

const code = '<el-icon><Top /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Top } from '@element-plus/icons-vue'"],
  id: 'icon-Top',
  // Button / Input 等父模板通过 iconName 生成 :icon="Top"
  metadata: { nestable: true, props: { code, iconName: 'Top' } },
}
