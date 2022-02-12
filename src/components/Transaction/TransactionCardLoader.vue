<template>
  <div style="padding:20px; border:1px solid rgb(196, 196, 196); margin-bottom: 10px;">
    <el-skeleton animated :rows="24" style="margin-bottom: 16px;">
      <template #template>
        <div style=" display: flex; justify-items: space-between;">
            <el-skeleton-item variant="image" style="width: 300px; height: 200px; margin-right: 16px;" />
            <div style="width: 100%; display:flex; flex-direction:column; justify-content: space-between;">
              <div style="display:flex; flex-direction:column;">
                <el-skeleton-item variant="text" style="width: 30%; margin-bottom:20px;"/>
                <div style="display:flex;">
                  <el-skeleton-item variant="text" style="width: 30%; margin-right:20px;"/>
                  <el-skeleton-item variant="text" style="width: 30%; margin-right:20px;"/>
                  <el-skeleton-item variant="text" style="width: 30%; margin-bottom:20px;"/>
                </div>
              </div>
              <div style="display:flex;">
                <el-skeleton-item variant="text" style="width: 30%; margin-right:20px;"/>
                <el-skeleton-item variant="text" style="width: 30%; margin-right:20px;"/>
                <el-skeleton-item variant="text" style="width: 30%; margin-bottom:20px;"/>
              </div>
              <el-skeleton-item variant="text" style="width: 30%;"/>
            </div>
          </div>
      </template>
    </el-skeleton>
  </div>
</template>
