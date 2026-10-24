<script setup lang="ts">
import { ref } from 'vue'
import { Search, User } from '@element-plus/icons-vue'
import { IconSearch, IconUser } from '@arco-design/web-vue/es/icon'
import CompareCase from '../components/CompareCase.vue'

const filled = ref('Hello Arco')
const filledArco = ref('Hello Arco')
const text = ref('多行文本')
const textArco = ref('多行文本')
</script>

<template>
  <CompareCase id="input-basic" title="基础 / 有值 / 禁用">
    <template #ep>
      <span data-pair="empty"><el-input placeholder="请输入内容" /></span>
      <span data-pair="filled"><el-input v-model="filled" /></span>
      <span data-pair="disabled"><el-input placeholder="禁用" disabled /></span>
    </template>
    <template #arco>
      <span data-pair="empty"><a-input placeholder="请输入内容" /></span>
      <span data-pair="filled"><a-input v-model="filledArco" /></span>
      <span data-pair="disabled"><a-input placeholder="禁用" disabled /></span>
    </template>
  </CompareCase>

  <CompareCase id="input-error" title="错误态" note="EP 用 class=&quot;is-error&quot; 或放在校验失败的 el-form-item 里">
    <template #ep>
      <span data-pair="error"><el-input class="is-error" placeholder="错误态" /></span>
    </template>
    <template #arco>
      <span data-pair="error"><a-input error placeholder="错误态" /></span>
    </template>
  </CompareCase>

  <CompareCase id="input-sizes" title="尺寸">
    <template #ep>
      <span data-pair="small"><el-input size="small" placeholder="small" /></span>
      <span data-pair="default"><el-input placeholder="default" /></span>
      <span data-pair="large"><el-input size="large" placeholder="large" /></span>
    </template>
    <template #arco>
      <span data-pair="small"><a-input size="small" placeholder="small" /></span>
      <span data-pair="default"><a-input placeholder="default" /></span>
      <span data-pair="large"><a-input size="large" placeholder="large" /></span>
    </template>
  </CompareCase>

  <CompareCase id="input-affix" title="前后缀图标 / 可清除 / 密码">
    <template #ep>
      <span data-pair="prefix"><el-input :prefix-icon="User" placeholder="用户名" /></span>
      <span data-pair="suffix"><el-input :suffix-icon="Search" placeholder="搜索" /></span>
      <span data-pair="clearable"><el-input model-value="可清除" clearable /></span>
      <span data-pair="password"><el-input type="password" model-value="secret" show-password /></span>
    </template>
    <template #arco>
      <span data-pair="prefix"><a-input placeholder="用户名"><template #prefix><IconUser /></template></a-input></span>
      <span data-pair="suffix"><a-input placeholder="搜索"><template #suffix><IconSearch /></template></a-input></span>
      <span data-pair="clearable"><a-input default-value="可清除" allow-clear /></span>
      <span data-pair="password"><a-input-password default-value="secret" /></span>
    </template>
  </CompareCase>

  <CompareCase id="input-addon" title="前置 / 后置标签">
    <template #ep>
      <span data-pair="addon">
        <el-input placeholder="域名">
          <template #prepend>https://</template>
          <template #append>.com</template>
        </el-input>
      </span>
    </template>
    <template #arco>
      <span data-pair="addon">
        <a-input placeholder="域名">
          <template #prepend>https://</template>
          <template #append>.com</template>
        </a-input>
      </span>
    </template>
  </CompareCase>

  <CompareCase id="input-textarea" title="文本域 / 字数限制">
    <template #ep>
      <span data-pair="textarea" class="wide"><el-input v-model="text" type="textarea" :rows="3" /></span>
      <span data-pair="limit"><el-input model-value="字数" maxlength="20" show-word-limit /></span>
    </template>
    <template #arco>
      <span data-pair="textarea" class="wide"><a-textarea v-model="textArco" :auto-size="{ minRows: 3, maxRows: 3 }" /></span>
      <span data-pair="limit"><a-input default-value="字数" :max-length="20" show-word-limit /></span>
    </template>
  </CompareCase>
</template>
