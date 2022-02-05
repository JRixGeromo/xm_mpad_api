<template>
  <el-header class="header">
    <div class="primary-header">
      <div class="header-name-wrapper">
        <div @click="handleSidebarShow(false)" class="icon-wrapper d-flex" v-show="isMobileView">
          <span v-if="!sidebarShow" class="fa fa-bars"></span>
          <span v-else class="xm-el-icon-s-left"></span>
          <br />
        </div>
      </div>
      <div class="center-text w-100">
        <span class="header-title" v-if="!sidebarShow">{{ views }}</span>
      </div>
        <!-- <div v-if="!isMobileView" style="display: flex; align-items: center; position: absolute; right: 0;">
          <div>
            <span>
              <el-button
                size="mini"
                icon="xm-el-icon-s-search"
                style="border-color: #fff"
                class="transparent"
              ></el-button>
            </span>
          </div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-image
                class="circle-image cursor-pointer img-size-35"
                :src="defaultProfilePic"
                fit="fill"
              ></el-image>
            </span>
            <template #dropdown>
              <el-dropdown-menu class="header-dropdown-menu to-upper fm-montserrat fw-700">
                <el-dropdown-item
                  v-for="item in navMenu"
                  :key="item.name"
                  @click="$router.push(item.route)"
                >
                  <router-link class="fs-24" :to="item.route">{{ item.name }}</router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div style="display: flex; align-items: center;" v-else>
          <el-image
            class="circle-image cursor-pointer img-size-35"
            :src="defaultProfilePic"
            fit="fill"
            @click="handleSidebarShow(true)"
          ></el-image>
        </div> -->
    </div>
    <div v-if="!isMobileView">
      <!-- <el-menu
        :default-active="`0`"
        class="el-menu-category sub-menu-product header-nav to-upper fm-montserrat fw-700"
        mode="horizontal"
        text-color="#000"
        active-text-color="#000"
      >
        <el-menu-item index="0" class="fs-20">
          <router-link :to="`/`">Home</router-link>
        </el-menu-item>
        <el-menu-item index="1" class="fs-20">Series</el-menu-item>
        <el-menu-item index="2" class="fs-20">Characters</el-menu-item>
        <el-menu-item index="2" class="fs-20">Scale</el-menu-item>
        <el-menu-item index="2" class="fs-20">Licenses</el-menu-item>
      </el-menu> -->
    </div>
  </el-header>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { SIGN_OUT } from '@/store/modules/auth/actions-type';
import { PROFILE_NAV_MENU } from '@/common/constants';
import { isLoggin } from '@/helpers';

export default {
  props: {
    handleSidebarShow: Function,
    isMobileView: Boolean,
    sidebarShow: Boolean,
  },
  data() {
    return {
      navMenu: PROFILE_NAV_MENU.filter((x) => x.needLogin === isLoggin()),
      defaultProfilePic: process.env.VUE_APP_DEFAULT_PIC_URL,
      currentRoute: null,
      views: null,
    };
  },
  computed: {
    ...mapState('auth', ['loginProfile']),
  },
  methods: {
    ...mapActions('auth', [SIGN_OUT]),
  },
  mounted() {
    this.defaultProfilePic = isLoggin()
      ? this.loginProfile.displayPhotoFilePath ?? process.env.VUE_APP_DEFAULT_PIC_URL
      : process.env.VUE_APP_DEFAULT_PIC_URL;
    this.currentRoute = this.$router.currentRoute.value.fullPath;
  },
  watch: {
    loginProfile(newProfile) {
      if (isLoggin() && newProfile && newProfile.displayPhotoFilePath) {
        this.defaultProfilePic = newProfile.displayPhotoFilePath;
      }
    },
    $route() {
      this.currentRoute = this.$router.currentRoute.value.fullPath;
      if (this.currentRoute === '/') {
        this.views = 'Dashboard';
      } else if (this.currentRoute === '/listings') {
        this.views = 'Listings';
      } else if (this.currentRoute === '/transactions') {
        this.views = 'Transactions';
      } else if (this.currentRoute === '/transaction/1') {
        this.views = 'Transactions';
      } else if (this.currentRoute === '/payments') {
        this.views = 'Payments';
      } else if (this.currentRoute === '/payment/1') {
        this.views = 'Payments';
      } else if (this.currentRoute === '/users') {
        this.views = 'Users';
      } else if (this.currentRoute === '/settings') {
        this.views = 'Settings';
      }
    },
  },
};
</script>

<style lang="scss">
/*
.el-menu.el-menu--horizontal {
    width: 100%;
    margin: auto;
}
*/

.icon-wrapper {
  margin-right: 20px;
}

.icon-wrapper,
.header-action-icon {
  font-size: 25px;
  cursor: pointer;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
