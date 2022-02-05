<template>
  <div>
    <el-skeleton animated>
      <template #template>
        <div class="product-card">
          <div class="product-card-wrapper">
            <div class="product-img-wrapper">
              <el-skeleton-item variant="image" style="width: 100%; height: 100%;" />
            </div>
            <div class="left-text sub-label-light fs-16">
              <div><el-skeleton-item variant="text" style="width: 50%; margin-top: 5px;" /></div>
              <div><el-skeleton-item variant="text" style="width: 50%;" /></div>
            </div>
            <div class="sub-header fs-16 right-text">
              <div>
                <el-skeleton-item variant="text" style="width: 50%" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
