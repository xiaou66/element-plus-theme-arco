// figma=Icon/CaretRight
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-397
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/caret-right.svg
// component=CaretRight
import figma from 'figma'

const code = '<el-icon><CaretRight /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { CaretRight } from '@element-plus/icons-vue'"],
  id: 'icon-CaretRight',
  // Button / Input 等父模板通过 iconName 生成 :icon="CaretRight"
  metadata: { nestable: true, props: { code, iconName: 'CaretRight' } },
}
