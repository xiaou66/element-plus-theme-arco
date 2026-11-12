// figma=Input
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=9-89
// source=https://element-plus.org/en-US/component/input.html
// component=ElInput
import figma from 'figma'
const instance = figma.selectedInstance

const placeholder = instance.getString('Placeholder')
// Hover / Focus 是交互态；Error / Error Focus 由 el-form-item 校验失败产生，el-input 本身没有对应属性
const disabled = instance.getEnum('State', { Default: false, Hover: false, Focus: false, Disabled: true, Error: false, 'Error Focus': false })
// Value 变体只表示有无输入内容，代码里统一用 v-model；Text 是示例输入值，不生成代码
instance.getEnum('Value', { Placeholder: false, Filled: true })
function iconOf(bool, swapProp) {
  if (!instance.getBoolean(bool)) return undefined
  const swap = instance.getInstanceSwap(swapProp)
  return swap && swap.type === 'INSTANCE' ? swap.executeTemplate().metadata.props.iconName : undefined
}
const prefix = iconOf('Prefix icon', 'Prefix')
const suffix = iconOf('Suffix icon', 'Suffix')
const clearable = suffix === 'CircleCloseFilled' // 后缀是清除图标 = clearable

let attrs = ' v-model="input"'
if (placeholder) attrs += ` placeholder="${placeholder}"`
if (disabled) attrs += ' disabled'
if (clearable) attrs += ' clearable'
if (prefix) attrs += ` :prefix-icon="${prefix}"`
if (suffix && !clearable) attrs += ` :suffix-icon="${suffix}"`
if (instance.getBoolean('Word limit')) attrs += ' maxlength="20" show-word-limit'
const code = `<el-input${attrs} />`
const icons = [prefix, clearable ? undefined : suffix].filter(Boolean)

export default {
  example: figma.code`${code}`,
  imports: icons.length ? [`import { ${icons.join(', ')} } from '@element-plus/icons-vue'`] : [],
  id: 'el-input',
  metadata: { nestable: true, props: { code } },
}
