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
      <el-col v-for="product in listings" :key="product.id" :xs="24" :sm="24">
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
        <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import PaymentCard from '@/components/Payment/PaymentCard.vue';
import CustomTab from '@/components/CustomTab.vue';

export default {
  name: 'Listings',
  components: {
    PaymentCard,
    CustomTab,
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

    onMounted(async () => {
      const listingRes = await axios.get(`${process.env.VUE_APP_MP_API_DOMAIN}api/mp/product/v1/products`);
      listings.value = listingRes.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    });

    return {
      listings,
      activeTabName,
      tabOptions,
      sortTabName,
    };
  },
};
</script>
