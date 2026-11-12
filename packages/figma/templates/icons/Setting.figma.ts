// figma=Icon/Setting
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-223
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/setting.svg
// component=Setting
import figma from 'figma'

const code = '<el-icon><Setting /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Setting } from '@element-plus/icons-vue'"],
  id: 'icon-Setting',
  // Button / Input 等父模板通过 iconName 生成 :icon="Setting"
  metadata: { nestable: true, props: { code, iconName: 'Setting' } },
}
