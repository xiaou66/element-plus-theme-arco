// figma=Skeleton
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=22-143
// source=https://element-plus.org/en-US/component/skeleton.html
// component=ElSkeleton
import figma from 'figma'
const instance = figma.selectedInstance

const avatar = instance.getEnum('Avatar', { False: false, True: true })
const code = avatar
  ? `<el-skeleton animated>
  <template #template>
    <div style="display: flex; gap: 16px">
      <el-skeleton-item variant="circle" style="width: 48px; height: 48px" />
      <div style="flex: 1">
        <el-skeleton-item variant="p" style="width: 50%" />
        <el-skeleton-item variant="text" />
        <el-skeleton-item variant="text" style="width: 80%" />
      </div>
    </div>
  </template>
</el-skeleton>`
  : `<el-skeleton :rows="3" animated />`

export default {
  example: figma.code`${code}`,
  id: 'el-skeleton',
  metadata: { nestable: true, props: { code } },
}
