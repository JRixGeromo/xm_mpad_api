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
    <el-row class="py-10">
      <el-col :span="24" class="d-flex-end">
        <el-pagination
          class="table-pagination"
          layout="prev, pager, next"
          :total="pagination.totalRecord"
          :page-size="pagination.itemPerPage"
          @current-change="paginationCallback"
          :current-page="pagination.currentPage + 1"
        ></el-pagination>
      </el-col>
    </el-row>
    <el-row v-if="dataList">
      <el-col v-for="product in dataList" :key="product.id" :xs="24" :sm="8" class="px-10">
        <router-link :to="{ path: '/product/'+ product.productId}">
          <ProductCard :productDetail="product" />
        </router-link>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col v-for="index in 4" :key="index" :xs="24" :sm="8" class="px-10">
        <ProductCardLoader />
      </el-col>
    </el-row>
    <el-row class="py-10">
      <el-col :span="24" class="d-flex-end">
        <el-pagination
          class="table-pagination"
          layout="prev, pager, next"
          :total="pagination.totalRecord"
          :page-size="pagination.itemPerPage"
          @current-change="paginationCallback"
          :current-page="pagination.currentPage + 1"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import ProductCard from '@/components/Product/ProductCard.vue';
import ProductCardLoader from '@/components/Product/ProductCardLoader.vue';
import CustomTab from '@/components/CustomTab.vue';
import SortBy from '@/components/SortBy.vue';
import { CONFIGURATION_NAMES } from '@/common/constants';
import configurationServices from '@/services/configuration-service';

export default {
  name: 'Listings',
  components: {
    ProductCard,
    ProductCardLoader,
    CustomTab,
    SortBy,
  },
  setup() {
    const listings = ref([]);
    const listingRes = ref([]);
    const activeTabName = ref('all');
    const tabOptions = ref([]);
    const pagination = ref({
      itemPerPage: 9,
      totalRecord: 0,
      currentPage: 0,
    });
    const paginationTimeout = ref([]);
    const dataList = ref(null);

    onBeforeMount(() => {
      if (paginationTimeout.value.length > 0) {
        clearTimeout(paginationTimeout.value);
      }
    });

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
        tabOptions.value.unshift({
          tabName: 'all',
          tabLabel: 'All',
        });
      });
    };

    const slicePage = (params) => {
      const paginationDetails = {
        itemPerPage: params.itemPerPage,
        totalRecord: listings.value.length,
        currentPage: params.currentPage,
      };
      const data = {
        pagination: paginationDetails,
        data: listings.value.slice(
          (params.itemPerPage * params.currentPage),
          (params.itemPerPage * (params.currentPage + 1)),
        ),
      };
      return data;
    };

    const getSortBy = (sortBy) => {
      if (sortBy === 'Newest') {
        listings.value = listingRes.value.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      } else {
        listings.value = listingRes.value.data.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
      }
      dataList.value = listings.value;
    };

    const getProducts = async () => {
      listingRes.value = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/products`);
      getSortBy('Newest');
    };

    onMounted(async () => {
      getProducts();
      getLicenses();
    });

    const paginationCallback = (page) => {
      const newPagination = {
        ...pagination.value,
        currentPage: page - 1,
      };
      const prodDataList = slicePage({
        ...newPagination,
      });
      dataList.value = [];
      paginationTimeout.value = setTimeout(() => {
        dataList.value = prodDataList.data;
      }, 1);
      pagination.value = prodDataList.pagination;
    };
    watch(listings, () => {
      const prodDataList = slicePage({
        ...pagination.value,
      });
      dataList.value = prodDataList.data;
      pagination.value = prodDataList.pagination;
    });

    return {
      listings,
      listingRes,
      activeTabName,
      tabOptions,
      getProducts,
      getSortBy,
      dataList,
      pagination,
      paginationCallback,
    };
  },
};
</script>
