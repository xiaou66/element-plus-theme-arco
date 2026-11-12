// figma=Icon/Link
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-404
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/link.svg
// component=Link
import figma from 'figma'

const code = '<el-icon><Link /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Link } from '@element-plus/icons-vue'"],
  id: 'icon-Link',
  // Button / Input 等父模板通过 iconName 生成 :icon="Link"
  metadata: { nestable: true, props: { code, iconName: 'Link' } },
}
