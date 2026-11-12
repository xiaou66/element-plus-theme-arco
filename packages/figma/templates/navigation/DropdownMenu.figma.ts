// figma=Dropdown Menu
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-54
// source=https://element-plus.org/en-US/component/dropdown.html
// component=ElDropdown
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const items = instance.findConnectedInstances(n => n.codeConnectId() === 'el-dropdown-item').map(n => n.executeTemplate().metadata.props.code)
const code = `<el-dropdown>
  <span class="el-dropdown-link">
    Dropdown List<el-icon class="el-icon--right"><ArrowDown /></el-icon>
  </span>
  <template #dropdown>
    <el-dropdown-menu>
${ind(ind(ind(items.join('\n'))))}
    </el-dropdown-menu>
  </template>
</el-dropdown>`

export default {
  example: figma.code`${code}`,
  imports: [`import { ArrowDown } from '@element-plus/icons-vue'`],
  id: 'el-dropdown',
  metadata: { nestable: true, props: { code } },
}
