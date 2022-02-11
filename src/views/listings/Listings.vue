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
    <el-row>
      <el-col v-for="product in dataList" :key="product.id" :xs="24" :sm="8" class="px-10">
        <router-link :to="{ path: '/product/'+ product.productId}">
          <ProductCard :productDetail="product" />
        </router-link>
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
    const pagination = ref({
      itemPerPage: 9,
      totalRecord: 0,
      currentPage: 0,
    });
    const paginationTimeout = ref([]);
    const dataList = ref([]);

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

    const paginationCallback = (page) => {
      const newPagination = {
        ...pagination.value,
        currentPage: page - 1,
      };
      const transDataList = slicePage({
        ...newPagination,
      });
      dataList.value = [];
      paginationTimeout.value = setTimeout(() => {
        dataList.value = transDataList.data;
      }, 1);
      pagination.value = transDataList.pagination;
    };
    watch(listings, () => {
      const transDataList = slicePage({
        ...pagination.value,
      });
      dataList.value = transDataList.data;
      pagination.value = transDataList.pagination;
    });

    return {
      listings,
      activeTabName,
      tabOptions,
      sortTabName,
      getProducts,
      getSortBy,
      dataList,
      pagination,
      paginationCallback,
    };
  },
};
</script>
