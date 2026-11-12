// figma=Icon/Download
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-290
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/download.svg
// component=Download
import figma from 'figma'

const code = '<el-icon><Download /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Download } from '@element-plus/icons-vue'"],
  id: 'icon-Download',
  // Button / Input 等父模板通过 iconName 生成 :icon="Download"
  metadata: { nestable: true, props: { code, iconName: 'Download' } },
}
