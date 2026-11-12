// figma=Breadcrumb Separator
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=25-14
// source=https://element-plus.org/en-US/component/breadcrumb.html
// component=ElBreadcrumb
import figma from 'figma'
const instance = figma.selectedInstance

const separator = instance.getString('Separator')
const code = separator

export default {
  example: figma.code`${code}`,
  id: 'el-breadcrumb-separator',
  metadata: { nestable: true, props: { code, separator } },
}
