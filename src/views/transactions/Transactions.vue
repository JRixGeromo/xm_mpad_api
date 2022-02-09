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
      <el-col :span="10" class="d-flex-start">
        <div id="filter-bar" @click="showHideFilter">Filter <i class="xm-el-icon-plus"></i>
          <div id="filter-div" style="display: none;">
            <el-row style="text-align: cetner; margin-bottom: 2em;">
              <el-col :span="24">
                <p style="font-weight: bold; margin-bottom: 0px">Licensors</p>
              </el-col>
              <el-col :span="12" :xs="24">
                <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
              </el-col>
              <el-col :span="12" :xs="24">
                <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
              </el-col>
              <el-col :span="12" :xs="24">
                <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
              </el-col>
              <el-col :span="12" :xs="24">
                <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
              </el-col>
              <el-col :span="12" :xs="24">
                <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
              </el-col>
              <el-col :span="12" :xs="24">
                <el-checkbox v-model="checked1" label="Option 1" size="large"></el-checkbox>
              </el-col>
            </el-row>
            <el-row style="text-align: cetner; margin-bottom: 2em;">
              <el-col :span="24">
                <p style="font-weight: bold; margin-bottom: 0px">Status</p>
              </el-col>
              <el-col :span="24">
                <el-radio v-model="radio1" label="1" size="large">All</el-radio>
              </el-col>
              <el-col :span="24">
                <el-radio v-model="radio1" label="1" size="large">Pending</el-radio>
              </el-col>
              <el-col :span="24">
                <el-radio v-model="radio1" label="1" size="large">Completed</el-radio>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4" :offset="16" class="d-flex-end">
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
import { CONFIGURATION_NAMES } from '@/common/constants';
import TransactionCard from '@/components/Transaction/TransactionCard.vue';
import transactionServices from '@/services/transaction-service';
import CustomTab from '@/components/CustomTab.vue';
import configurationServices from '@/services/configuration-service';
import { showHideFilterMenu } from '@/helpers';

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

    const showHideFilter = () => {
      showHideFilterMenu();
    };

    const getTransactions = async () => {
      transactionList.value = await transactionServices.getTransactions();
      transactionListLoading.value = false;
    };

    onMounted(async () => {
      getTransactions();
      getLicenses();
    });

    return {
      tabOptions,
      activeTabName,
      sortTabName,
      transactionList,
      transactionListLoading,
      showHideFilter,
    };
  },
};
</script>
<style scoped>
  #filter-bar {
      display:inline-block;
      padding:10px;
  }

  #filter-bar:hover {
      cursor:hand;
      cursor:pointer;
  }

  #filter-div {
      display:inline-block;
      position:absolute;
      top:55px;
      left: 0px;
      background-color:#fff;
      z-index: 1000;
      padding: 0px 20px 20px 20px;
      max-width: 400px;
  }
</style>
