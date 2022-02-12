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
          <el-col :span="12" :xs="24">
              <div style="
                justify-content: center;
                text-align: center;
                font-weight: 700;
                padding: 5px 0;
                background-color:#D76262;
                border-radius: 10px;
                "
              >
                <p style="font-weight: 700; font-size: 16px;">Status:</p>
                <p style="font-weight: 400; font-size: 16px;">{{ transactionDetail.status }}</p>
              </div>
          </el-col>
      </el-row>
    </div>
    <div style="margin-bottom:50px;">
      <el-row style="justify-content: center;">
          <el-col :span="14" :xs="24">
              <div style="height:300px; margin:40px 0;">
                <ul class="events">
                  <li>
                    <time datetime="10:03"></time>
                    <span>
                      <div
                        style="color:#000;line-height:24px;font-weight:400; margin-top:-5px;"
                        class="font-p">
                        02/01/2021 16:45 <br/>
                        Transaction number: a1234t235g32f9v4cv <br/>
                        desmondzth made a payment of SGD$700.00 via Credit Card <br/>
                      <router-link to="/transactions">
                        <div
                          style="color:rgb(7, 115, 255)"><u>View payment details</u></div>
                      </router-link>
                      </div>
                    </span>
                  </li>
                  <li>
                    <time datetime="10:03"></time>
                    <span>
                      <div
                        style="color:#000;line-height:24px;font-weight:400; margin-top:-5px;"
                        class="font-p">
                        02/01/2021 16:19 <br/>
                        Transaction number: a1234t235g32f9v4cv <br/>
                        sellerusername accepted offer of SGD$700.00
                      </div>
                    </span>
                  </li>
                  <li>
                    <time datetime="10:03"></time>
                    <div
                      style="color:#000;line-height:24px;font-weight:400; margin-left:20px; margin-top:-5px;"
                      class="font-p">
                      01/01/2021 13:45 <br/>
                      Transaction number: a1234t235g32f9v4cv <br/>
                      desmondzth made an offer of SGD$700.00
                    </div>
                  </li>
                  <!-- <li>
                    <time datetime="10:03"></time>
                    <span>Here 4</span>
                  </li> -->
                </ul>

                <!-- <el-steps direction="vertical">
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
                  <el-step description="01/01/2021 13:45
                      Transaction hash: a1234t235g32f9v4cv
                      desmondzth made an offer of SGD$700.00">
                  </el-step>
                </el-steps> -->
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
    const transactionProduct = ref([]);
    const transactionSeller = ref([]);
    const transactionBuyer = ref([]);
    const transactionDetail = ref([]);

    onMounted(async () => {
      transactionDetail.value = await transactionServices.getTransactionById(route.params.id);
      transactionProduct.value = await productServices.getProductById(transactionDetail.value.productId);
      transactionSeller.value = await profileServices.getProfilebyUserId(transactionDetail.value.sellerUserId);
      transactionBuyer.value = await profileServices.getProfilebyUserId(transactionDetail.value.buyerUserId);
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
  .events li {
    display: flex;
    color: #999;
  }

  .events time {
    position: relative;
    padding: 0;  }

  .events time::after {
    content: "";
    position: absolute;
    z-index: 2;
    right: 0;
    top: 0;
    transform: translateX(50%);
    border-radius: 50%;
    background: #fff;
    border: 1px #ccc solid;
    width: .8em;
    height: .8em;
  }

  .events span {
    padding: 0 1.5em 1.5em 1.5em;
    position: relative;
  }

  .events span::before {
    content: "";
    position: absolute;
    z-index: 1;
    left: 0;
    height: 100%;
    border-left: 1px #ccc solid;
  }

  .events strong {
    display: block;
    font-weight: bolder;
  }

  /* .events { margin: 1em; width: 50%; } */
  .events,
  .events *::before,
  .events *::after { box-sizing: border-box; font-family: arial; }
</style>
