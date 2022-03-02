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
          <el-col :span="12" :xs="24">
              <div style="height:300px; margin:40px 0;">
                <ul class="events">
                  <li v-for="(transactionEvent, index) in transactionDetail.transactionEvents" :key="transactionEvent">
                    <time :datetime="transactionEvent.createdDate"></time>
                    <span v-if="index !== transactionDetail.transactionEvents.length - 1">
                    </span>
                    <div
                        style="
                          color:#000;
                          line-height:24px;
                          font-weight:400;
                          margin-top:-5px;
                          margin-left:20px;
                          margin-bottom:20px;"
                        class="font-p">
                        {{dayjs(transactionEvent.createdDate).format('DD/MM/YYYY hh:mm A')}} <br/>
                        Transaction number: {{transactionDetail.refNo}} <br/>
                        {{transactionEvent.event}} <br/>
                        <div
                          @click="dialogVisiblePaymentDetails = true;"
                          style="color:rgb(7, 115, 255); cursor:pointer;"><u>View payment details</u>
                        </div>
                      </div>
                  </li>
                  <!-- <li>
                    <time datetime="10:03"></time>
                    <span>
                      <div
                        style="color:#000;line-height:24px;font-weight:400; margin-top:-5px;"
                        class="font-p">
                        02/01/2021 16:45 <br/>
                        Transaction number: a1234t235g32f9v4cv <br/>
                        desmondzth made a payment of SGD$700.00 via Credit Card <br/>
                        <div
                          @click="dialogVisiblePaymentDetails = true;"
                          style="color:rgb(7, 115, 255); cursor:pointer;"><u>View payment details</u>
                        </div>
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
                  </li> -->
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
      :width="isMobileView ? '100%' : '50%'"
    >
      <div>
        <el-row>
          <el-col :span="9" :offset="2">
            <span>Transaction ID:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>123456</span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>Date and Time:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>02/01/2021 13:55</span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>Amount:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>SGD$4000.00</span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>XM Comission:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>5%</span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>Seller Receives:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>SGD$3800.00</span>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-row>
          <el-col :span="9" :offset="2">
            <span>Payment Type:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>Credit Card</span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>Credit Card Type:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>Visa</span>
          </el-col>
          <el-col :span="9" :offset="2">
            <span>Account Number:</span>
          </el-col>
          <el-col :span="11" :offset="2">
            <span>***********1234</span>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="font-bold reject-btn custom-btn"
            @click="dialogVisiblePaymentDetails = false;
          ">REJECT
          </el-button>
          <el-button
            class="font-bold approve-btn custom-btn"
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
      <span>Upon confirming, buyer 'desmondtzh' 's payment of SGD$3800.00 (after 5% comission fee) will be released to seller <span style="text-decoration: underline;">'sellerusername'</span>.</span>
    </div>
      <el-input
        v-model="textarea1"
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
          @click="
            dialogVisiblePaymentApproved = false;
        ">CONFIRM</el-button>
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
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';

export default {
  setup() {
    const route = useRoute();
    const transactionProduct = ref([]);
    const transactionSeller = ref([]);
    const transactionBuyer = ref([]);
    const transactionDetail = ref([]);
    const dialogVisiblePaymentDetails = ref(false);
    const dialogVisiblePaymentApproved = ref(false);

    onMounted(async () => {
      transactionDetail.value = await transactionServices.getTransactionById(route.params.id);
      transactionProduct.value = await productServices.getProductById(transactionDetail.value.productId);
      transactionSeller.value = await profileServices.getProfilebyUserId(transactionDetail.value.sellerUserId);
      transactionBuyer.value = await profileServices.getProfilebyUserId(transactionDetail.value.buyerUserId);
      console.log('transactionDetail', transactionDetail.value);
      console.log('transactionProduct', transactionProduct.value);
      console.log('transactionSeller', transactionSeller.value);
      console.log('transactionBuyer', transactionBuyer.value);
    });

    const store = useStore();
    const isMobileView = computed(() => store.state.layout.isMobileView);

    return {
      transactionDetail,
      transactionProduct,
      isMobileView,
      transactionSeller,
      transactionBuyer,
      dialogVisiblePaymentDetails,
      dialogVisiblePaymentApproved,
      dayjs,
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
