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
      <el-col :span="24">
        <h2 class="main-title">Transactions</h2>
      </el-col>
    </el-row>
    <el-row class="hidden-xs-only">
      <el-col :span="4" class="d-flex-start">
        <Filter/>
      </el-col>
      <el-col :span="4" :offset="16" class="d-flex-end">
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
    <el-row>
      <el-col v-for="transaction in dataList" :key="transaction.id" :xs="24" :sm="24">
        <div style="padding: 20px; border: 1px solid #C4C4C4; margin-bottom: 10px;">
          <TransactionCard :transactionDetail="transaction" />
        </div>
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
import { ref, onMounted, onBeforeMount, watch } from 'vue';
import { CONFIGURATION_NAMES } from '@/common/constants';
import TransactionCard from '@/components/Transaction/TransactionCard.vue';
import transactionServices from '@/services/transaction-service';
import CustomTab from '@/components/CustomTab.vue';
import SortBy from '@/components/SortBy.vue';
import Filter from '@/components/Filter.vue';
import configurationServices from '@/services/configuration-service';

export default {
  name: 'Transactions',
  components: {
    TransactionCard,
    CustomTab,
    Filter,
    SortBy,
  },
  setup() {
    const transactionsList = ref([]);
    const transactionsListLoading = ref(true);
    const activeTabName = ref('All');
    const sortTabName = ref('Sort By');
    const tabOptions = ref([]);
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

    const getTransaction = (params) => {
      const paginationDetails = {
        itemPerPage: params.itemPerPage,
        totalRecord: transactionsList.value.length,
        currentPage: params.currentPage,
      };
      const data = {
        pagination: paginationDetails,
        data: transactionsList.value.slice(
          (params.itemPerPage * params.currentPage),
          (params.itemPerPage * (params.currentPage + 1)),
        ),
      };
      return data;
    };

    const getTransactions = async (sortBy) => {
      console.log(sortBy);
      transactionsList.value = await transactionServices.getTransactions();
      transactionsListLoading.value = false;
    };

    const getSortBy = (sortBy) => {
      getTransactions(sortBy);
    };

    onMounted(async () => {
      getTransactions('Newest');
      getLicenses();
    });

    const paginationCallback = (page) => {
      const newPagination = {
        ...pagination.value,
        currentPage: page - 1,
      };
      const transDataList = getTransaction({
        ...newPagination,
      });
      dataList.value = [];
      paginationTimeout.value = setTimeout(() => {
        dataList.value = transDataList.data;
      }, 1);
      pagination.value = transDataList.pagination;
    };
    watch(transactionsList, () => {
      const transDataList = getTransaction({
        ...pagination.value,
      });
      dataList.value = transDataList.data;
      pagination.value = transDataList.pagination;
    });

    return {
      getSortBy,
      tabOptions,
      activeTabName,
      sortTabName,
      transactionsList,
      dataList,
      transactionsListLoading,
      pagination,
      paginationCallback,
    };
  },
};
</script>
