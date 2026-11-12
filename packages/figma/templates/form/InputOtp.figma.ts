// figma=Input OTP
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=12-260
// source=https://element-plus.org/en-US/component/input-otp.html
// component=ElInputOtp
import figma from 'figma'
const instance = figma.selectedInstance

// Filled 对应 Arco VerificationCode；Outlined 是 EP 默认
const type = instance.getEnum('Type', { Filled: 'filled', Outlined: '', Underlined: 'underlined' })
const disabled = instance.getEnum('State', { Default: false, Focus: false, Disabled: true })
let attrs = ' v-model="code" :length="6"'
if (type) attrs += ` type="${type}"`
if (disabled) attrs += ' disabled'
const code = `<el-input-otp${attrs} />`

export default {
  example: figma.code`${code}`,
  id: 'el-input-otp',
  metadata: { nestable: true, props: { code } },
}
