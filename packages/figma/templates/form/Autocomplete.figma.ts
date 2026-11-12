// figma=Autocomplete
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=19-353
// source=https://element-plus.org/en-US/component/autocomplete.html
// component=ElAutocomplete
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-autocomplete v-model="value" :fetch-suggestions="querySearch" placeholder="Please input" />`

export default {
  example: figma.code`${code}`,
  id: 'el-autocomplete',
  metadata: { nestable: true, props: { code } },
}
