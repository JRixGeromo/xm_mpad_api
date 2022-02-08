<template>
  <div class="product-card-transaction">
    <div class="product-card-transacation-wrapper">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="product-img-wrapper">
                    <img class="product-img" :src="productDetail.images[0].productImageUrl" />
                </div>
            </el-col>
            <el-col :span="4">
                <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                    <div style="text-align: left; line-height: 1.7" class="sub-label-light fs-16">
                        <div>{{ productDetail.name }}</div>
                        <div>{{ productDetail.license }}, {{ productDetail.scale }} Scale</div>
                    </div>
                    <div style="text-align: left; line-height: 1.7" class="sub-header fs-16">
                        <div>SGD${{ productDetail.listingPrice.toLocaleString() }}</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div style="display: flex; flex-direction: column; justify-content: space-evenly; height: 100%;">
                    <div style="text-align: left; line-height: 1.7">
                        <div class="sub-header fs-16">Seller</div>
                        <div>{{ productDetail.name }}</div>
                    </div>
                    <div style="text-align: left; line-height: 1.7">
                        <div class="sub-header fs-16">Status:</div>
                        <div>{{ productDetail.status }}</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <div style="display: flex; flex-direction: column; height: 100%;">
                    <div style="text-align: left; line-height: 1.7">
                        <div class="sub-header fs-16">Buyer</div>
                        <div>{{ productDetail.name }}</div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div style="padding-bottom: 10px; text-align: right; line-height: 2.5" class="sub-header fs-16">
                    <div><el-button>VIEW</el-button></div>
                </div>
            </el-col>
        </el-row>
    </div>
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
  data() {
    return {
      url: this.redirectUrl ? this.redirectUrl : `/product/${this.productDetail.productId}`,
    };
  },
  setup(props) {
    console.log(props.productDetail);
  },
};
</script>
