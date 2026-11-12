// figma=Icon/Phone
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-419
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/phone.svg
// component=Phone
import figma from 'figma'

const code = '<el-icon><Phone /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Phone } from '@element-plus/icons-vue'"],
  id: 'icon-Phone',
  // Button / Input 等父模板通过 iconName 生成 :icon="Phone"
  metadata: { nestable: true, props: { code, iconName: 'Phone' } },
}
