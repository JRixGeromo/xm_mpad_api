<template>
  <div class="px-40">
    <el-row class="hidden-xs-only">
      <el-col :span="24">
        <h2 class="main-title">Transactions</h2>
      </el-col>
    </el-row>
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
        <span>
          <input
            class="searchStyle"
            v-model="keyWord"
            @input="searchThis()"
          />
        </span>
      </el-col>
    </el-row>
    <el-row class="hidden-xs-only">
      <el-col :span="4" class="d-flex-start">
        <Filter :tabs="tabOptions" :getTabLicense="getTabLicense" @newActiveStatus="newActiveStatus" />
      </el-col>
      <el-col :span="4" :offset="16" class="d-flex-end">
        <SortBy :getSortBy="getSortBy" />
      </el-col>
    </el-row>
    <el-row class="hidden-sm-and-up">
      <!-- <el-col :span="24" :xs="12">
        <CustomTab v-model="activeTabName" :tabs="tabOptions" />
      </el-col> -->
      <el-col :span="24" :xs="12" style="align-self: center;">
        <Filter :tabs="tabOptions" :getTabLicense="getTabLicense" @newActiveStatus="newActiveStatus" />
      </el-col>
      <el-col :span="12" class="d-flex-end">
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
      <el-col v-for="transaction in dataList" :key="transaction.transactionId" :xs="24" :sm="24">
        <div style="padding: 20px; border: 1px solid #C4C4C4; margin-bottom: 10px;">
          <TransactionCard :transactionDetail="transaction" />
        </div>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col v-for="index in 4" :key="index" :span="24" class="px-10">
        <TransactionCardLoader />
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
import TransactionCardLoader from '@/components/Transaction/TransactionCardLoader.vue';
import transactionServices from '@/services/transaction-service';
/* import CustomTab from '@/components/CustomTab.vue'; */
import SortBy from '@/components/SortBy.vue';
import Filter from '@/components/Filter.vue';
import configurationServices from '@/services/configuration-service';

export default {
  name: 'Transactions',
  components: {
    TransactionCard,
    TransactionCardLoader,
    /* CustomTab, */
    Filter,
    SortBy,
  },
  setup() {
    const transactionsList = ref([]);
    const transactionsListRes = ref([]);
    const transactionsListLoading = ref(true);
    const activeStatus = ref('all');
    const sortTabName = ref('Sort By');
    const tabOptions = ref([]);
    const pagination = ref({
      itemPerPage: 8,
      totalRecord: 0,
      currentPage: 0,
    });
    const paginationTimeout = ref([]);
    const dataList = ref(null);
    const keyWord = ref('');

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

    const newActiveStatus = (status) => {
      activeStatus.value = status;
      if (status === 'all') {
        transactionsList.value = transactionsListRes.value;
      } else {
        transactionsList.value = transactionsListRes.value.filter((x) => x.status.toLowerCase().includes(status));
      }
      dataList.value = transactionsList.value;
      paginationCallback(1);
    };

    const getTabLicense = (tabIndex, tabName) => {
      tabOptions.value.forEach((element) => {
        if (tabName === element.tabName) {
          /* transactionsList.value = transactionsListRes.value.filter((x) => x.license.toLowerCase().includes(tabName));
          dataList.value = transactionsList.value; */
        }
      });
    };

    const getSortBy = (sortBy) => {
      if (sortBy === 'Newest') {
        transactionsList.value = transactionsListRes.value.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      } else {
        transactionsList.value = transactionsListRes.value.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
      }
      dataList.value = transactionsList.value;
      newActiveStatus(activeStatus.value);
    };

    const getTransactions = async () => {
      transactionsListRes.value = await transactionServices.getTransactions();
      getSortBy('Newest');
    };

    onMounted(async () => {
      getTransactions();
      getLicenses();
    });

    const searchThis = () => {
      dataList.value = keyWord.value ?
        transactionsList.value.filter((x) => x.refNo.toLowerCase().includes(keyWord.value.toLowerCase())) : transactionsList.value;
    };

    watch(transactionsList, () => {
      const transDataList = slicePage({
        ...pagination.value,
      });
      dataList.value = transDataList.data;
      pagination.value = transDataList.pagination;
    });

    return {
      getSortBy,
      tabOptions,
      activeStatus,
      sortTabName,
      transactionsList,
      transactionsListRes,
      dataList,
      transactionsListLoading,
      pagination,
      paginationCallback,
      getTabLicense,
      newActiveStatus,
      keyWord,
      searchThis,
    };
  },
};
</script>
