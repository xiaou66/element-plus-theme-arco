// figma=Anchor
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=26-184
// source=https://element-plus.org/en-US/component/anchor.html
// component=ElAnchor
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const links = instance.findConnectedInstances(n => n.codeConnectId() === 'el-anchor-link').map(n => n.executeTemplate().metadata.props.code)
const code = `<el-anchor :offset="70">\n${ind(links.join('\n'))}\n</el-anchor>`

export default {
  example: figma.code`${code}`,
  id: 'el-anchor',
  metadata: { nestable: true, props: { code } },
}
