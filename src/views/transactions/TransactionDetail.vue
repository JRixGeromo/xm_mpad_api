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
        <p class="fs-20" style="font-weight:400; color:#000;">
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
                  <div>{{ transactionProduct.series.license.name }}, {{ transactionProduct.scale }} Scale</div>
              </div>
              <div class="font-bold fm-montserrat hidden-xs-only">{{ `SGD$${transactionProduct.listingPrice.toFixed(2)}` }}</div>
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
                border-radius: 10px;
                "
                v-bind:class="[transactionDetail.status!='Item_Ship_Out' ? 'trans-red-color' : 'trans-yellow-color']"
              >
                <p class="fs-20 fw-700 fm-montserrat">Status:</p>
                <p style="font-weight: 300; font-size: 16px;">{{ transactionStatus }}</p>
              </div>
          </el-col>
      </el-row>
    </div>
    <div style="margin-bottom:50px;">
      <el-row style="justify-content: center;">
          <el-col :span="12" :xs="24">
              <div style="height:300px; margin:40px 0;">
                <ul
                  class="events"
                  v-bind:class="[transactionDetail.status!='Item_Ship_Out' ? 'events_r' : 'events_y']"
                >
                  <li v-for="(transactionEvent, index) in transactionDetail.transactionEvents" :key="transactionEvent">
                    <time :datetime="transactionEvent.createdDate"></time>
                    <span v-if="index !== transactionDetail.transactionEvents.length - 1">
                    </span>
                    <div
                        :class="index === 0 ? 'fw-700' : 'fw-300'"
                        style="
                          color:#000;
                          line-height:24px;
                          margin-top:-5px;
                          margin-left:20px;
                          margin-bottom:20px;"
                        class="font-p">
                        {{dayjs(transactionEvent.createdDate).format('DD/MM/YYYY hh:mm')}} <br/>
                        Transaction number: {{transactionDetail.refNo}} <br/>
                        {{transactionEvent.event}}. <br/>
                        <div
                          v-if="index === 0 && transactionDetail.status!='Item_Ship_Out'"
                          @click="dialogVisiblePaymentDetails = true;"
                          style="color:#006FBF; cursor:pointer; font-weight:300;"><u>View payment details</u>
                        </div>
                      </div>
                  </li>
                </ul>
              </div>
          </el-col>
      </el-row>
    </div>
  </div>
  <div id="dialogPayment">
    <el-dialog
      v-model="dialogVisiblePaymentDetails"
      title="Payment Details"
      :width="isMobileView ? '90%' : '50%'"
    >
      <div>
        <el-row>
          <el-col :span="9" :offset="2">
            <span>Transaction ID:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>{{transactionDetail.refNo}} </span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>Date and Time:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>{{dayjs(transactionDetail.createdDate).format('DD/MM/YYYY hh:mm A')}} </span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>Amount:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>SGD${{transactionDetail.price}}</span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>XM Comission:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>{{configuration[0].configurations[0].value}}%</span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>Seller Receives:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>SGD${{ sellerReceives }}</span>
          </el-col>
        </el-row>
      </div>
      <br>
      <div>
        <el-row>
          <el-col :span="9" :offset="2">
            <span>Payment Type:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>{{ paymentInfo.name }}</span>
          </el-col>
          <!-- <el-col :span="9" :offset="2">
            <span>Credit Card Type:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>Visa</span>
          </el-col> -->
          <el-col :span="9" :offset="2">
            <span>Account Number:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>{{ paymentInfo.acctNo }}</span>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="font-bold reject-btn custom-btn"
            :disabled="transactionDetail.status!='Item_Received'"
            @click="rejectTransaction(transactionDetail.transactionId)">REJECT
          </el-button>
          <el-button
            class="font-bold approve-btn custom-btn"
            :disabled="transactionDetail.status!='Item_Received'"
            @click="
              dialogVisiblePaymentDetails = false;
              dialogVisiblePaymentApproved = true;
          ">APPROVE</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- eslint-disable max-len -->
    <el-dialog
      v-model="dialogVisiblePaymentApproved"
      title="Approve?"
      :width="isMobileView ? '100%' : '60%'"
    >
    <div style="margin-bottom: 20px; color: #000;">
      <span>Upon confirming, buyer '{{transactionBuyer.userName}}'s payment of SGD${{ sellerReceives }} (after {{configuration[0].configurations[0].value}}% comission fee) will be released to seller <span style="text-decoration: underline;">'{{transactionSeller.userName}}'</span>.</span>
    </div>
      <el-input
        v-model="remarks"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
        placeholder="Remarks to buyer and seller (optional)"
      />
    <template #footer>
      <span class="dialog-footer">
        <el-button
          class="font-bold reject-btn custom-btn"
          @click="dialogVisiblePaymentApproved = false;
          ">CANCEL</el-button>
        <el-button
          class="font-bold approve-btn custom-btn"
          @click="approveTransaction(transactionDetail.transactionId)">CONFIRM</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import productServices from '@/services/product-service';
import profileServices from '@/services/profile-service';
import transactionServices from '@/services/transaction-service';
import configurationServices from '@/services/configuration-service';
import { useRoute, useRouter } from 'vue-router';
import dayjs from 'dayjs';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const transactionProduct = ref([]);
    const payoutMethods = ref([]);
    const transactionSeller = ref([]);
    const transactionBuyer = ref([]);
    const transactionDetail = ref([]);
    const configuration = ref([]);
    const sellerReceives = ref(0);
    const dialogVisiblePaymentDetails = ref(false);
    const dialogVisiblePaymentApproved = ref(false);
    const transactionStatus = ref('');
    const paymentInfo = ref({
      name: '',
      acctNo: '',
    });
    const paymentType = ref([]);
    const remarks = ref('');

    onMounted(async () => {
      transactionDetail.value = await transactionServices.getTransactionById(route.params.id);
      transactionProduct.value = await productServices.getProductById(transactionDetail.value.productId);
      transactionSeller.value = await profileServices.getProfilebyUserId(transactionDetail.value.sellerUserId);
      transactionBuyer.value = await profileServices.getProfilebyUserId(transactionDetail.value.buyerUserId);
      payoutMethods.value = await transactionServices.getPayoutMethods();
      configuration.value = await configurationServices.getConfigurationByName('Platform Settings');
      transactionStatus.value = transactionDetail.value.status.replace('_', ' ').replace('_', ' ');
      sellerReceives.value = (transactionDetail.value.price - (configuration.value[0].configurations[0].value
      / transactionDetail.value.price) * 100).toFixed(2);
      if (transactionBuyer.value.payoutInfo) {
        paymentType.value = payoutMethods.value.filter((x) => x.payoutMethodType.includes(transactionBuyer.value.payoutInfo.payoutMethod));
        paymentInfo.value = {
          name: paymentType.value[0].name,
          acctNo: `**********${transactionBuyer.value.payoutInfo.accountNumber.slice(-4)}`,
        };
      }
    });

    const approveTransaction = async (transactionId) => {
      const obj = {
        transactionId,
        remark: remarks.value,
      };
      await transactionServices.approveTransaction(obj);
      dialogVisiblePaymentApproved.value = false;
      router.push('/transactions');
    };

    const rejectTransaction = async (transactionId) => {
      const obj = {
        transactionId,
        remark: '',
      };
      await transactionServices.rejectTransaction(obj);
      dialogVisiblePaymentDetails.value = false;
      router.push('/transactions');
    };

    const store = useStore();
    const isMobileView = computed(() => store.state.layout.isMobileView);

    return {
      transactionDetail,
      transactionProduct,
      isMobileView,
      transactionSeller,
      transactionBuyer,
      configuration,
      sellerReceives,
      dialogVisiblePaymentDetails,
      dialogVisiblePaymentApproved,
      dayjs,
      transactionStatus,
      approveTransaction,
      rejectTransaction,
      remarks,
      payoutMethods,
      paymentInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
  .events li {
    display: flex;
    color: #999;
    position: relative;
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
    background-color: #fff;
    border: 3px #00000099 solid;
    width: .8em;
    height: .8em;
  }

  .events li:first-of-type::before {
    content: "";
    position: absolute;
    z-index: 3;
    left: -23px;
    top: -4px;
    transform: translateX(50%);
    border-radius: 50%;
    // background-color: #D76262;
    // border: 3px #D76262 solid;
    width: 1.4em;
    height: 1.4em;;
  }

  .events_y li:first-of-type::before {
    background-color: #FDE07B;
    border: 3px #FDE07B solid;
  }

  .events_r li:first-of-type::before {
    background-color: #D76262;
    border: 3px #D76262 solid;
  }

  .events span {
    position: relative;
  }

  .events span::before {
    content: "";
    position: absolute;
    z-index: 1;
    left: -2px;
    height: 100%;
    border-left: 3px #00000099 solid;
  }

  .events strong {
    display: block;
    font-weight: bolder;
  }

  /* .events { margin: 1em; width: 50%; } */
  .events,
  .events *::before,
  .events *::after { box-sizing: border-box; font-family: arial; }

  .trans-yellow-color {
    background-color: #FDE07B;
  }
  .trans-red-color {
    background-color: #D76262;
  }
</style>
