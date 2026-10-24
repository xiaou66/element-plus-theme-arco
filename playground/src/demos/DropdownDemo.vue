<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

// EP Dropdown 没有 visible 属性，挂载后用 handleOpen() 打开；两侧都渲染在 wrapper 内部
const dropdown = ref()
const arrow = ref()
const large = ref()
const small = ref()
onMounted(() => [dropdown, arrow, large, small].forEach((r) => r.value?.handleOpen()))

const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-dropdown__popper|.el-dropdown-menu__item:nth-child(1)|.el-dropdown-menu__item:nth-child(2)|.el-dropdown-menu__item.is-disabled'
    : '.arco-dropdown|.arco-dropdown-option:nth-child(1)|.arco-dropdown-option:nth-child(2)|.arco-dropdown-option-disabled'
</script>

<template>
  <CompareCase id="dropdown-basic" title="下拉菜单" note="EP :show-arrow=&quot;false&quot; ↔ Arco（距触发元素 4px）；选项 hover 是 fill-2（EP 原来是浅主色）。EP 的选项可聚焦（键盘导航），Arco 的不可聚焦，不比较 focus">
    <template #ep>
      <span data-pair="menu" class="pop-box" data-skip="focus" data-pos data-width :data-target="parts('ep')">
        <el-dropdown ref="dropdown" :teleported="false" :show-arrow="false" trigger="click" :hide-on-click="false">
          <el-button>下拉菜单</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>编辑内容</el-dropdown-item>
              <el-dropdown-item>复制链接</el-dropdown-item>
              <el-dropdown-item disabled>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </template>
    <template #arco>
      <span id="pop-dropdown" data-pair="menu" class="pop-box" :data-target="parts('arco')">
        <a-dropdown popup-visible popup-container="#pop-dropdown" :auto-fit-position="false">
          <a-button>下拉菜单</a-button>
          <template #content>
            <a-doption>编辑内容</a-doption>
            <a-doption>复制链接</a-doption>
            <a-doption disabled>删除</a-doption>
          </template>
        </a-dropdown>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="dropdown-props" title="默认箭头 / 尺寸（Arco 无对应项）" note="EP 默认显示箭头（距离 10px，同 Arco 带箭头的弹出层）；size large / small 按 EP 的档差延伸">
    <template #ep>
      <span class="pop-box">
        <el-dropdown ref="arrow" :teleported="false" trigger="click" :hide-on-click="false">
          <el-button>默认（有箭头）</el-button>
          <template #dropdown>
            <el-dropdown-menu><el-dropdown-item>编辑内容</el-dropdown-item><el-dropdown-item>复制链接</el-dropdown-item></el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
      <span class="pop-box">
        <el-dropdown ref="large" size="large" :teleported="false" trigger="click" :hide-on-click="false">
          <el-button size="large">large</el-button>
          <template #dropdown>
            <el-dropdown-menu><el-dropdown-item>编辑内容</el-dropdown-item><el-dropdown-item>复制链接</el-dropdown-item></el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
      <span class="pop-box">
        <el-dropdown ref="small" size="small" :teleported="false" trigger="click" :hide-on-click="false">
          <el-button size="small">small</el-button>
          <template #dropdown>
            <el-dropdown-menu><el-dropdown-item>编辑内容</el-dropdown-item><el-dropdown-item>复制链接</el-dropdown-item></el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </template>
    <template #arco>
      <span id="pop-dropdown-2" class="pop-box">
        <a-dropdown popup-visible popup-container="#pop-dropdown-2" :auto-fit-position="false">
          <a-button>Arco</a-button>
          <template #content><a-doption>编辑内容</a-doption><a-doption>复制链接</a-doption></template>
        </a-dropdown>
      </span>
    </template>
  </CompareCase>
</template>
