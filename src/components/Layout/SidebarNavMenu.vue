<template>
  <el-menu
    :default-active="activeMenu"
    :router="true"
    :unique-opened="true"
  >
  <div style="text-align:center; padding: 20px 0;">
    <span class="custom-menu-title">XMarketplace</span>
  </div>
    <template v-for="item in navMenu" :key="item.name">
      <template v-if="!item.child">
        <router-link :to="item.route">
          <el-menu-item :index="item.route" :key="1">
            <i :class="item.icon"></i>
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </router-link>
      </template>
      <template v-else>
        <el-submenu :index="item.name">
          <template #title>
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="nav in item.subNav" :key="nav.name" :index="nav.route">
              <span>{{ nav.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { NAV_MENU, PROFILE_NAV_MENU } from '@/common/constants';
import { isLoggin } from '@/helpers';

export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.value.fullPath,
      activeMenu: null,
      navMenu: this.isProfileNav ? PROFILE_NAV_MENU.filter((x) => x.needLogin === isLoggin()) : NAV_MENU,
      isUserLoggin: isLoggin(),
    };
  },
  mounted() {
    this.activeMenu = this.$router.currentRoute.value.fullPath;
    this.currentRoute = this.$router.currentRoute.value.fullPath;
  },
  watch: {
    $route() {
      this.activeMenu = this.$router.currentRoute.value.fullPath;
      this.currentRoute = this.$router.currentRoute.value.fullPath;
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
