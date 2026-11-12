// figma=Icon/Upload
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-152
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/upload.svg
// component=Upload
import figma from 'figma'

const code = '<el-icon><Upload /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Upload } from '@element-plus/icons-vue'"],
  id: 'icon-Upload',
  // Button / Input 等父模板通过 iconName 生成 :icon="Upload"
  metadata: { nestable: true, props: { code, iconName: 'Upload' } },
}
