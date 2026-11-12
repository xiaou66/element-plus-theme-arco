// figma=Upload Picture Card
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=19-436
// source=https://element-plus.org/en-US/component/upload.html
// component=ElUpload
import figma from 'figma'
const instance = figma.selectedInstance

instance.getEnum('State', { Default: '', Hover: '', Picture: '' })
const code = `<el-upload v-model:file-list="fileList" action="#" list-type="picture-card">
  <el-icon><Plus /></el-icon>
</el-upload>`

export default {
  example: figma.code`${code}`,
  imports: [`import { Plus } from '@element-plus/icons-vue'`],
  id: 'el-upload-picture-card',
  metadata: { nestable: true, props: { code } },
}
