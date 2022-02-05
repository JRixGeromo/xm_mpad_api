<template>
  <div class="payment-card">
    <el-row>
      <el-col :span="6" :xs="12">
        <div class="product-img-wrapper">
          <img class="product-img" :src="productDetail.images[0].productImageUrl" />
        </div>
      </el-col>
      <el-col :span="6" class="px-10 hidden-sm-and-down">
        <div
          style="text-align: left; line-height: 1.7; justify-content: space-between;"
          class="sub-label-light fs-16 d-flex-column h-100"
        >
          <div>
            <div>{{ productDetail.name }}</div>
            <div>{{ productDetail.license }}, {{ productDetail.scale }} Scale</div>
          </div>
          <div class="font-bold">SGD${{ productDetail.listingPrice.toLocaleString() }}</div>
        </div>
      </el-col>
      <el-col :span="6" :xs="12">
          <div
              style="text-align: left; line-height: 1.7;"
              class="sub-label-light fs-16 d-flex-column h-100 d-justify-content"
          >
            <div class="d-flex hidden-sm-and-down">
              <div class="px-10">
                <div class="font-bold">Seller</div>
                <div>sellerusername</div>
              </div>
              <div class="px-10">
                <div class="font-bold">Buyer</div>
                <div>desmondtzh</div>
              </div>
            </div>

            <div class="hidden-sm-and-up">
              <div class="px-10">
                <div class="font-bold">Seller</div>
                <div>sellerusername</div>
              </div>
              <div class="px-10">
                <div class="font-bold">Buyer</div>
                <div>desmondtzh</div>
              </div>
            </div>

            <div class="px-10 hidden-sm-and-down">
              <div class="font-bold fs-20 font-m">Status</div>
              <div>{{ productDetail.status }}</div>
            </div>
          </div>
      </el-col>
      <el-col :span="12" class="hidden-sm-and-up">
        <div
              style="text-align: left; line-height: 1.7;"
              class="sub-label-light fs-16 d-flex-column h-100"
          >
            <div class="d-flex">
              <div>
                <div>{{ productDetail.name }}</div>
                <div>{{ productDetail.license }}, {{ productDetail.scale }} Scale</div>
                <div class="font-bold">SGD${{ productDetail.listingPrice.toLocaleString() }}</div>
              </div>
            </div>
          </div>
      </el-col>
      <el-col :span="12" class="px-10 hidden-sm-and-up">
        <div
              style="text-align: left; line-height: 1.7; justify-content: space-around; "
              class="sub-label-light fs-16 d-flex-column h-100"
          >
            <div class="d-flex">
              <div>
                <div class="font-bold fs-20 font-m">Status</div>
              <div>{{ productDetail.status }}</div>
              </div>
            </div>
          </div>
      </el-col>
      <el-col :span="6" :xs="24" style="align-self: center;" class="py-10">
        <div
          style="line-height: 1.7; text-align: center;"
          class="sub-label-light fs-16"
        >
          <router-link :to="{ path: '/payment/1'}">
            <el-button plain class="font-bold payment-v-button custom-btn">VIEW</el-button>
          </router-link>
        </div>
      </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  props: {
    productDetail: {
      type: Object,
      required: true,
    },
    redirectUrl: {
      type: String,
      default: null,
    },
  },
};
</script>
