// figma=Select
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=15-208
// source=https://element-plus.org/en-US/component/select.html
// component=ElSelect
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('Placeholder')
const selected = instance.getString('Selected')
const disabled = instance.getEnum('State', { Default: false, Hover: false, Focus: false, Disabled: true })
const multiple = instance.getEnum('Value', { Placeholder: false, Filled: false, Multiple: true })
let attrs = ' v-model="value"'
if (multiple) attrs += ' multiple'
if (placeholder) attrs += ` placeholder="${placeholder}"`
if (disabled) attrs += ' disabled'
// 选项由业务数据决定，用 v-for 渲染；已选值作为示例
const code = `<el-select${attrs}>\n  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />\n</el-select>`

export default {
  example: figma.code`${code}`,
  id: 'el-select',
  metadata: { nestable: true, props: { code, selected } },
}
