// figma=Icon/Folder
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-347
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/folder.svg
// component=Folder
import figma from 'figma'

const code = '<el-icon><Folder /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Folder } from '@element-plus/icons-vue'"],
  id: 'icon-Folder',
  // Button / Input 等父模板通过 iconName 生成 :icon="Folder"
  metadata: { nestable: true, props: { code, iconName: 'Folder' } },
}
