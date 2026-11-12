// figma=Icon/CaretBottom
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-390
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/caret-bottom.svg
// component=CaretBottom
import figma from 'figma'

const code = '<el-icon><CaretBottom /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { CaretBottom } from '@element-plus/icons-vue'"],
  id: 'icon-CaretBottom',
  // Button / Input 等父模板通过 iconName 生成 :icon="CaretBottom"
  metadata: { nestable: true, props: { code, iconName: 'CaretBottom' } },
}
