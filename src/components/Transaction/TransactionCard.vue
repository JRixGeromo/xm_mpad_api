<template>
  <div class="payment-card" v-if="transactionDetail">
    <el-row>
      <el-col :span="6" :xs="12">
        <div class="product-img-wrapper">
          <img class="product-img" :src="transactionDetail[2].images[0].productImageUrl" />
        </div>
      </el-col>
      <el-col :span="6" class="px-10 hidden-sm-and-down">
        <div
          style="text-align: left; line-height: 1.7; justify-content: space-between;"
          class="sub-label-light fs-16 d-flex-column h-100"
        >
          <div>
            <div>{{ transactionDetail[2].name }}</div>
            <div>{{ transactionDetail[2].license }}, {{ transactionDetail[2].scale }} Scale</div>
          </div>
          <div class="font-bold">SGD${{ transactionDetail[2].listingPrice.toLocaleString() }}</div>
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
                <div>{{transactionDetail[1].userName}}</div>
              </div>
              <div class="px-10">
                <div class="font-bold">Buyer</div>
                <div>{{transactionDetail[0].userName}}</div>
              </div>
            </div>

            <div class="hidden-sm-and-up">
              <div class="px-10">
                <div class="font-bold">Seller</div>
                <div>{{transactionDetail[1].userName}}</div>
              </div>
              <div class="px-10">
                <div class="font-bold">Buyer</div>
                <div>{{transactionDetail[0].userName}}</div>
              </div>
            </div>

            <div class="px-10 hidden-sm-and-down">
              <div class="font-bold fs-20 font-m">Status</div>
              <div>{{ transactionDetail[2].status }}</div>
            </div>
            <div class="px-10 hidden-sm-and-down">
              <div>{{ dayjs(transactionDetail[2].paymentDate).format('DD/MM/YYYY hh:mm A') }}</div>
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
                <div>{{ transactionDetail[2].name }}</div>
                <div>{{ transactionDetail[2].license }}, {{ transactionDetail[2].scale }} Scale</div>
                <div class="font-bold">SGD${{ transactionDetail[2].listingPrice.toLocaleString() }}</div>
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
              <div>{{ transactionDetail[2].status }}</div>
              </div>
            </div>
          </div>
      </el-col>
      <el-col :span="6" :xs="24" style="align-self: center;" class="py-10">
        <div
          style="line-height: 1.7; text-align: center;"
          class="sub-label-light fs-16"
        >
          <router-link :to="`/transaction/${transactionDetail[2].transactionId}`">
            <el-button plain class="font-bold payment-v-button custom-btn">VIEW</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* import { ref, onMounted } from 'vue';
import productServices from '@/services/product-service';
import profileServices from '@/services/profile-service'; */
import dayjs from 'dayjs';

export default {
  props: {
    transactionDetail: {
      type: Object,
      required: true,
    },
    redirectUrl: {
      type: String,
      default: null,
    },
  },
  setup(/* props */) {
    /* const transactionProduct = ref([]);
    const transactionSeller = ref([]);
    const transactionBuyer = ref([]);

    const getTransactions = async () => {
      transactionProduct.value = await productServices.getProductById(props.transactionDetail.productId);
      transactionSeller.value = await profileServices.getProfilebyUserId(props.transactionDetail.sellerUserId);
      transactionBuyer.value = await profileServices.getProfilebyUserId(props.transactionDetail.buyerUserId);
    };

    onMounted(async () => {
      getTransactions();
    }); */

    return {
      /* transactionProduct,
      transactionSeller,
      transactionBuyer, */
      dayjs,
    };
  },
  /* watch: {
    transactionDetail() {
      this.getTransactions();
    },
  }, */
};
</script>
