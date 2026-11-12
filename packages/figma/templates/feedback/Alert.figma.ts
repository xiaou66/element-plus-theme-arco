// figma=Alert
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=27-105
// source=https://element-plus.org/en-US/component/alert.html
// component=ElAlert
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const type = instance.getEnum('Type', { Primary: 'primary', Success: 'success', Warning: 'warning', Error: 'error', Info: 'info' })
const dark = instance.getEnum('Effect', { Light: false, Dark: true })
let attrs = ` title="${title}" type="${type}"`
if (dark) attrs += ' effect="dark"'
if (instance.getBoolean('Show description')) attrs += ` description="${instance.getString('Description')}"`
if (instance.getBoolean('Show icon')) attrs += ' show-icon'
if (!instance.getBoolean('Closable')) attrs += ' :closable="false"'
const code = `<el-alert${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-alert',
  metadata: { nestable: true, props: { code } },
}
