// figma=Tour
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=28-179
// source=https://element-plus.org/en-US/component/tour.html
// component=ElTour
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-tour v-model="open">
  <el-tour-step :target="ref1?.$el" title="${instance.getString('Title')}" description="${instance.getString('Content')}" />
</el-tour>`

export default {
  example: figma.code`${code}`,
  id: 'el-tour',
  metadata: { nestable: true, props: { code } },
}
