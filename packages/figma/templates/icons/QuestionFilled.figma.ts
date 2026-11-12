// figma=Icon/QuestionFilled
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-311
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/question-filled.svg
// component=QuestionFilled
import figma from 'figma'

const code = '<el-icon><QuestionFilled /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { QuestionFilled } from '@element-plus/icons-vue'"],
  id: 'icon-QuestionFilled',
  // Button / Input 等父模板通过 iconName 生成 :icon="QuestionFilled"
  metadata: { nestable: true, props: { code, iconName: 'QuestionFilled' } },
}
