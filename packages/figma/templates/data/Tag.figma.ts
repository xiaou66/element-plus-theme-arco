// figma=Tag
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=10-96
// source=https://element-plus.org/en-US/component/tag.html
// component=ElTag
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const type = instance.getEnum('Type', { Primary: 'primary', Success: 'success', Warning: 'warning', Danger: 'danger', Info: 'info' })
const effect = instance.getEnum('Effect', { Light: '', Dark: 'dark', Plain: 'plain' })
// Icon / Icon swap：el-tag 没有图标属性，图标需放在默认插槽里，这里不生成
let attrs = ` type="${type}"`
if (effect) attrs += ` effect="${effect}"`
if (instance.getBoolean('Closable')) attrs += ' closable'
const code = `<el-tag${attrs}>${label}</el-tag>`

export default {
  example: figma.code`${code}`,
  id: 'el-tag',
  metadata: { nestable: true, props: { code } },
}
