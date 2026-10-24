/** 组件目录供双语侧栏与页面检查共用；ready 仅在页面完成后启用，避免导航指向缺失内容。 */
export const groupTitles = {
  general: { zh: '通用', en: 'General' },
  layout: { zh: '布局', en: 'Layout' },
  input: { zh: '数据输入', en: 'Data Entry' },
  display: { zh: '数据展示', en: 'Data Display' },
  feedback: { zh: '反馈', en: 'Feedback' },
  navigation: { zh: '导航', en: 'Navigation' },
  other: { zh: '其他', en: 'Others' },
} as const

export type Group = keyof typeof groupTitles

export interface CatalogItem {
  slug: string
  name: string
  zh: string
  group: Group
  ready?: boolean
}

const all: CatalogItem[] = [
  { slug: 'button', name: 'Button', zh: '按钮', group: 'general', ready: true },
  { slug: 'link', name: 'Link', zh: '链接', group: 'general', ready: true },
  { slug: 'text', name: 'Text', zh: '文本', group: 'general', ready: true },
  { slug: 'divider', name: 'Divider', zh: '分割线', group: 'layout', ready: true },
  { slug: 'splitter', name: 'Splitter', zh: '分隔面板', group: 'layout', ready: true },
  { slug: 'input', name: 'Input', zh: '输入框', group: 'input', ready: true },
  { slug: 'input-number', name: 'InputNumber', zh: '数字输入框', group: 'input', ready: true },
  { slug: 'input-tag', name: 'InputTag', zh: '标签输入框', group: 'input', ready: true },
  { slug: 'input-otp', name: 'InputOtp', zh: '验证码输入', group: 'input', ready: true },
  { slug: 'autocomplete', name: 'Autocomplete', zh: '自动补全', group: 'input', ready: true },
  { slug: 'mention', name: 'Mention', zh: '提及', group: 'input', ready: true },
  { slug: 'select', name: 'Select', zh: '选择器', group: 'input', ready: true },
  { slug: 'select-v2', name: 'SelectV2', zh: '虚拟化选择器', group: 'input', ready: true },
  { slug: 'cascader', name: 'Cascader', zh: '级联选择', group: 'input', ready: true },
  { slug: 'tree-select', name: 'TreeSelect', zh: '树选择', group: 'input', ready: true },
  { slug: 'checkbox', name: 'Checkbox', zh: '多选框', group: 'input', ready: true },
  { slug: 'radio', name: 'Radio', zh: '单选框', group: 'input', ready: true },
  { slug: 'switch', name: 'Switch', zh: '开关', group: 'input', ready: true },
  { slug: 'segmented', name: 'Segmented', zh: '分段控制器', group: 'input', ready: true },
  { slug: 'slider', name: 'Slider', zh: '滑块', group: 'input', ready: true },
  { slug: 'rate', name: 'Rate', zh: '评分', group: 'input', ready: true },
  { slug: 'date-picker', name: 'DatePicker', zh: '日期选择器', group: 'input', ready: true },
  { slug: 'time-picker', name: 'TimePicker', zh: '时间选择器', group: 'input', ready: true },
  { slug: 'time-select', name: 'TimeSelect', zh: '时间选择', group: 'input', ready: true },
  { slug: 'color-picker', name: 'ColorPicker', zh: '颜色选择器', group: 'input', ready: true },
  { slug: 'transfer', name: 'Transfer', zh: '穿梭框', group: 'input', ready: true },
  { slug: 'upload', name: 'Upload', zh: '上传', group: 'input', ready: true },
  { slug: 'form', name: 'Form', zh: '表单', group: 'input', ready: true },
  { slug: 'avatar', name: 'Avatar', zh: '头像', group: 'display', ready: true },
  { slug: 'badge', name: 'Badge', zh: '徽标', group: 'display', ready: true },
  { slug: 'calendar', name: 'Calendar', zh: '日历', group: 'display', ready: true },
  { slug: 'card', name: 'Card', zh: '卡片', group: 'display', ready: true },
  { slug: 'carousel', name: 'Carousel', zh: '走马灯', group: 'display', ready: true },
  { slug: 'collapse', name: 'Collapse', zh: '折叠面板', group: 'display', ready: true },
  { slug: 'descriptions', name: 'Descriptions', zh: '描述列表', group: 'display', ready: true },
  { slug: 'empty', name: 'Empty', zh: '空状态', group: 'display', ready: true },
  { slug: 'image', name: 'Image', zh: '图片', group: 'display', ready: true },
  { slug: 'progress', name: 'Progress', zh: '进度条', group: 'display', ready: true },
  { slug: 'result', name: 'Result', zh: '结果', group: 'display', ready: true },
  { slug: 'skeleton', name: 'Skeleton', zh: '骨架屏', group: 'display', ready: true },
  { slug: 'statistic', name: 'Statistic', zh: '统计数值', group: 'display', ready: true },
  { slug: 'table', name: 'Table', zh: '表格', group: 'display', ready: true },
  { slug: 'table-v2', name: 'TableV2', zh: '虚拟化表格', group: 'display', ready: true },
  { slug: 'tag', name: 'Tag', zh: '标签', group: 'display', ready: true },
  { slug: 'timeline', name: 'Timeline', zh: '时间线', group: 'display', ready: true },
  { slug: 'tree', name: 'Tree', zh: '树', group: 'display', ready: true },
  { slug: 'tooltip', name: 'Tooltip', zh: '文字提示', group: 'display', ready: true },
  { slug: 'popover', name: 'Popover', zh: '气泡卡片', group: 'display', ready: true },
  { slug: 'alert', name: 'Alert', zh: '警告提示', group: 'feedback', ready: true },
  { slug: 'dialog', name: 'Dialog', zh: '对话框', group: 'feedback', ready: true },
  { slug: 'drawer', name: 'Drawer', zh: '抽屉', group: 'feedback', ready: true },
  { slug: 'loading', name: 'Loading', zh: '加载', group: 'feedback', ready: true },
  { slug: 'message', name: 'Message', zh: '全局提示', group: 'feedback', ready: true },
  { slug: 'message-box', name: 'MessageBox', zh: '消息弹框', group: 'feedback', ready: true },
  { slug: 'notification', name: 'Notification', zh: '通知', group: 'feedback', ready: true },
  { slug: 'popconfirm', name: 'Popconfirm', zh: '气泡确认框', group: 'feedback', ready: true },
  { slug: 'anchor', name: 'Anchor', zh: '锚点', group: 'navigation', ready: true },
  { slug: 'backtop', name: 'Backtop', zh: '回到顶部', group: 'navigation', ready: true },
  { slug: 'breadcrumb', name: 'Breadcrumb', zh: '面包屑', group: 'navigation', ready: true },
  { slug: 'dropdown', name: 'Dropdown', zh: '下拉菜单', group: 'navigation', ready: true },
  { slug: 'menu', name: 'Menu', zh: '菜单', group: 'navigation', ready: true },
  { slug: 'page-header', name: 'PageHeader', zh: '页头', group: 'navigation', ready: true },
  { slug: 'pagination', name: 'Pagination', zh: '分页', group: 'navigation', ready: true },
  { slug: 'steps', name: 'Steps', zh: '步骤条', group: 'navigation', ready: true },
  { slug: 'tabs', name: 'Tabs', zh: '标签页', group: 'navigation', ready: true },
  { slug: 'scrollbar', name: 'Scrollbar', zh: '滚动条', group: 'other', ready: true },
  { slug: 'tour', name: 'Tour', zh: '漫游式引导', group: 'other', ready: true },
]

export const catalog = all.filter((c) => c.ready)
