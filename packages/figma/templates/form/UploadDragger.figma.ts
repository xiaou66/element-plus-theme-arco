// figma=Upload Dragger
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=19-423
// source=https://element-plus.org/en-US/component/upload.html
// component=ElUpload
import figma from 'figma'
const instance = figma.selectedInstance

const disabled = instance.getEnum('State', { Default: false, Hover: false, 'Drag Over': false, Disabled: true })
const code = `<el-upload drag action="#" multiple${disabled ? ' disabled' : ''}>
  <el-icon class="el-icon--upload"><Plus /></el-icon>
  <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
</el-upload>`

export default {
  example: figma.code`${code}`,
  imports: [`import { Plus } from '@element-plus/icons-vue'`],
  id: 'el-upload-dragger',
  metadata: { nestable: true, props: { code } },
}
