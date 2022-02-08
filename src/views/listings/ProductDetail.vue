<template>
  <div class="px-40">
    <el-row>
      <el-col :span="24">
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
      <router-link to="/listings">
        <p>
          <i class="fa fa-arrow-left" aria-hidden="true"></i> Back to Listings
        </p>
      </router-link>
    </el-row>
    <div>
      <el-row style="justify-content: center;">
        <el-col :span="14" :xs="24">
          <div
            style="
                justify-content: center;
                text-align: center;
                padding: 5px 0;
                background-color:#FDE07B;
                border-radius: 10px;
                margin: 10px 0;
                "
          >
            <p>
              <span style="font-weight: 700;">Status:</span> Payment Made
              <router-link to="/transaction/1">
                <u>Details</u>
              </router-link>
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-row v-if="productDetail && sellerDetail">
      <el-col :span="12" :xs="24" style="display: flex; align-items: center; margin: 20px 0;">
        <div style="display: flex;">
          <div style="width: 240px; height: 170px;">
            <el-image
              style="width: 240px; height: 170px;"
              :src="productDetail.images[0].productImageUrl"
              :initial-index="1"
              fit="contain"
              class="profile-img"
            ></el-image>
          </div>
          <div style="display: flex; flex-flow: column; padding-left: 10px;">
            <div>
              <div>{{ productDetail.name }}</div>
              <div>{{ `${productDetail.license}, ${productDetail.scale} Scale` }}</div>
            </div>
            <div
              style="margin-top: auto; font-weight: 700;"
            >{{ `SGD$${productDetail.listingPrice.toFixed(2)}` }}</div>
          </div>
        </div>
      </el-col>
      <el-col
        :span="12"
        :xs="24"
        style="text-align: center; display: flex; align-items: center; justify-content: center; margin: 20px 0;"
        class="hidden-xs-only"
      >
        <div style="width: 200px;">
          <div style="font-weight: 700; font-size:16px;">Seller</div>
          <div class="seller-detail">
            <el-image
              style="width: 100px; height: 100px; border-radius: 50%;"
              :src="sellerDetail.displayPhotoFilePath"
              :initial-index="1"
              fit="cover"
              class="profile-img"
            >
              <template #error>
                <div class="image-slot">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="defaultProfileImg"
                    :initial-index="1"
                  ></el-image>
                </div>
              </template>
            </el-image>
            <div class="user-name">{{ sellerDetail.userName }}</div>
            <el-rate v-model="rate" disabled text-color="#ff9900"></el-rate>
          </div>
        </div>
      </el-col>
      <el-col>
        <el-row>
          <el-col :span="24">
            <div style="width: 100%; padding: 30px 0;">
              <div class="sub-header left-text fs-20" style="margin-bottom: 10px;">What you get</div>
              <div
                class="left-text fs-16 product-desc"
              >1. 1:6 scale statue collectible of Batman Rebirth</div>
              <div class="left-text fs-16 product-desc">2. Batman Rebirth NFT</div>
              <div class="left-text fs-16 product-desc">3. Access to SN1234567890123456 provenance</div>
            </div>
            <div class="d-flex-column hidden-sm-and-up" style="align-items:center;">
              <div style="width: 200px; text-align:center;">
                <div style="font-weight: 700; font-size:16px;">Seller</div>
                <div class="seller-detail">
                  <el-image
                    style="width: 100px; height: 100px; border-radius: 50%;"
                    :src="sellerDetail.displayPhotoFilePath"
                    :initial-index="1"
                    fit="cover"
                    class="profile-img"
                  >
                    <template #error>
                      <div class="image-slot">
                        <el-image
                          style="width: 100px; height: 100px"
                          :src="defaultProfileImg"
                          :initial-index="1"
                        ></el-image>
                      </div>
                    </template>
                  </el-image>
                  <div class="user-name">{{ sellerDetail.userName }}</div>
                  <el-rate v-model="rate" disabled text-color="#ff9900"></el-rate>
                </div>
              </div>
            </div>
            <div style="width: 100%; padding: 30px 0;">
              <div class="sub-header left-text fs-20">Description</div>
              <div class="left-text fs-16 product-desc">{{ productDetail.description }}</div>
            </div>
            <div class="additional-info">
              <div class="sub-header fs-20 left-text">Characters</div>
              <div class="left-text fs-16">{{ productCharacters }}</div>
            </div>
            <div class="additional-info">
              <div class="sub-header fs-20 left-text">Series</div>
              <div class="left-text fs-16">{{ productDetail.series }}</div>
            </div>
            <div class="additional-info">
              <div class="sub-header fs-20 left-text">Distributor</div>
              <div class="left-text fs-16">{{ productDetail.distributor }}</div>
            </div>
            <div class="additional-info">
              <div class="sub-header fs-20 left-text">Artists</div>
              <div class="left-text fs-16">John Doe, Adam Lane, Robert Tajol</div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24" style="margin: 50px 0; justify-content:flex-end;" class="d-flex">
        <div style="width: 200px; text-align: center;">
          <p>Something not right?</p>
          <div
            style="background-color: #DF0707; font-weight:700; padding: 10px 20px; cursor: pointer; text-transform: uppercase;"
            @click="dialogLock=true"
            v-if="isProdictActive"
          >
            <i class="fa fa-lock" aria-hidden="true"></i>
            <span style="padding-left: 10px;">Lock Listing</span>
          </div>
          <div
            style="background-color: #31AC62; font-weight:700; padding: 10px 20px; cursor: pointer; text-transform: uppercase;"
            @click="dialogLock=true"
            v-else
          >
            <i class="fa fa-unlock-alt" aria-hidden="true"></i>
            <span style="padding-left: 10px;">UnLock Listing</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-dialog
    v-if="productDetail"
    v-model="dialogLock"
    :title="isProdictActive ? 'Lock Listing?' : 'Unlock Listing?'"
    :width="isMobileView ? '100%' : '60%'"
  >
    <div style="margin-bottom: 20px; color: #000;">
      <span v-if="isProdictActive">
        If you find the listing suspicious or inappropriate,
        you can lock it to prevent the seller from proceeding with the transaction or listing the item on the marketplace,
        until you can investigate the listing.
      </span>
      <span
        v-else
      >Unlock the listing to allow the seller to continue selling this product on the marketplace.</span>
    </div>
    <el-input
      v-model="remark"
      type="textarea"
      :autosize="{ minRows: 4, maxRows: 6 }"
      placeholder="Remarks to seller (optional)"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button
          class="font-bold reject-btn custom-btn"
          @click="dialogLock = false; remark = ''"
        >CANCEL</el-button>
        <el-button class="font-bold approve-btn custom-btn" @click="lockAction">CONFIRM</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { SetAuthHeader } from '@/services/api';

export default {
  setup() {
    const store = useStore();
    const isMobileView = computed(() => store.state.layout.isMobileView);

    const route = useRoute();
    const sellerDetail = ref(null);
    const productDetail = ref(null);
    const defaultProfileImg = ref(process.env.VUE_APP_DEFAULT_PIC_URL);
    const rate = ref(3.7);
    const dialogLock = ref(false);
    const remark = ref('');

    const productCharacters = computed(() => {
      if (!productDetail.value.characters) {
        return '';
      }
      return productDetail.value.characters.split(',').join(', ');
    });

    const isProdictActive = computed(() => productDetail.value.status === 'Active');

    const getProductDetail = async () => {
      const productRes = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/${route.params.id}/product`);
      return productRes.data;
    };

    const lockAction = async () => {
      const obj = {
        productId: route.params.id,
        remark: remark.value,
      };
      if (isProdictActive.value) {
        await axios.put(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/product/lock`, obj, SetAuthHeader());
      } else {
        await axios.put(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/product/unlock`, obj, SetAuthHeader());
      }
      dialogLock.value = false;
      remark.value = '';
      productDetail.value = await getProductDetail();
    };

    onMounted(async () => {
      productDetail.value = await getProductDetail();

      const profileRes = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/profile/v1/${productDetail.value.createdByUserId}/profile/user`);
      sellerDetail.value = profileRes.data;
    });

    return {
      productDetail,
      sellerDetail,
      defaultProfileImg,
      rate,
      productCharacters,
      isMobileView,
      dialogLock,
      remark,
      lockAction,
      isProdictActive,
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
