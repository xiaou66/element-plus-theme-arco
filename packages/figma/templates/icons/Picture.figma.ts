// figma=Icon/Picture
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-245
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/picture.svg
// component=Picture
import figma from 'figma'

const code = '<el-icon><Picture /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Picture } from '@element-plus/icons-vue'"],
  id: 'icon-Picture',
  // Button / Input 等父模板通过 iconName 生成 :icon="Picture"
  metadata: { nestable: true, props: { code, iconName: 'Picture' } },
}
