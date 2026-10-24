<template>
  <el-scrollbar height="240px" always style="width: 100%">
    <p v-for="item in 20" :key="item" style="padding: 12px 16px">Item {{ item }}</p>
  </el-scrollbar>
</template>
