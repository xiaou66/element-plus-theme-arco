// figma=Cascader Panel
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=19-289
// source=https://element-plus.org/en-US/component/cascader.html
// component=ElCascaderPanel
import figma from 'figma'
const instance = figma.selectedInstance

// 选项由业务数据决定；设计稿里的节点只是示例
const code = '<el-cascader-panel v-model="value" :options="options" />'

export default {
  example: figma.code`${code}`,
  id: 'el-cascader-panel',
  metadata: { nestable: true, props: { code } },
}
