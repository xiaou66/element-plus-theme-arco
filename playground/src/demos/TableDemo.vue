<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import CompareCase from '../components/CompareCase.vue'

// 前两列宽度两侧写死，最后一列不写，两边各自填满剩余宽度（EP 列宽全写死时不会拉伸，Arco 会按比例拉伸）
const rows = [
  { key: '1', name: '张三', age: 32, city: '杭州' },
  { key: '2', name: '李四', age: 28, city: '上海' },
  { key: '3', name: '王五', age: 41, city: '北京' },
]
const columns = [
  { title: '姓名', dataIndex: 'name', width: 160 },
  { title: '年龄', dataIndex: 'age', width: 120 },
  { title: '城市', dataIndex: 'city' },
]
const cityFilters = [
  { text: '杭州', value: '杭州' },
  { text: '上海', value: '上海' },
]
const sortColumns = [
  { ...columns[0], sortable: { sortDirections: ['ascend', 'descend'] } },
  { ...columns[1], sortable: { sortDirections: ['ascend', 'descend'], defaultSortOrder: 'ascend' } },
  columns[2],
]
const filterColumns = [
  columns[0],
  columns[1],
  {
    ...columns[2],
    filterable: {
      filters: cityFilters,
      filter: (v: string[], r: any) => v.includes(r.city),
      multiple: true,
      triggerProps: { popupVisible: true, popupContainer: '#pop-table-filter', autoFitPosition: false },
    },
  },
]
const summary = ({ data }: any) => [{ name: '合计', age: data.reduce((s: number, r: any) => s + r.age, 0), city: '' }]
const epSummary = ({ columns: cols, data }: any) =>
  cols.map((c: any, i: number) => (i === 0 ? '合计' : c.property === 'age' ? data.reduce((s: number, r: any) => s + r.age, 0) : ''))

const selTable = ref()
// EP 的筛选面板固定传送到 body（persistent，未打开时也在 DOM 里）：先移进 wrapper 再点开，只比较尺寸和颜色。
// 两侧都勾上第一项（未确认），EP 的“筛选”按钮才可用，和 Arco 一致
const filterHost = ref<HTMLElement>()
onMounted(async () => {
  selTable.value?.toggleRowSelection(rows[0], true)
  await nextTick()
  setTimeout(() => {
    const panel = document.querySelector('.el-table-filter')
    if (panel && filterHost.value) filterHost.value.appendChild(panel)
    document.querySelector<HTMLElement>('[data-case="table-filter"] .side-ep .el-table__column-filter-trigger')?.click()
    setTimeout(() => {
      document.querySelector<HTMLElement>('.filter-host .el-table-filter .el-checkbox')?.click()
      document.querySelector<HTMLElement>('#pop-table-filter .arco-checkbox')?.click()
    }, 300)
  }, 300)
})

const cells = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-table|.el-table__header th:nth-child(1)|.el-table__header th:nth-child(2)|.el-table__body tr:nth-child(1) td:nth-child(1)|.el-table__body tr:nth-child(1) td:nth-child(2)|.el-table__body tr:nth-child(1) td:nth-child(3)|.el-table__body tr:nth-child(3) td:nth-child(1)'
    : '.arco-table-container|.arco-table-th:nth-child(1)|.arco-table-th:nth-child(2)|tbody .arco-table-tr:nth-child(1) .arco-table-td:nth-child(1)|tbody .arco-table-tr:nth-child(1) .arco-table-td:nth-child(2)|tbody .arco-table-tr:nth-child(1) .arco-table-td:nth-child(3)|tbody .arco-table-tr:nth-child(3) .arco-table-td:nth-child(1)'
// 固定列：总宽 600 > 容器 440，出现横向滚动；初始在最左，右侧固定列有阴影
const wideColumns = [
  { title: '姓名', dataIndex: 'name', width: 120, fixed: 'left' },
  { title: '年龄', dataIndex: 'age', width: 160 },
  { title: '城市', dataIndex: 'city', width: 200 },
  { title: '操作', dataIndex: 'op', width: 120, fixed: 'right' },
]
const alignColumns = [
  { title: '姓名', dataIndex: 'name', width: 160 },
  { title: '年龄', dataIndex: 'age', width: 120, align: 'center' },
  { title: '城市', dataIndex: 'city', align: 'right' },
]
const groupColumns = [
  { title: '姓名', dataIndex: 'name', width: 160 },
  { title: '信息', children: [{ title: '年龄', dataIndex: 'age', width: 120 }, { title: '城市', dataIndex: 'city' }] },
]
const treeRows = [
  { key: '1', name: '浙江', age: 0, city: '-', children: [{ key: '1-1', name: '杭州', age: 1, city: '杭州' }] },
  { key: '2', name: '江苏', age: 0, city: '-' },
]
const currentRow = ref()
onMounted(() => currentRow.value?.setCurrentRow(rows[1]))
const cellStyle = ({ columnIndex }: any) => (columnIndex === 1 ? { color: 'rgb(var(--red-6))' } : {})
const rowClass = ({ rowIndex }: any) => (rowIndex === 0 ? 'demo-row-warning' : '')

const row = (side: 'ep' | 'arco', r: number, c: number) =>
  side === 'ep' ? `.el-table__body tr:nth-child(${r}) td:nth-child(${c})` : `tbody .arco-table-tr:nth-child(${r}) .arco-table-td:nth-child(${c})`
</script>

<template>
  <CompareCase id="table-basic" title="Table 默认 / border" note="EP 默认 ↔ Arco :bordered=&quot;false&quot;；border ↔ :bordered=&quot;{ cell: true }&quot;">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div class="stack">
          <div data-pair="default" class="table-box" data-pos data-width :data-target="cells('ep')">
            <el-table :data="rows">
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
          <div data-pair="border" class="table-box" data-pos data-width :data-target="cells('ep')">
            <el-table :data="rows" border>
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div class="stack">
        <div data-pair="default" class="table-box" :data-target="cells('arco')">
          <a-table :columns="columns" :data="rows" :bordered="false" :pagination="false" />
        </div>
        <div data-pair="border" class="table-box" :data-target="cells('arco')">
          <a-table :columns="columns" :data="rows" :bordered="{ cell: true }" :pagination="false" />
        </div>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="table-variant" title="Table 斑马纹 / small / 合计行 / 空数据" note="small ↔ Arco small；EP 的 large Arco 没有，按 EP 的档差延伸（只看截图）；空数据 EP 只有文字，Arco 是 Empty 组件（只看截图）">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div class="stack">
          <div data-pair="stripe" class="table-box" data-pos :data-target="`${row('ep', 2, 1)}|${row('ep', 3, 1)}`">
            <el-table :data="rows" stripe>
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
          <div data-pair="small" class="table-box" data-pos data-width :data-target="cells('ep')">
            <el-table :data="rows" size="small">
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
          <div data-pair="summary" class="table-box" data-pos :data-target="'.el-table__footer td:nth-child(1)|.el-table__footer td:nth-child(2)'">
            <el-table :data="rows" show-summary :summary-method="epSummary">
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
          <div class="table-box">
            <el-table :data="rows" size="large">
              <el-table-column prop="name" label="姓名（large）" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
          <div class="table-box">
            <el-table :data="[]">
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div class="stack">
        <div data-pair="stripe" class="table-box" :data-target="`${row('arco', 2, 1)}|${row('arco', 3, 1)}`">
          <a-table :columns="columns" :data="rows" :bordered="false" stripe :pagination="false" />
        </div>
        <div data-pair="small" class="table-box" :data-target="cells('arco')">
          <a-table :columns="columns" :data="rows" :bordered="false" size="small" :pagination="false" />
        </div>
        <div data-pair="summary" class="table-box" :data-target="'tfoot .arco-table-td:nth-child(1)|tfoot .arco-table-td:nth-child(2)'">
          <a-table :columns="columns" :data="rows" :bordered="false" :summary="summary" :pagination="false" />
        </div>
        <div class="table-box">
          <a-table :columns="columns" :data="[]" :bordered="false" :pagination="false" />
        </div>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="table-sort" title="Table 排序 / 选中行 / 展开行" note="排序中的表头 neutral-3；Arco 的 hover 底色在表头里铺满的 .arco-table-cell 上，比较它；箭头 7×5px（形状相同，EP 是 CSS 三角、Arco 是 svg，只比外框）；勾选列、展开列 EP 默认 48px、Arco 40px（JS 写在 col 上），用例都传 40">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div class="stack">
          <div data-pair="sort" class="table-box" data-pos :data-target="`.el-table__header th:nth-child(2)|.el-table__header th:nth-child(1)|th:nth-child(2) .caret-wrapper|${row('ep', 1, 2)}|${row('ep', 1, 1)}`">
            <el-table :data="rows" :default-sort="{ prop: 'age', order: 'ascending' }">
              <el-table-column prop="name" label="姓名" width="160" sortable />
              <el-table-column prop="age" label="年龄" width="120" sortable />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
          <div data-pair="select" class="table-box" data-pos :data-target="`${row('ep', 1, 2)}|${row('ep', 2, 2)}|${row('ep', 1, 1)} .el-checkbox__inner|.el-table__header .el-checkbox__inner`">
            <el-table ref="selTable" :data="rows">
              <el-table-column type="selection" width="40" />
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" />
            </el-table>
          </div>
          <div data-pair="expand" class="table-box" data-pos :data-target="`.el-table__expand-icon|${row('ep', 1, 2)}|.el-table__expanded-cell`">
            <el-table :data="rows" :expand-row-keys="['1']" row-key="key">
              <el-table-column type="expand" width="40">
                <template #default="{ row: r }">{{ r.name }} 的详情</template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" />
            </el-table>
          </div>
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div class="stack">
        <div data-pair="sort" class="table-box" :data-target="`.arco-table-th:nth-child(2) .arco-table-cell|.arco-table-th:nth-child(1) .arco-table-cell|.arco-table-th:nth-child(2) .arco-table-sorter|${row('arco', 1, 2)}|${row('arco', 1, 1)}`">
          <a-table :columns="sortColumns" :data="rows" :bordered="false" :pagination="false" />
        </div>
        <div data-pair="select" class="table-box" :data-target="`${row('arco', 1, 2)}|${row('arco', 2, 2)}|${row('arco', 1, 1)} .arco-checkbox-icon|thead .arco-checkbox-icon`">
          <a-table
            :columns="[columns[0], { title: '年龄', dataIndex: 'age' }]"
            :data="rows"
            :bordered="false"
            :row-selection="{ type: 'checkbox', showCheckedAll: true }"
            :default-selected-keys="['1']"
            :pagination="false"
          />
        </div>
        <div data-pair="expand" class="table-box" :data-target="`.arco-table-expand-btn|${row('arco', 1, 2)}|.arco-table-tr-expand .arco-table-td`">
          <a-table
            :columns="[columns[0], { title: '年龄', dataIndex: 'age' }]"
            :data="rows.map((r) => ({ ...r, expand: `${r.name} 的详情` }))"
            :bordered="false"
            :expandable="{ width: 40 }"
            :default-expanded-keys="['1']"
            :pagination="false"
          />
        </div>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="table-props" title="Table 固定列 / 对齐 / 多级表头 / 树形" note="固定列的阴影和 Arco 固定列的 hover 底色都在伪元素上，看截图；EP 有多级表头时强制带边框，和 Arco 带边框的形态比较">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div class="stack">
          <div data-pair="fixed" class="table-box" data-skip="hover" data-pos :data-target="`${row('ep', 1, 1)}|${row('ep', 1, 4)}|.el-table__header th:nth-child(4)`">
            <el-table :data="rows">
              <el-table-column prop="name" label="姓名" width="120" fixed />
              <el-table-column prop="age" label="年龄" width="160" />
              <el-table-column prop="city" label="城市" width="200" />
              <el-table-column label="操作" width="120" fixed="right"><template #default>编辑</template></el-table-column>
            </el-table>
          </div>
          <div data-pair="align" class="table-box" data-pos :data-target="`.el-table__header th:nth-child(2)|.el-table__header th:nth-child(3)|${row('ep', 1, 2)}|${row('ep', 1, 3)}`">
            <el-table :data="rows">
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" align="center" />
              <el-table-column prop="city" label="城市" align="right" />
            </el-table>
          </div>
          <div data-pair="group" class="table-box" data-pos :data-target="'.el-table__header tr:nth-child(1) th:nth-child(1)|.el-table__header tr:nth-child(1) th:nth-child(2)|.el-table__header tr:nth-child(2) th:nth-child(1)'">
            <el-table :data="rows">
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column label="信息">
                <el-table-column prop="age" label="年龄" width="120" />
                <el-table-column prop="city" label="城市" />
              </el-table-column>
            </el-table>
          </div>
          <div data-pair="tree" class="table-box" data-pos :data-target="`${row('ep', 1, 1)}|${row('ep', 2, 1)}|${row('ep', 3, 1)}|.el-table__row--level-0 .el-table__expand-icon`">
            <el-table :data="treeRows" row-key="key" default-expand-all>
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div class="stack">
        <div data-pair="fixed" class="table-box" :data-target="`${row('arco', 1, 1)}|${row('arco', 1, 4)}|.arco-table-th:nth-child(4)`">
          <a-table :columns="wideColumns" :data="rows.map((r) => ({ ...r, op: '编辑' }))" :bordered="false" :scroll="{ x: 600 }" :pagination="false" />
        </div>
        <div data-pair="align" class="table-box" :data-target="`.arco-table-th:nth-child(2)|.arco-table-th:nth-child(3)|${row('arco', 1, 2)}|${row('arco', 1, 3)}`">
          <a-table :columns="alignColumns" :data="rows" :bordered="false" :pagination="false" />
        </div>
        <div data-pair="group" class="table-box" :data-target="'thead .arco-table-tr:nth-child(1) .arco-table-th:nth-child(1)|thead .arco-table-tr:nth-child(1) .arco-table-th:nth-child(2)|thead .arco-table-tr:nth-child(2) .arco-table-th:nth-child(1)'">
          <a-table :columns="groupColumns" :data="rows" :bordered="{ cell: true }" :pagination="false" />
        </div>
        <div data-pair="tree" class="table-box" :data-target="`${row('arco', 1, 1)}|${row('arco', 2, 1)}|${row('arco', 3, 1)}|.arco-table-expand-btn`">
          <a-table :columns="columns" :data="treeRows" :bordered="false" default-expand-all-rows :pagination="false" />
        </div>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="table-ep-only" title="Table：Arco 没有对应项的属性" note="只看截图，确认 EP 原有的属性仍然生效：highlight-current-row（第二行）、cell-style（第二列红字）、row-class-name（第一行）、show-header=false、fit=false、show-overflow-tooltip">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div class="stack">
          <div class="table-box">
            <el-table ref="currentRow" :data="rows" highlight-current-row :cell-style="cellStyle" :row-class-name="rowClass">
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
          <div class="table-box">
            <el-table :data="rows" :show-header="false" border>
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" />
            </el-table>
          </div>
          <div class="table-box">
            <el-table :data="rows" :fit="false" border>
              <el-table-column prop="name" label="姓名（fit=false）" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
            </el-table>
          </div>
          <div class="table-box">
            <el-table :data="rows.map((r) => ({ ...r, city: r.city + '市西湖区文三路一百号很长的地址' }))">
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="city" label="地址（show-overflow-tooltip）" show-overflow-tooltip />
            </el-table>
          </div>
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div class="stack" />
    </template>
  </CompareCase>

  <CompareCase id="table-filter" title="Table 筛选" note="筛选按钮贴表头右侧、整高；EP 的筛选面板传送到 body，用例点开后移进来，只比较尺寸和颜色">
    <template #ep>
      <el-config-provider :locale="zhCn">
        <div class="stack">
          <div data-pair="trigger" class="table-box" data-pos :data-target="'.el-table__header th:nth-child(3)|.el-table__column-filter-trigger'">
            <el-table :data="rows">
              <el-table-column prop="name" label="姓名" width="160" />
              <el-table-column prop="age" label="年龄" width="120" />
              <el-table-column prop="city" label="城市" :filters="cityFilters" :filter-method="(v: string, r: any) => r.city === v" />
            </el-table>
          </div>
          <div ref="filterHost" data-pair="panel" class="filter-host" data-skip="hover focus" data-pos data-width :data-target="'.el-table-filter|.el-table-filter__checkbox-group .el-checkbox:nth-child(1) .el-checkbox__inner|.el-table-filter__bottom button:nth-child(2)|.el-table-filter__bottom button:nth-child(1)'" />
        </div>
      </el-config-provider>
    </template>
    <template #arco>
      <div class="stack">
        <div data-pair="trigger" class="table-box" :data-target="'.arco-table-th:nth-child(3)|.arco-table-filters'">
          <a-table :columns="filterColumns" :data="rows" :bordered="false" :pagination="false" />
        </div>
        <div id="pop-table-filter" data-pair="panel" class="filter-host" :data-target="'.arco-table-filters-content|.arco-table-filters-item:nth-child(1) .arco-checkbox-icon|.arco-table-filters-bottom .arco-btn:nth-child(1)|.arco-table-filters-bottom .arco-btn:nth-child(2)'" />
      </div>
    </template>
  </CompareCase>
</template>
