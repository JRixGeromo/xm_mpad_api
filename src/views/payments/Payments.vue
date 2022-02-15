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
    <el-row>
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
      <el-col v-for="product in dataList" :key="product.id" :xs="24" :sm="24">
        <div style="padding: 20px; border: 1px solid #C4C4C4; margin-bottom: 10px;">
          <PaymentCard :productDetail="product" />
        </div>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col v-for="index in 4" :key="index" :span="24" class="px-10">
        <TransactionCardLoader />
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
import TransactionCardLoader from '@/components/Transaction/TransactionCardLoader.vue';
import CustomTab from '@/components/CustomTab.vue';
import SortBy from '@/components/SortBy.vue';

export default {
  name: 'Listings',
  components: {
    PaymentCard,
    TransactionCardLoader,
    CustomTab,
    SortBy,
  },
  setup() {
    const listings = ref([]);
    const listingRes = ref([]);
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
    const dataList = ref(null);

    onBeforeMount(() => {
      if (paginationTimeout.value.length > 0) {
        clearTimeout(paginationTimeout.value);
      }
    });

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
      getProducts();
    });

    const paginationCallback = (page) => {
      const newPagination = {
        ...pagination.value,
        currentPage: page - 1,
      };
      const paymentDataList = slicePage({
        ...newPagination,
      });
      dataList.value = [];
      paginationTimeout.value = setTimeout(() => {
        dataList.value = paymentDataList.data;
      }, 1);
      pagination.value = paymentDataList.pagination;
    };
    watch(listings, () => {
      const paymentDataList = slicePage({
        ...pagination.value,
      });
      dataList.value = paymentDataList.data;
      pagination.value = paymentDataList.pagination;
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
