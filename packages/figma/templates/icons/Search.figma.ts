// figma=Icon/Search
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=3-36
// source=https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/search.svg
// component=Search
import figma from 'figma'

const code = '<el-icon><Search /></el-icon>'

export default {
  example: figma.code`${code}`,
  imports: ["import { Search } from '@element-plus/icons-vue'"],
  id: 'icon-Search',
  // Button / Input 等父模板通过 iconName 生成 :icon="Search"
  metadata: { nestable: true, props: { code, iconName: 'Search' } },
}
