// figma=Statistic
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=22-147
// source=https://element-plus.org/en-US/component/statistic.html
// component=ElStatistic
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Title')
const value = Number(instance.getString('Value').replace(/[^\d.-]/g, '')) || 0
let attrs = ` title="${title}" :value="${value}"`
if (instance.getBoolean('Prefix')) attrs += ' prefix="$"'
if (instance.getBoolean('Suffix')) attrs += ' suffix="/ 100"'
const code = `<el-statistic${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-statistic',
  metadata: { nestable: true, props: { code } },
}
