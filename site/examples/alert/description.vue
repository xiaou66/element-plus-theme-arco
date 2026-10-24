<template>
  <div style="width: 100%; display: grid; gap: 12px">
    <el-alert type="primary" title="Release available" description="A new version is ready to install." show-icon />
    <el-alert type="success" title="Saved" description="Your changes have been saved." show-icon :closable="false" />
  </div>
</template>
