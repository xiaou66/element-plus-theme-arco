// figma=Page Header
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=26-163
// source=https://element-plus.org/en-US/component/page-header.html
// component=ElPageHeader
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const subtitle = instance.getString('Subtitle')
const code = `<el-page-header @back="goBack">
  <template #content>
    <span>${title}</span>
    <el-text type="info" style="margin-left: 12px">${subtitle}</el-text>
  </template>
</el-page-header>`

export default {
  example: figma.code`${code}`,
  id: 'el-page-header',
  metadata: { nestable: true, props: { code } },
}
