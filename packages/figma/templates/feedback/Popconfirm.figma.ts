// figma=Popconfirm
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=28-152
// source=https://element-plus.org/en-US/component/popconfirm.html
// component=ElPopconfirm
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-popconfirm title="${instance.getString('Title')}" confirm-button-text="Yes" cancel-button-text="No" @confirm="onConfirm">
  <template #reference>
    <el-button>Delete</el-button>
  </template>
</el-popconfirm>`

export default {
  example: figma.code`${code}`,
  id: 'el-popconfirm',
  metadata: { nestable: true, props: { code } },
}
