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
      <router-link to="/payments">
        <p>
          <i class="fa fa-arrow-left" aria-hidden="true"></i> Back to Payments
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
    <div v-if="paymentRejected || paymentApproved">
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
                <p v-if="paymentRejected">PAYMENT REJECTED ON 04/01/2021</p>
                <p v-if="paymentApproved">PAYMENT APPROVED ON 04/01/2021</p>
              </div>
          </el-col>
      </el-row>
    </div>
    <div>
      <el-row style="justify-content: center;">
          <el-col :span="14" :xs="24" style="border: 1px solid #000; margin-top: 20px;">
              <div style="
                justify-content: center;
                text-align: center;
                font-weight: 700;
                color: #fff;
                padding: 10px 0;
                background-color:#143649;
                "
              >
                <span>PAYMENT DETAILS</span>
              </div>
              <div>
                <el-row style="padding: 20px 0">
                  <el-col :span="8" :offset="2">
                    <span>Transaction ID:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>123456</span>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <span>Date and Time:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>02/01/2021 13:55</span>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <span>Amount:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>SGD$4000.00</span>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <span>XM Comission:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>5%</span>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <span>Seller Receives:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>SGD$3800.00</span>
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-row style="padding-bottom: 20px">
                  <el-col :span="8" :offset="2">
                    <span>Payment Type:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>Credit Card</span>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <span>Credit Card Type:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>Visa</span>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <span>Account Number:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>***********1234</span>
                  </el-col>
                </el-row>
              </div>
          </el-col>
      </el-row>
    </div>
    <div>
      <el-row style="justify-content: center;">
          <el-col :span="14" :xs="24" style="border: 1px solid #000; margin-top: 10px; margin-bottom: 20px;">
              <div style="
                justify-content: center;
                text-align: center;
                font-weight: 700;
                color: #fff;
                padding: 10px 0;
                background-color:#0D993D;
                "
              >
                <span>PRODUCT RECEIVED</span>
              </div>
              <div>
                <el-row style="padding: 20px 0">
                  <el-col :span="8" :offset="2">
                    <span>Transaction ID:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>123456</span>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <span>Date and Time:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>02/01/2021 13:55</span>
                  </el-col>
                  <el-col :span="8" :offset="2">
                    <span>Courier:</span>
                  </el-col>
                  <el-col :span="14">
                    <span>Ninjavan</span>
                  </el-col>
                </el-row>
              </div>
          </el-col>
      </el-row>
    </div>
    <div v-if="paymentStatus == 'default' " style="margin-bottom: 20px;">
       <el-row style="justify-content: center;">
        <el-col :span="6" :xs="12" style="text-align: center;">
          <el-button
            class="font-bold reject-btn custom-btn"
            @click="dialogVisibleReject = true">
            REJECT
          </el-button>
        </el-col>
        <el-col :span="6" :xs="12" style="text-align: center;">
          <el-button
            class="font-bold approve-btn custom-btn"
            @click="dialogVisibleApprove = true">
            APPROVE
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
  <!-- eslint-disable max-len -->
  <el-dialog
    v-model="dialogVisibleReject"
    title="Reject?"
    :width="isMobileView ? '100%' : '60%'"
  >
    <div style="margin-bottom: 20px; color: #000;">
      <span>The payment of SGD$4000.00 will be refunded to the buyer 'desmondtzh'. Both buyer and seller will be notified of the rejected payment.</span>
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
          @click="dialogVisibleReject = false;
        ">CANCEL
        </el-button>
        <el-button
          class="font-bold approve-btn custom-btn"
          @click="
            dialogVisibleUnlock = true;
            dialogVisibleReject = false;
            paymentRejected = true;
            paymentApproved = false;
            paymentStatus = 'reject';
        ">CONFIRM</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogVisibleUnlock"
    title="Unlock Listing?"
    :width="isMobileView ? '100%' : '60%'"
  >
    <div style="margin-bottom: 20px; color: #000;">
      <span>Unlock the listing to allow the seller continue selling this product on the marketplace.</span>
      <br/>
      <span>Alternatively, unlock later via the Transactions page.</span>
    </div>
      <el-input
        v-model="textarea1"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
        placeholder="Remarks to seller (optional)"
      />
    <template #footer>
      <span class="dialog-footer">
        <el-button
          class="font-bold reject-btn custom-btn"
          @click="dialogVisibleUnlock = false;
        ">CANCEL</el-button>
        <el-button
          class="font-bold approve-btn custom-btn"
          @click="
            dialogVisibleUnlock = false;
        ">CONFIRM</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogVisibleApprove"
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
          @click="dialogVisibleApprove = false;
          ">CANCEL</el-button>
        <el-button
          class="font-bold approve-btn custom-btn"
          @click="
            paymentApproved = true;
            paymentRejected = false;
            paymentStatus = 'approve';
            dialogVisibleApprove = false;
        ">CONFIRM</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const productDetail = ref(null);
    const textarea1 = ref('');
    const textarea2 = ref('');
    const paymentRejected = ref(false);
    const paymentApproved = ref(false);
    const paymentStatus = ref('default');
    const dialogVisibleReject = ref(false);
    const dialogVisibleApprove = ref(false);
    const dialogVisibleUnlock = ref(false);

    onMounted(async () => {
      const productRes = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/eee4f54c-3f38-4e84-147b-08d9e20d6ffe/product`);
      productDetail.value = productRes.data;
    });

    const store = useStore();
    const isMobileView = computed(() => store.state.layout.isMobileView);

    return {
      productDetail,
      textarea1,
      textarea2,
      paymentRejected,
      paymentApproved,
      paymentStatus,
      dialogVisibleReject,
      dialogVisibleApprove,
      dialogVisibleUnlock,
      isMobileView,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-name {
  font-weight: 700;
  font-size: 20px;
  font-family: 'Montserrat';
}

.seller-detail {
  background: #c4c4c4;
  padding: 20px;
  margin-top: 10px;
  border-radius: 15px;
}

.sub-header {
  font-family: 'Montserrat' !important;
  font-style: normal !important;
  font-weight: bold !important;
  font-size: 20px !important;
  line-height: 24px !important;
}

.product-desc {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.additional-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .sub-header {
    min-width: 160px;
  }
}

</style>
