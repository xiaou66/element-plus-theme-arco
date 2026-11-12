// figma=Icon/CaretTop
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-383
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/caret-top.svg
// component=CaretTop
import figma from 'figma'

const code = '<el-icon><CaretTop /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { CaretTop } from '@element-plus/icons-vue'"],
  id: 'icon-CaretTop',
  // Button / Input 等父模板通过 iconName 生成 :icon="CaretTop"
  metadata: { nestable: true, props: { code, iconName: 'CaretTop' } },
}
