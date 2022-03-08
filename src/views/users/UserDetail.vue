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
      <router-link to="/users">
        <p class="fs-20" style="font-weight:400; color:#000;">
          <i class="fa fa-arrow-left" aria-hidden="true"></i> Back to Users
        </p>
      </router-link>
    </el-row>
    <div>
      <el-row v-if="profileDetail">
        <el-col>
          <div style="display: flex; align-items: center; justify-content: center;flex-flow: column;">
            <el-image
              style="width: 100px; height: 100px; border-radius: 50%;"
              :src="profileDetail.displayPhotoFilePath"
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
            <div class="user-name">{{ profileDetail.userName }}</div>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0">
        <el-col>
          <div style="padding: 20px; border: thin solid #d0d0d0; border-radius: 14px;">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="Listings" name="1">
                <div v-if="profileListing.length > 0">
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" v-for="product in profileListing" :key="product.productId">
                      <router-link :to="{ path: '/product/'+ product.productId}">
                        <ProductCard :productDetail="product" />
                      </router-link>
                    </el-col>
                  </el-row>
                </div>
                <div v-else>
                  No listings
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/Product/ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  setup() {
    const route = useRoute();
    const profileDetail = ref(null);
    const profileListing = ref([]);
    const activeName = ref('1');
    const defaultProfileImg = ref(process.env.VUE_APP_DEFAULT_PIC_URL);

    onMounted(async () => {
      const profileRes = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/profile/v1/${route.params.id}/profile`);
      profileDetail.value = profileRes.data;
      const profileListingRes = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/${profileDetail.value.userId}/product/user`);
      profileListing.value = profileListingRes.data;
    });

    return {
      profileDetail,
      profileListing,
      activeName,
      defaultProfileImg,
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
</style>
