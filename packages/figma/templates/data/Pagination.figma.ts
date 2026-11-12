// figma=Pagination
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=24-282
// source=https://element-plus.org/en-US/component/pagination.html
// component=ElPagination
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-pagination v-model:current-page="page" v-model:page-size="pageSize" layout="total, prev, pager, next, sizes, jumper" :total="100" />`

export default {
  example: figma.code`${code}`,
  id: 'el-pagination',
  metadata: { nestable: true, props: { code } },
}
