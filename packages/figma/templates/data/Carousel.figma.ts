// figma=Carousel
// url=https://www.figma.com/design/poAXj8MRPolt3HKremBdRA/Arco-for-Element-Plus-UI-Kit?node-id=24-321
// source=https://element-plus.org/en-US/component/carousel.html
// component=ElCarousel
import figma from 'figma'
const instance = figma.selectedInstance

instance.getString('Slide')
const code = `<el-carousel height="240px">
  <el-carousel-item v-for="item in 4" :key="item">
    <h3>{{ item }}</h3>
  </el-carousel-item>
</el-carousel>`

export default {
  example: figma.code`${code}`,
  id: 'el-carousel',
  metadata: { nestable: true, props: { code } },
}
