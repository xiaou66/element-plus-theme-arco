// figma=Loading
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=28-166
// source=https://element-plus.org/en-US/component/loading.html
// component=vLoading
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<div v-loading="loading" element-loading-text="${instance.getString('Text')}">\n  <!-- content under the mask -->\n</div>`

export default {
  example: figma.code`${code}`,
  id: 'el-loading',
  metadata: { nestable: true, props: { code } },
}
