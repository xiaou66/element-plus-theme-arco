// figma=Icon/Loading
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-145
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/loading.svg
// component=Loading
import figma from 'figma'

const code = '<el-icon><Loading /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Loading } from '@element-plus/icons-vue'"],
  id: 'icon-Loading',
  // Button / Input 等父模板通过 iconName 生成 :icon="Loading"
  metadata: { nestable: true, props: { code, iconName: 'Loading' } },
}
