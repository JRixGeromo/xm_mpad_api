<template>
  <div class="product-card">
    <div class="product-card-wrapper">
        <div class="product-img-wrapper">
          <img class="product-img" :src="productDetail.images[0].productImageUrl" />
        </div>
        <div style="text-align: left; line-height: 1.7" class="sub-label-light fs-16">
          <div>{{ productDetail.name }}</div>
          <div>{{ productDetail.characters[0].license.name }}, {{ productDetail.scale }} Scale</div>
        </div>
        <div
          style="padding-bottom: 10px; text-align: right; line-height: 2.5"
          class="sub-header fs-16"
        >
          <div>SGD${{ productDetail.listingPrice.toLocaleString() }}</div>
        </div>
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
};
</script>
