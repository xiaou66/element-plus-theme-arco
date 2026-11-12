// figma=Icon/Grid
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-362
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/grid.svg
// component=Grid
import figma from 'figma'

const code = '<el-icon><Grid /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Grid } from '@element-plus/icons-vue'"],
  id: 'icon-Grid',
  // Button / Input 等父模板通过 iconName 生成 :icon="Grid"
  metadata: { nestable: true, props: { code, iconName: 'Grid' } },
}
