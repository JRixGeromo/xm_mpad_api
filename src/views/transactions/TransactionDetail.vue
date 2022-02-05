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
    <div class="payment-card" v-if="transactionDetail && transactionProduct.images">
      <el-row style="justify-content: center;" class="py-40">
          <el-col :span="6" :xs="12">
              <div class="product-img-wrapper">
              <img class="product-img" :src="transactionProduct.images[0].productImageUrl">
              </div>
          </el-col>
          <el-col :span="6" class="px-10">
              <div
              style="text-align: left; line-height: 1.7; justify-content: space-between; font-size: 16px;"
              class="sub-label-light d-flex-column h-100"
              >
              <div>
                  <div>{{ transactionProduct.name }}</div>
                  <div>{{ transactionProduct.license }}, {{ transactionProduct.scale }} Scale</div>
              </div>
              <div class="font-bold hidden-xs-only">{{ `SGD$${transactionProduct.listingPrice.toFixed(2)}` }}</div>
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
                      <div>{{transactionSeller.userName}}</div>
                  </div>
                  <div class="px-10">
                      <div class="font-bold">Buyer</div>
                      <div>{{transactionBuyer.userName}}</div>
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
                <p style="font-weight: 400; font-size: 16px;">{{ transactionDetail.status }}</p>
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
                  <el-step> 01/01/2021 13:45
                      Transaction hash: a1234t235g32f9v4cv
                      desmondzth made an offer of SGD$700.00
                  </el-step>
                </el-steps>
              </div>
          </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import productServices from '@/services/product-service';
import profileServices from '@/services/profile-service';
import transactionServices from '@/services/transaction-service';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const transactionList = ref([]);
    const transactionDetail = ref([]);
    const transactionProduct = ref([]);
    const transactionSeller = ref([]);
    const transactionBuyer = ref([]);

    const getUserSoldTransactions = async () => {
      transactionList.value = await transactionServices.getUserSoldTransactions();
      console.log('transactionProduct1', transactionList.value);
      if (transactionList.value) {
        transactionList.value.forEach(async (element) => {
          if (element.transactionId === route.params.id) {
            transactionDetail.value = element;
            console.log('transactionDetail', transactionDetail.value);
            transactionProduct.value = await productServices.getProductById(transactionDetail.value.productId);
            console.log('transactionProduct', transactionProduct.value);
            transactionSeller.value = await profileServices.getProfilebyUserId(transactionDetail.value.sellerUserId);
            console.log('transactionSeller', transactionSeller.value);
            transactionBuyer.value = await profileServices.getProfilebyUserId(transactionDetail.value.buyerUserId);
            console.log('transactionBuyer', transactionBuyer.value);
          }
        });
      }
    };

    const getUserBoughtTransactions = async () => {
      transactionList.value = await transactionServices.getUserBoughtTransactions();
      console.log('transactionProduct2', transactionList.value);
      if (transactionList.value) {
        transactionList.value.forEach(async (element) => {
          if (element.transactionId === route.params.id) {
            transactionDetail.value = element;
            console.log('transactionDetail', transactionDetail.value);
            transactionProduct.value = await productServices.getProductById(transactionDetail.value.productId);
            console.log('transactionProduct', transactionProduct.value);
            transactionSeller.value = await profileServices.getProfilebyUserId(transactionDetail.value.sellerUserId);
            console.log('transactionSeller', transactionSeller.value);
            transactionBuyer.value = await profileServices.getProfilebyUserId(transactionDetail.value.buyerUserId);
            console.log('transactionBuyer', transactionBuyer.value);
          }
        });
      }
    };

    onMounted(async () => {
      getUserSoldTransactions();
      getUserBoughtTransactions();
    });

    const store = useStore();
    const isMobileView = computed(() => store.state.layout.isMobileView);

    return {
      transactionDetail,
      transactionProduct,
      isMobileView,
      transactionSeller,
      transactionBuyer,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
