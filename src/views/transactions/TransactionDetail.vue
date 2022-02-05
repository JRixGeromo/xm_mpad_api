<template>
  <div class="px-40">
    <el-row>
      <el-col :span="24" class="hidden-sm-and-down">
        <span>
          <el-button
            size="mini"
            icon="xm-el-icon-s-search"
            style="border-color: #fff"
            class="transparent"
          ></el-button>
        </span>
      </el-col>
    </el-row>
    <el-row>
      <router-link to="/transactions">
        <p>
          <i class="fa fa-arrow-left" aria-hidden="true"></i> Back to Transactions
        </p>
      </router-link>
    </el-row>
    <div class="payment-card" v-if="productDetail">
      <el-row style="justify-content: center;" class="py-40">
          <el-col :span="6" :xs="12">
              <div class="product-img-wrapper">
              <img class="product-img" :src="productDetail.images[0].productImageUrl">
              </div>
          </el-col>
          <el-col :span="6" class="px-10">
              <div
              style="text-align: left; line-height: 1.7; justify-content: space-between; font-size: 16px;"
              class="sub-label-light d-flex-column h-100"
              >
              <div>
                  <div>{{ productDetail.name }}</div>
                  <div>{{ productDetail.license }}, {{ productDetail.scale }} Scale</div>
              </div>
              <div class="font-bold hidden-xs-only">{{ `SGD$${productDetail.listingPrice.toFixed(2)}` }}</div>
              </div>
          </el-col>
          <el-col :span="6" :xs="24" class="py-10">
              <div
                  style="text-align: left; line-height: 1.7; font-size: 16px;"
                  class="sub-label-light d-flex-column h-100 d-justify-content"
              >
                  <div class="d-flex" style="justify-content: space-evenly">
                  <div class="px-10">
                      <div class="font-bold">Seller</div>
                      <div>sellerusername</div>
                  </div>
                  <div class="px-10">
                      <div class="font-bold">Buyer</div>
                      <div>desmondtzh</div>
                  </div>
                  </div>
              </div>
          </el-col>
      </el-row>
    </div>
    <div>
      <el-row style="justify-content: center;">
          <el-col :span="14" :xs="24">
              <div style="
                justify-content: center;
                text-align: center;
                font-weight: 700;
                padding: 5px 0;
                background-color:#FDE07B;
                border-radius: 10px;
                "
              >
                <p style="font-weight: 700; font-size: 16px;">Status:</p>
                <p style="font-weight: 400; font-size: 16px;">Payment Made - Awaiting product shipment</p>
              </div>
          </el-col>
      </el-row>
    </div>
    <div>
      <el-row style="justify-content: center;">
          <el-col :span="14" :xs="24">
              <div style="height:300px; margin:40px 0; white-space: pre;">
                <el-steps direction="vertical">
                  <el-step description=" 02/01/2021 16:45
                      Transaction hash: a1234t235g32f9v4cv
                      desmondzth made a payment of SGD$700.00 via Credit Card
                      View payment details
                    ">
                  </el-step>
                  <el-step description=" 02/01/2021 16:19
                      Transaction hash: a1234t235g32f9v4cv
                      sellerusername accepted offer of SGD$700.00
                    ">
                  </el-step>
                  <el-step description=" 01/01/2021 13:45
                      Transaction hash: a1234t235g32f9v4cv
                      desmondzth made an offer of SGD$700.00
                    ">
                  </el-step>
                </el-steps>
              </div>
          </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const productDetail = ref(null);

    onMounted(async () => {
      const productRes = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/eee4f54c-3f38-4e84-147b-08d9e20d6ffe/product`);
      productDetail.value = productRes.data;
    });

    const store = useStore();
    const isMobileView = computed(() => store.state.layout.isMobileView);

    return {
      productDetail,
      isMobileView,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
