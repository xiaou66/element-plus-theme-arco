// figma=Icon/HomeFilled
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-216
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/home-filled.svg
// component=HomeFilled
import figma from 'figma'

const code = '<el-icon><HomeFilled /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { HomeFilled } from '@element-plus/icons-vue'"],
  id: 'icon-HomeFilled',
  // Button / Input 等父模板通过 iconName 生成 :icon="HomeFilled"
  metadata: { nestable: true, props: { code, iconName: 'HomeFilled' } },
}
