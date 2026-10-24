<script setup lang="ts">
import { computed, ref } from 'vue'
import { applyDark, isDark } from './dark'
import ButtonDemo from './demos/ButtonDemo.vue'
import InputDemo from './demos/InputDemo.vue'
import LinkDemo from './demos/LinkDemo.vue'
import TagDemo from './demos/TagDemo.vue'
import BadgeDemo from './demos/BadgeDemo.vue'
import DividerDemo from './demos/DividerDemo.vue'
import RadioDemo from './demos/RadioDemo.vue'
import CheckboxDemo from './demos/CheckboxDemo.vue'
import SwitchDemo from './demos/SwitchDemo.vue'
import AlertDemo from './demos/AlertDemo.vue'
import CardDemo from './demos/CardDemo.vue'
import AvatarDemo from './demos/AvatarDemo.vue'
import BreadcrumbDemo from './demos/BreadcrumbDemo.vue'
import ProgressDemo from './demos/ProgressDemo.vue'
import SkeletonDemo from './demos/SkeletonDemo.vue'
import StatisticDemo from './demos/StatisticDemo.vue'
import InputNumberDemo from './demos/InputNumberDemo.vue'
import InputTagDemo from './demos/InputTagDemo.vue'
import DescriptionsDemo from './demos/DescriptionsDemo.vue'
import TimelineDemo from './demos/TimelineDemo.vue'
import PageHeaderDemo from './demos/PageHeaderDemo.vue'
import TextDemo from './demos/TextDemo.vue'
import BacktopDemo from './demos/BacktopDemo.vue'
import AutocompleteDemo from './demos/AutocompleteDemo.vue'
import PopoverDemo from './demos/PopoverDemo.vue'
import DropdownDemo from './demos/DropdownDemo.vue'
import SelectDemo from './demos/SelectDemo.vue'
import MessageDemo from './demos/MessageDemo.vue'
import DialogDemo from './demos/DialogDemo.vue'
import MessageBoxDemo from './demos/MessageBoxDemo.vue'
import TabsDemo from './demos/TabsDemo.vue'
import CollapseDemo from './demos/CollapseDemo.vue'
import StepsDemo from './demos/StepsDemo.vue'
import PaginationDemo from './demos/PaginationDemo.vue'
import SliderDemo from './demos/SliderDemo.vue'
import MenuDemo from './demos/MenuDemo.vue'
import ResultDemo from './demos/ResultDemo.vue'
import LoadingDemo from './demos/LoadingDemo.vue'
import FormDemo from './demos/FormDemo.vue'
import MiscDemo from './demos/MiscDemo.vue'
import TreeDemo from './demos/TreeDemo.vue'
import TableDemo from './demos/TableDemo.vue'
import NavDemo from './demos/NavDemo.vue'
import MediaDemo from './demos/MediaDemo.vue'
import TransferDemo from './demos/TransferDemo.vue'
import ColorDemo from './demos/ColorDemo.vue'
import CalendarDemo from './demos/CalendarDemo.vue'
import DateDemo from './demos/DateDemo.vue'
import TimeDemo from './demos/TimeDemo.vue'
import TourDemo from './demos/TourDemo.vue'
import VirtualDemo from './demos/VirtualDemo.vue'
import TreeSelectDemo from './demos/TreeSelectDemo.vue'
import SplitterDemo from './demos/SplitterDemo.vue'

const demos = {
  button: { label: 'Button', component: ButtonDemo },
  input: { label: 'Input', component: InputDemo },
  link: { label: 'Link', component: LinkDemo },
  tag: { label: 'Tag', component: TagDemo },
  badge: { label: 'Badge', component: BadgeDemo },
  divider: { label: 'Divider', component: DividerDemo },
  radio: { label: 'Radio', component: RadioDemo },
  checkbox: { label: 'Checkbox', component: CheckboxDemo },
  switch: { label: 'Switch', component: SwitchDemo },
  alert: { label: 'Alert', component: AlertDemo },
  card: { label: 'Card', component: CardDemo },
  avatar: { label: 'Avatar', component: AvatarDemo },
  breadcrumb: { label: 'Breadcrumb', component: BreadcrumbDemo },
  progress: { label: 'Progress', component: ProgressDemo },
  skeleton: { label: 'Skeleton', component: SkeletonDemo },
  statistic: { label: 'Statistic', component: StatisticDemo },
  'input-number': { label: 'InputNumber', component: InputNumberDemo },
  'input-tag': { label: 'InputTag', component: InputTagDemo },
  descriptions: { label: 'Descriptions', component: DescriptionsDemo },
  timeline: { label: 'Timeline', component: TimelineDemo },
  'page-header': { label: 'PageHeader', component: PageHeaderDemo },
  text: { label: 'Text', component: TextDemo },
  backtop: { label: 'Backtop', component: BacktopDemo },
  autocomplete: { label: 'Autocomplete', component: AutocompleteDemo },
  popover: { label: 'Tooltip / Popover', component: PopoverDemo },
  dropdown: { label: 'Dropdown', component: DropdownDemo },
  select: { label: 'Select', component: SelectDemo },
  message: { label: 'Message', component: MessageDemo },
  dialog: { label: 'Dialog / Drawer', component: DialogDemo },
  'message-box': { label: 'MessageBox', component: MessageBoxDemo },
  tabs: { label: 'Tabs', component: TabsDemo },
  collapse: { label: 'Collapse', component: CollapseDemo },
  steps: { label: 'Steps', component: StepsDemo },
  pagination: { label: 'Pagination', component: PaginationDemo },
  slider: { label: 'Slider / Rate', component: SliderDemo },
  menu: { label: 'Menu', component: MenuDemo },
  result: { label: 'Empty / Result', component: ResultDemo },
  loading: { label: 'Loading', component: LoadingDemo },
  form: { label: 'Form', component: FormDemo },
  misc: { label: 'OTP / Scrollbar', component: MiscDemo },
  tree: { label: 'Tree / Cascader / Upload', component: TreeDemo },
  table: { label: 'Table', component: TableDemo },
  nav: { label: 'Segmented / Anchor', component: NavDemo },
  media: { label: 'Image / Carousel', component: MediaDemo },
  transfer: { label: 'Transfer', component: TransferDemo },
  color: { label: 'ColorPicker', component: ColorDemo },
  calendar: { label: 'Calendar', component: CalendarDemo },
  date: { label: 'DatePicker', component: DateDemo },
  time: { label: 'TimePicker / TimeSelect', component: TimeDemo },
  tour: { label: 'Tour', component: TourDemo },
  virtual: { label: 'SelectV2 / TableV2', component: VirtualDemo },
  'tree-select': { label: 'TreeSelect', component: TreeSelectDemo },
  splitter: { label: 'Splitter', component: SplitterDemo },
} as const
type DemoKey = keyof typeof demos

const readHash = (): DemoKey => {
  const key = location.hash.slice(1)
  return key in demos ? (key as DemoKey) : 'button'
}
const current = ref<DemoKey>(readHash())
window.addEventListener('hashchange', () => (current.value = readHash()))

const ondemand = import.meta.env.MODE === 'ondemand'
const raw = new URLSearchParams(location.search).get('theme') === 'raw'
const dark = ref(isDark())
const toggleDark = () => applyDark((dark.value = !dark.value))
const themeHref = computed(() => {
  const params = new URLSearchParams()
  if (!raw) params.set('theme', 'raw')
  if (dark.value) params.set('dark', '1')
  return `?${params}#${current.value}`
})
</script>

<template>
  <div class="pg">
    <header class="pg-head">
      <strong>EP × Arco 对照</strong>
      <nav>
        <a
          v-for="(d, key) in demos"
          :key="key"
          :href="`#${key}`"
          :class="{ active: current === key }"
        >{{ d.label }}</a>
      </nav>
      <button class="pg-dark" type="button" @click="toggleDark">{{ dark ? '☀ 亮色' : '☾ 暗色' }}</button>
      <span v-if="ondemand" class="pg-theme">按需引入模式（resolver + arcoTheme 插件）</span>
      <a v-else class="pg-theme" :href="themeHref">
        左侧当前：{{ raw ? 'EP 原版' : 'Arco 主题' }}（点击切换）
      </a>
    </header>
    <main class="pg-main" :data-demo="current">
      <component :is="demos[current].component" />
    </main>
  </div>
</template>
