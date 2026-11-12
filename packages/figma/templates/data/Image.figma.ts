// figma=Image
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=22-241
// source=https://element-plus.org/en-US/component/image.html
// component=ElImage
import figma from 'figma'
const instance = figma.selectedInstance

instance.getEnum('State', { Loaded: '', Placeholder: '', Error: '' })
const code = `<el-image :src="url" fit="cover" style="width: 160px; height: 120px" />`

export default {
  example: figma.code`${code}`,
  id: 'el-image',
  metadata: { nestable: true, props: { code } },
}
