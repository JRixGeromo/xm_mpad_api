<template>
  <div class="px-40">
    <el-row class="hidden-xs-only">
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
    <el-row class="hidden-xs-only">
      <el-col :span="12">
        <h2 class="main-title">Listings</h2>
      </el-col>
      <el-col :span="4" :offset="8" class="d-flex-end">
        <SortBy :getSortBy="getSortBy" />
      </el-col>
    </el-row>
    <el-row style="text-align: center; margin: 20px 0 40px 0; padding: 0 10px;">
      <el-col :span="24" :xs="12">
        <CustomTab v-model="activeTabName" :tabs="tabOptions" />
      </el-col>
      <el-col :span="12" class="d-flex-end hidden-sm-and-up">
        <SortBy :getSortBy="getSortBy" />
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="product in listings" :key="product.id" :xs="24" :sm="8" class="px-10">
        <router-link :to="{ path: '/product/'+ product.productId}">
          <ProductCard :productDetail="product" />
        </router-link>
      </el-col>
    </el-row>
    <el-row class="py-10">
      <el-col :span="24" class="d-flex-end">
        <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/Product/ProductCard.vue';
import CustomTab from '@/components/CustomTab.vue';
import SortBy from '@/components/SortBy.vue';
import { CONFIGURATION_NAMES } from '@/common/constants';
import configurationServices from '@/services/configuration-service';

export default {
  name: 'Listings',
  components: {
    ProductCard,
    CustomTab,
    SortBy,
  },
  setup() {
    const listings = ref([]);
    const activeTabName = ref('all');
    const sortTabName = ref('Sort By');
    const tabOptions = ref([]);

    const getLicenses = async () => {
      configurationServices.getConfigurationByName(CONFIGURATION_NAMES.productLicense).then((data) => {
        const raw = data[0].configurations.map((config) => JSON.parse(config.value));
        tabOptions.value = raw.map((el) => {
          const res = {
            tabName: el.name.toLowerCase(),
            tabLabel: el.name,
          };
          return res;
        });
      });
    };

    const getProducts = async (sortBy) => {
      const listingRes = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/products`);
      console.log(sortBy); // sort the data here
      listings.value = listingRes.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    };

    onMounted(async () => {
      getProducts('Newest');
      getLicenses();
    });

    const getSortBy = (sortBy) => {
      getProducts(sortBy);
    };

    return {
      listings,
      activeTabName,
      tabOptions,
      sortTabName,
      getProducts,
      getSortBy,
    };
  },
};
</script>
