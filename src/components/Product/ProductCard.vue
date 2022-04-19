<template>
  <div class="product-card">
    <div class="product-card-wrapper">
        <div class="product-img-wrapper">
          <img class="product-img" :src="data.imgUrl" />
        </div>
        <div style="text-align: left; line-height: 1.7" class="sub-label-light fs-16">
          <div><span>{{ data.name }}</span></div>
          <div>{{ data.licenseName }}, {{ data.scale }} Scale</div>
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
import { ref } from 'vue';

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
  setup(props) {
    const data = ref({
      name: props.productDetail.name,
      imgUrl: props.productDetail.images[0].productImageUrl,
      licenseName: props.productDetail.characters.length > 0 ? props.productDetail.characters[0].license.name : '',
      scale: props.productDetail.scale,
    });

    return {
      data,
    };
  },
};
</script>
