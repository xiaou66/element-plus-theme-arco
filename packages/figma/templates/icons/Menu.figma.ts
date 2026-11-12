// figma=Icon/Menu
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-269
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/menu.svg
// component=Menu
import figma from 'figma'

const code = '<el-icon><Menu /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Menu } from '@element-plus/icons-vue'"],
  id: 'icon-Menu',
  // Button / Input 等父模板通过 iconName 生成 :icon="Menu"
  metadata: { nestable: true, props: { code, iconName: 'Menu' } },
}
