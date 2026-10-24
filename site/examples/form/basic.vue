<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
const form = ref<FormInstance>()
const model = reactive({ name: '', email: '' })
const status = ref('')
const rules: FormRules = {
  name: [{ required: true, message: 'Please enter your name', trigger: 'blur' }],
  email: [{ required: true, message: 'Please enter your email', trigger: 'blur' }, { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }],
}
// Invalid fields show their own error messages.
function submit() {
  form.value?.validate((valid) => { status.value = valid ? 'Form submitted' : 'Please correct the fields' })
}
</script>

<template>
  <el-form ref="form" :model="model" :rules="rules" label-width="90px" style="width: 100%; max-width: 440px">
    <el-form-item label="Name" prop="name"><el-input v-model="model.name" placeholder="Your name" /></el-form-item>
    <el-form-item label="Email" prop="email"><el-input v-model="model.email" placeholder="name@example.com" /></el-form-item>
    <el-form-item><el-button type="primary" @click="submit">Submit</el-button><el-text aria-live="polite">{{ status }}</el-text></el-form-item>
  </el-form>
</template>
