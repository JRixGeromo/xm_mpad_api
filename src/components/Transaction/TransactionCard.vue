<template>
  <div class="payment-card" v-if="transactionDetail && transactionProduct.images">
    <el-row>
      <el-col :span="6" :xs="12">
        <div class="product-img-wrapper d-flex-column">
          <div class="hidden-sm-and-down">{{ dayjs(transactionDetail.createdDate).format('DD/MM/YYYY') }}</div>
          <img class="product-img" :src="transactionProduct.images[0].productImageUrl" />
        </div>
      </el-col>
      <el-col :span="6" class="px-10 hidden-sm-and-down">
        <div
          style="text-align: left; line-height: 1.7; justify-content: space-between;"
          class="sub-label-light fs-16 d-flex-column h-100"
        >
          <div>
            <div :title="transactionProduct.productId">{{ transactionProduct.name }}</div>
            <div>{{ transactionProduct.series.license.name }}, {{ transactionProduct.scale }} Scale</div>
          </div>
          <div class="font-bold fm-montserrat">SGD${{ transactionProduct.listingPrice.toLocaleString() }}</div>
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
                <div>{{transactionSeller.userName}}</div>
              </div>
              <div class="px-10">
                <div class="font-bold">Buyer</div>
                <div>{{transactionBuyer.userName}}</div>
              </div>
            </div>

            <div class="hidden-sm-and-up d-flex">
              <div class="px-10 fs-12">
                <div class="font-bold">Seller</div>
                <div>{{transactionSeller.userName}}</div>
              </div>
              <div class="px-10 fs-12">
                <div class="font-bold">Buyer</div>
                <div>{{transactionBuyer.userName}}</div>
              </div>
            </div>

            <div class="px-10 hidden-sm-and-down">
              <div class="font-bold fs-20 font-m">Status</div>
              <div>{{ transactionStatus }}</div>
            </div>
            <div class="px-10 hidden-sm-and-down">
              <div>{{ dayjs(transactionDetail.paymentDate).format('DD/MM/YYYY hh:mm A') }}</div>
            </div>
          </div>
      </el-col>
      <el-col :span="12" class="hidden-sm-and-up">
        <div
              style="text-align: left; line-height: 1.7;"
              class="sub-label-light fs-12 d-flex-column h-100"
          >
            <div class="d-flex">
              <div>
                <div>{{ transactionProduct.name }}</div>
                <div>{{ transactionProduct.series.license.name }}, {{ transactionProduct.scale }} Scale</div>
                <div class="font-bold fm-montserrat fs-16">SGD${{ transactionProduct.listingPrice.toLocaleString() }}</div>
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
                <div class="font-bold fs-16 font-m">Status</div>
              <div class="fs-12">{{ transactionStatus }}</div>
              </div>
            </div>
          </div>
      </el-col>
      <el-col :span="6" :xs="24" style="align-self: center;" class="py-10">
        <div
          style="line-height: 1.7; text-align: center;"
          class="sub-label-light fs-16"
        >
          <router-link :to="`/transaction/${transactionDetail.transactionId}`">
            <el-button plain class="font-bold payment-v-button custom-btn">VIEW</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import productServices from '@/services/product-service';
import profileServices from '@/services/profile-service';
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
  setup(props) {
    const transactionProduct = ref([]);
    const transactionSeller = ref([]);
    const transactionBuyer = ref([]);
    const transactionStatus = ref('');

    const getTransactions = async () => {
      transactionProduct.value = await productServices.getProductById(props.transactionDetail.productId);
      transactionSeller.value = await profileServices.getProfilebyUserId(props.transactionDetail.sellerUserId);
      transactionBuyer.value = await profileServices.getProfilebyUserId(props.transactionDetail.buyerUserId);
      transactionStatus.value = props.transactionDetail.status.replace('_', ' ').replace('_', ' ');
    };

    onMounted(async () => {
      getTransactions();
    });

    return {
      transactionProduct,
      transactionSeller,
      transactionBuyer,
      dayjs,
      transactionStatus,
    };
  },
};
</script>
