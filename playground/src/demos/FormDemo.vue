<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import CompareCase from '../components/CompareCase.vue'

const model = reactive({ name: '', email: 'abc' })
const modelArco = reactive({ name: '', email: 'abc' })
const form = ref()
const formArco = ref()
const rules = { email: [{ required: true, message: '邮箱格式不正确', validator: (_: unknown, __: string, cb: (e?: Error) => void) => cb(new Error('邮箱格式不正确')) }] }
const rulesArco = { email: [{ required: true, validator: (_: unknown, cb: (e?: string) => void) => cb('邮箱格式不正确') }] }
onMounted(() => {
  form.value?.validateField('email').catch(() => {})
  formArco.value?.validateField('email')
})
const parts = (side: 'ep' | 'arco') =>
  side === 'ep'
    ? '.el-form-item:nth-child(1)|.el-form-item:nth-child(1) .el-form-item__content|.el-form-item__error|.el-form-item:nth-child(3)'
    : '.arco-form-item:nth-child(1)|.arco-form-item:nth-child(1) .arco-form-item-content|.arco-form-item-message|.arco-form-item:nth-child(3)'
</script>

<template>
  <CompareCase id="form-basic" title="表单 / 必填 / 校验失败" note="EP label-width=&quot;80px&quot; ↔ Arco label-col-flex 80px；标签的盒子结构不同（EP 含右侧内边距），文字位置看截图">
    <template #ep>
      <span data-pair="form" class="desc-box" data-pos data-width :data-target="parts('ep')">
        <el-form ref="form" :model="model" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="name"><el-input v-model="model.name" placeholder="请输入" /></el-form-item>
          <el-form-item label="邮箱" prop="email" required><el-input v-model="model.email" /></el-form-item>
          <el-form-item label="备注"><el-input placeholder="请输入" /></el-form-item>
        </el-form>
      </span>
    </template>
    <template #arco>
      <span data-pair="form" class="desc-box" :data-target="parts('arco')">
        <a-form ref="formArco" :model="modelArco" :rules="rulesArco" :label-col-props="{ flex: '80px' }" :wrapper-col-props="{ flex: 1 }">
          <a-form-item label="用户名" field="name"><a-input v-model="modelArco.name" placeholder="请输入" /></a-form-item>
          <a-form-item label="邮箱" field="email"><a-input v-model="modelArco.email" /></a-form-item>
          <a-form-item label="备注"><a-input placeholder="请输入" /></a-form-item>
        </a-form>
      </span>
    </template>
  </CompareCase>
</template>
