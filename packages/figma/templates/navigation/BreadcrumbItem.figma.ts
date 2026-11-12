// figma=Breadcrumb Item
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-13
// source=https://element-plus.org/en-US/component/breadcrumb.html
// component=ElBreadcrumbItem
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const state = instance.getEnum('State', { Default: 'text', Link: 'link', Hover: 'link', Current: 'current' })
const code = state === 'link' ? `<el-breadcrumb-item :to="{ path: '/' }">${label}</el-breadcrumb-item>` : `<el-breadcrumb-item>${label}</el-breadcrumb-item>`

export default {
  example: figma.code`${code}`,
  id: 'el-breadcrumb-item',
  metadata: { nestable: true, props: { code } },
}
