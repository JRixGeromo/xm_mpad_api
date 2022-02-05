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
        <h2 class="main-title">Transactions</h2>
      </el-col>
      <el-col :span="4" :offset="8" class="d-flex-end">
        <div class="custom-select">
          <el-select v-model="sortTabName" placeholder="Sort By">
            <el-option value="newest" label="Newest"></el-option>
            <el-option value="oldest" label="Oldest"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row style="text-align: cetner; margin-bottom: 2em;">
      <el-col :span="24" :xs="12">
        <CustomTab v-model="activeTabName" :tabs="tabOptions" />
      </el-col>
      <el-col :span="12" class="d-flex-end hidden-sm-and-up">
        <div class="custom-select">
          <el-select v-model="sortTabName" placeholder="Sort By">
            <el-option value="newest" label="Newest"></el-option>
            <el-option value="oldest" label="Oldest"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col v-for="transaction in transactionList" :key="transaction.id" :xs="24" :sm="24">
        <div style="padding: 20px; border: 1px solid #C4C4C4; margin-bottom: 10px;">
          <TransactionCard :transactionDetail="transaction" />
        </div>
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
import { ref, onMounted } from 'vue';
import TransactionCard from '@/components/Transaction/TransactionCard.vue';
import transactionServices from '@/services/transaction-service';
import CustomTab from '@/components/CustomTab.vue';

export default {
  name: 'Transactions',
  components: {
    TransactionCard,
    CustomTab,
  },
  setup() {
    const transactionList = ref([]);
    const transactionListLoading = ref(true);
    const activeTabName = ref('all');
    const sortTabName = ref('Sort By');
    const tabOptions = ref([
      {
        tabName: 'all',
        tabLabel: 'All',
      },
      {
        tabName: 'dc',
        tabLabel: 'DC',
      },
      {
        tabName: 'disney',
        tabLabel: 'Disney',
      },
      {
        tabName: 'hasbro',
        tabLabel: 'Hasbro',
      },
      {
        tabName: 'marvel',
        tabLabel: 'Marvel',
      },
      {
        tabName: 'others',
        tabLabel: 'Others',
      },
    ]);

    const getUserSoldTransactions = async () => {
      transactionList.value = await transactionServices.getUserSoldTransactions();
      transactionListLoading.value = false;
    };

    const getUserBoughtTransactions = async () => {
      transactionList.value = await transactionServices.getUserBoughtTransactions();
      transactionListLoading.value = false;
    };

    onMounted(async () => {
      getUserSoldTransactions();
      getUserBoughtTransactions();
    });

    return {
      activeTabName,
      tabOptions,
      sortTabName,
      transactionList,
      transactionListLoading,
    };
  },
};
</script>
