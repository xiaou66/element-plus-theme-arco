// figma=Icon/User
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-209
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/user.svg
// component=User
import figma from 'figma'

const code = '<el-icon><User /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { User } from '@element-plus/icons-vue'"],
  id: 'icon-User',
  // Button / Input 等父模板通过 iconName 生成 :icon="User"
  metadata: { nestable: true, props: { code, iconName: 'User' } },
}
