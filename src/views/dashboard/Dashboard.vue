<template>
  <div class="px-40">
    <!-- <el-row class="hidden-xs-only">
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
    </el-row> -->
    <el-row class="hidden-xs-only">
      <el-col :span="24">
        <h2 class="main-title">Dashboard</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :xs="24">
        <div style="text-align: center; margin: 4em 0;">
          <p class="sub-title">New Listings</p>
          <NewListings backgroundColor="#f18c14" v-if="newListings" :data="newListings" />
        </div>
      </el-col>
      <el-col :span="8" :xs="24">
        <div style="text-align: center; margin: 4em 0;">
          <p class="sub-title">Purchases</p>
          <Purchases backgroundColor="#23a74c" v-if="purchases" :data="purchases" />
        </div>
      </el-col>
      <el-col :span="8" :xs="24">
        <div style="text-align: center; margin: 4em 0;">
          <p class="sub-title">Payments</p>
          <Payments backgroundColor="#1b82f1" v-if="payments" :data="payments" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <p class="sub-title" :class="isMobileView ? 'center-text' : ''">New Listings</p>
      </el-col>
    </el-row>
    <el-row v-if="products">
      <el-col v-for="product in products" :key="product" :span="6" :xs="24" class="px-10">
        <router-link :to="{ path: '/product/'+ product.productId}">
          <ProductCard :productDetail="product" />
        </router-link>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col v-for="index in 4" :key="index" :span="6" :xs="24" style="padding: 0 10px">
        <ProductCardLoader />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import ProductCard from '@/components/Product/ProductCard.vue';
import ProductCardLoader from '@/components/Product/ProductCardLoader.vue';
import productServices from '@/services/product-service';
import transactionServices from '@/services/transaction-service';
import NewListings from '@/components/Charts/NewListings.vue';
import Payments from '@/components/Charts/Payments.vue';
import Purchases from '@/components/Charts/Purchases.vue';
// import BarChart from '@/components/Charts/BarChart.vue';

export default {
  name: 'Dashboard',
  components: {
    ProductCard,
    ProductCardLoader,
    Purchases,
    Payments,
    NewListings,
    // BarChart,
  },
  setup() {
    const products = ref(null);
    const newListings = ref(null);
    const purchases = ref(null);
    const payments = ref(null);

    onMounted(async () => {
      const productsData = await productServices.getProducts();
      products.value = productsData.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).slice(0, 4);

      const newListingsData = await productServices.getNewlistingCharts();
      newListings.value = newListingsData.sort((a, b) => new Date(b.date) - new Date(a.date));

      const purchasesChart = await transactionServices.getPurchasesChart();
      purchases.value = purchasesChart.sort((a, b) => new Date(b.date) - new Date(a.date));

      const paymentsChart = await transactionServices.getPaymentsChart();
      payments.value = paymentsChart.sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    const store = useStore();
    const isMobileView = computed(() => store.state.layout.isMobileView);

    return {
      products,
      purchases,
      payments,
      newListings,
      isMobileView,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
