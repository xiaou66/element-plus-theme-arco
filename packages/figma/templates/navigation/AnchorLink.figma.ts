// figma=Anchor Link
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=26-183
// source=https://element-plus.org/en-US/component/anchor.html
// component=ElAnchorLink
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
instance.getEnum('State', { Default: '', Hover: '', Active: '' })
const code = `<el-anchor-link href="#${label.toLowerCase().replace(/\s+/g, '-')}" title="${label}" />`

export default {
  example: figma.code`${code}`,
  id: 'el-anchor-link',
  metadata: { nestable: true, props: { code } },
}
