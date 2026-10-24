<script setup lang="ts">
// Message / Notification 平时由函数调用渲染到 body、fixed 定位。这里直接渲染两边内部的单条组件，
// 并在 playground.css 里取消 fixed 定位（.static-pop），才能放进对照格子里成对测量
import ElMessageItem from 'element-plus/es/components/message/src/message2.mjs'
import ElNotificationItem from 'element-plus/es/components/notification/src/notification2.mjs'
import ArcoMessageItem from '@arco-design/web-vue/es/message/message.js'
import ArcoNotificationItem from '@arco-design/web-vue/es/notification/notification.js'
import CompareCase from '../components/CompareCase.vue'

// EP primary ↔ Arco info；EP info（灰）↔ Arco normal
const types = [
  { ep: 'primary', arco: 'info' },
  { ep: 'success', arco: 'success' },
  { ep: 'warning', arco: 'warning' },
  { ep: 'error', arco: 'error' },
] as const
const msgParts = (side: 'ep' | 'arco') =>
  side === 'ep' ? '.el-message|.el-message__icon svg|.el-message__content' : '.arco-message|.arco-message-icon svg|.arco-message-content'
const notiParts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-notification|.el-notification__icon svg|.el-notification__title|.el-notification__content|.el-notification__closeBtn svg'
    : '.arco-notification|.arco-notification-icon svg|.arco-notification-title|.arco-notification-content|.arco-notification-close-btn svg'
</script>

<template>
  <CompareCase id="message-types" title="Message" note="EP primary ↔ Arco info；白底、border-2 描边、文字 text-1，图标是类型色">
    <template #ep>
      <div class="stack static-pop">
        <span v-for="t in types" :key="t.ep" :data-pair="t.ep" data-pos data-width :data-target="msgParts('ep')">
          <ElMessageItem id="m" :type="t.ep" message="这是一条消息提示" :duration="0" :offset="0" />
        </span>
        <span data-pair="closable" data-pos data-width data-target=".el-message|.el-message__closeBtn svg">
          <ElMessageItem id="m2" type="primary" message="可关闭的消息" show-close :duration="0" :offset="0" />
        </span>
      </div>
    </template>
    <template #arco>
      <div class="stack static-pop">
        <ul v-for="t in types" :key="t.ep" class="arco-message-list" :data-pair="t.ep" :data-target="msgParts('arco')">
          <ArcoMessageItem :type="t.arco" :duration="0">这是一条消息提示</ArcoMessageItem>
        </ul>
        <ul class="arco-message-list" data-pair="closable" data-target=".arco-message|.arco-message-close-btn svg">
          <ArcoMessageItem type="info" closable :duration="0">可关闭的消息</ArcoMessageItem>
        </ul>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="notification-types" title="Notification" note="EP primary ↔ Arco info；340px 宽、20px 内边距、4px 圆角">
    <template #ep>
      <div class="stack static-pop">
        <span v-for="t in types.slice(0, 2)" :key="t.ep" :data-pair="t.ep" data-pos data-width :data-target="notiParts('ep')">
          <ElNotificationItem id="n" :type="t.ep" title="通知标题" message="这是一条通知的内容。" :duration="0" :offset="0" />
        </span>
      </div>
    </template>
    <template #arco>
      <div class="stack static-pop">
        <ul v-for="t in types.slice(0, 2)" :key="t.ep" class="arco-notification-list" :data-pair="t.ep" :data-target="notiParts('arco')">
          <ArcoNotificationItem :type="t.arco" closable :duration="0">
            <template #default>通知标题</template>
            <template #content>这是一条通知的内容。</template>
          </ArcoNotificationItem>
        </ul>
      </div>
    </template>
  </CompareCase>

  <CompareCase id="message-plain" title="plain（Arco 无对应项）" note="默认是 border-2 描边；plain 保留 EP 的形态：无可见描边、只有阴影">
    <template #ep>
      <div class="stack static-pop">
        <ElMessageItem id="m3" type="success" message="默认" :duration="0" :offset="0" />
        <ElMessageItem id="m4" type="success" message="plain" plain :duration="0" :offset="0" />
      </div>
    </template>
    <template #arco>
      <div class="stack static-pop">
        <ul class="arco-message-list"><ArcoMessageItem type="success" :duration="0">Arco</ArcoMessageItem></ul>
      </div>
    </template>
  </CompareCase>
</template>
