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
        <h2 class="main-title">Payments</h2>
      </el-col>
      <el-col :span="4" :offset="8" class="d-flex-end">
        <SortBy :getSortBy="getSortBy" />
      </el-col>
    </el-row>
    <el-row style="text-align: cetner; margin-bottom: 2em;">
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
      <el-col v-for="product in dataList" :key="product.id" :xs="24" :sm="24">
        <div style="padding: 20px; border: 1px solid #C4C4C4; margin-bottom: 10px;">
          <PaymentCard :productDetail="product" />
        </div>
      </el-col>
    </el-row>
    <el-row v-if="activeTabName == 'completed' " style="padding: 40px 0;">
      <el-col :span="24" class="d-flex-center" style="justify-content:center;">
        <div class="fs-16">View older entries in <router-link to="/transactions"><u>Transactions</u></router-link></div>
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
import PaymentCard from '@/components/Payment/PaymentCard.vue';
import CustomTab from '@/components/CustomTab.vue';
import SortBy from '@/components/SortBy.vue';

export default {
  name: 'Listings',
  components: {
    PaymentCard,
    CustomTab,
    SortBy,
  },
  setup() {
    const listings = ref([]);
    const activeTabName = ref('pending');
    const sortTabName = ref('Sort By');
    const tabOptions = ref([
      {
        tabName: 'pending',
        tabLabel: 'Pending',
      },
      {
        tabName: 'completed',
        tabLabel: 'Completed',
      },
    ]);
    const pagination = ref({
      itemPerPage: 8,
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

    const getProducts = async (sortBy) => {
      const listingRes = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/products`);
      listings.value = listingRes.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      console.log(sortBy);
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

    onMounted(async () => {
      getProducts('Newest');
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
      getSortBy,
      dataList,
      pagination,
      paginationCallback,
    };
  },
};
</script>
