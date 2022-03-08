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
        <h2 class="main-title">Dashboard</h2>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :xs="24">
        <div style="text-align: center; margin: 4em 0;">
          <p class="sub-title">New Listings</p>
          <NewListings />
        </div>
      </el-col>
      <el-col :span="8" :xs="24">
        <div style="text-align: center; margin: 4em 0;">
          <p class="sub-title">Purchases</p>
          <Purchases />
        </div>
      </el-col>
      <el-col :span="8" :xs="24">
        <div style="text-align: center; margin: 4em 0;">
          <p class="sub-title">Payments</p>
          <Payments />
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
import NewListings from '@/components/Charts/NewListings.vue';
import Payments from '@/components/Charts/Payments.vue';
import Purchases from '@/components/Charts/Purchases.vue';

export default {
  name: 'Dashboard',
  components: {
    ProductCard,
    ProductCardLoader,
    Purchases,
    Payments,
    NewListings,
  },
  setup() {
    const products = ref(null);

    const getProducts = async () => {
      const productsData = await productServices.getProducts();
      products.value = productsData.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).slice(0, 4);
    };

    onMounted(() => {
      getProducts();
    });

    const store = useStore();
    const isMobileView = computed(() => store.state.layout.isMobileView);

    return {
      products,
      isMobileView,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
