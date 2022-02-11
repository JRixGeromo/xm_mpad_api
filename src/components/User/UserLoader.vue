<template>
  <el-skeleton style="--el-skeleton-circle-size: 100px; margin-bottom:10px;">
    <template #template>
      <div style="display:flex; flex-direction:column;align-items:center;">
        <el-skeleton-item variant="circle" style="width: 100px; height: 100px; margin-bottom:10px;" />
        <el-skeleton-item variant="text" style="width: 90%; margin-bottom:20px;"/>
      </div>
    </template>
  </el-skeleton>
</template>
