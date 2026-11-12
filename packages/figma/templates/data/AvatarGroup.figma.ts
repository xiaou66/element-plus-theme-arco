// figma=Avatar Group
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=32-981
// source=https://element-plus.org/en-US/component/avatar.html
// component=ElAvatarGroup
import figma from 'figma'
const instance = figma.selectedInstance

const ind = s => s.split('\n').map(l => '  ' + l).join('\n')
const all = instance.findConnectedInstances(n => n.codeConnectId() === 'el-avatar').map(n => n.executeTemplate().metadata.props)
// "+N" 文字头像是折叠计数，由 collapse-avatars 自动生成，不单独写
const avatars = all.filter(p => !(p.content === 'text' && /^\+\d+$/.test(p.text)))
const collapsed = all.length > avatars.length
const code = `<el-avatar-group${collapsed ? ` collapse-avatars :max-collapse-avatars="${avatars.length}"` : ''}>\n${ind(avatars.map(p => p.code).join('\n'))}\n</el-avatar-group>`

export default {
  example: figma.code`${code}`,
  id: 'el-avatar-group',
  metadata: { nestable: true, props: { code } },
}
