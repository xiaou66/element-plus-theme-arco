// figma=Popover
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=28-140
// source=https://element-plus.org/en-US/component/popover.html
// component=ElPopover
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-popover placement="top" title="${instance.getString('Title')}" :width="200" trigger="hover" content="${instance.getString('Content')}">
  <template #reference>
    <el-button>Hover me</el-button>
  </template>
</el-popover>`

export default {
  example: figma.code`${code}`,
  id: 'el-popover',
  metadata: { nestable: true, props: { code } },
}
