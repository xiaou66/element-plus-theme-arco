// figma=Icon/More
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-173
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/more.svg
// component=More
import figma from 'figma'

const code = '<el-icon><More /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { More } from '@element-plus/icons-vue'"],
  id: 'icon-More',
  // Button / Input 等父模板通过 iconName 生成 :icon="More"
  metadata: { nestable: true, props: { code, iconName: 'More' } },
}
