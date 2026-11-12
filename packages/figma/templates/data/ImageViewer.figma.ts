// figma=Image Viewer
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=32-995
// source=https://element-plus.org/en-US/component/image.html
// component=ElImageViewer
import figma from 'figma'
const instance = figma.selectedInstance

const code = `<el-image-viewer v-if="showViewer" :url-list="urls" @close="showViewer = false" />`

export default {
  example: figma.code`${code}`,
  id: 'el-image-viewer',
  metadata: { nestable: true, props: { code } },
}
