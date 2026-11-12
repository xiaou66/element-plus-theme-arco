// figma=Dropdown Trigger
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-86
// source=https://element-plus.org/en-US/component/dropdown.html
// component=ElDropdown
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const code = `<span class="el-dropdown-link">\n  ${label}\n  <el-icon class="el-icon--right"><ArrowDown /></el-icon>\n</span>`

export default {
  example: figma.code`${code}`,
  imports: [`import { ArrowDown } from '@element-plus/icons-vue'`],
  id: 'el-dropdown-trigger',
  metadata: { nestable: true, props: { code } },
}
