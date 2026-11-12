// figma=Icon/DArrowRight
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-304
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/darrow-right.svg
// component=DArrowRight
import figma from 'figma'

const code = '<el-icon><DArrowRight /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { DArrowRight } from '@element-plus/icons-vue'"],
  id: 'icon-DArrowRight',
  // Button / Input 等父模板通过 iconName 生成 :icon="DArrowRight"
  metadata: { nestable: true, props: { code, iconName: 'DArrowRight' } },
}
