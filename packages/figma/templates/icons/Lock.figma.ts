// figma=Icon/Lock
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-412
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/lock.svg
// component=Lock
import figma from 'figma'

const code = '<el-icon><Lock /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Lock } from '@element-plus/icons-vue'"],
  id: 'icon-Lock',
  // Button / Input 等父模板通过 iconName 生成 :icon="Lock"
  metadata: { nestable: true, props: { code, iconName: 'Lock' } },
}
