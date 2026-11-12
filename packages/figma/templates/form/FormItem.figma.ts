// figma=Form Item
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=20-509
// source=https://element-plus.org/en-US/component/form.html
// component=ElFormItem
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const label = instance.getString('Label')
const top = instance.getEnum('Label Position', { Right: false, Top: true })
const state = instance.getEnum('State', { Default: '', Required: 'required', Error: 'error' })
// 内容槽里的控件（Input、Select……）用它自己的模板
const control = instance.findConnectedInstances(() => true)[0]
const inner = control ? control.executeTemplate().metadata.props.code : '<!-- form control -->'
let attrs = ` label="${label}" prop="${label.toLowerCase()}"`
if (top) attrs += ' label-position="top"'
if (state === 'required') attrs += ' required'
if (state === 'error') attrs += ` required error="${instance.getString('Error text')}"`
const code = `<el-form-item${attrs}>\n${ind(inner)}\n</el-form-item>`

export default {
  example: figma.code`${code}`,
  id: 'el-form-item',
  metadata: { nestable: true, props: { code } },
}
