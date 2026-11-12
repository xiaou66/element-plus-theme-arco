// figma=Icon/Message
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-355
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/message.svg
// component=Message
import figma from 'figma'

const code = '<el-icon><Message /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Message } from '@element-plus/icons-vue'"],
  id: 'icon-Message',
  // Button / Input 等父模板通过 iconName 生成 :icon="Message"
  metadata: { nestable: true, props: { code, iconName: 'Message' } },
}
