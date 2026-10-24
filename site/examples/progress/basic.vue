<template>
  <div style="width: 100%; display: grid; gap: 16px">
    <el-progress :percentage="40" :stroke-width="4" />
    <el-progress :percentage="100" :stroke-width="4" status="success" />
    <el-progress :percentage="60" :stroke-width="4" status="warning" />
    <el-progress :percentage="30" :stroke-width="4" status="exception" />
  </div>
</template>
