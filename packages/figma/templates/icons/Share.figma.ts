// figma=Icon/Share
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-276
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/share.svg
// component=Share
import figma from 'figma'

const code = '<el-icon><Share /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Share } from '@element-plus/icons-vue'"],
  id: 'icon-Share',
  // Button / Input 等父模板通过 iconName 生成 :icon="Share"
  metadata: { nestable: true, props: { code, iconName: 'Share' } },
}
