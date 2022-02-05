<template>
  <el-container direction="vertical">
    <Header
      :handleSidebarShow="handleSidebarShow"
      :isMobileView="isMobileView"
      :sidebarShow="sidebarShow"
    />
    <el-container class="main-container">
      <!-- <div> -->
        <el-aside class="sidebar-aside">
          <SidebarContainer
            :isMobileView="isMobileView"
            :sidebarShow="sidebarShow"
            :handleSidebarShow="handleSidebarShow"
            :isProfileNav="isProfileNav"
          />
        </el-aside>
      <!-- </div> -->
      <div class="body-scrollbar pad-adjust" height="100%">
        <div class="app-body">
            <router-view />
        </div>
      </div>
    </el-container>
    <!-- <el-footer>
      <div style="padding: 20px">
        <el-row :gutter="20">
          <el-col :span="6" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
            <div class style="margin-bottom: 10px">XMarketplace</div>
          </el-col>
        </el-row>
      </div>
    </el-footer> -->
  </el-container>
</template>

<script>
import Header from '@/components/Layout/Header.vue';
import SidebarContainer from '@/components/Layout/SidebarContainer.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Header,
    SidebarContainer,
  },
  data() {
    return {
      sidebarShow: false,
      isMobileView: false,
      isProfileNav: false,
      windowWidth: 0,
      timeout: null,
    };
  },
  methods: {
    ...mapActions('layout', {
      updateMobileView: 'UpdateMobileView',
    }),
    handleSidebarShow(isProfileNavClick) {
      this.isProfileNav = isProfileNavClick;
      this.sidebarShow = !this.sidebarShow;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    windowWidth(newWindowWidth) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (newWindowWidth < '768') {
          this.isMobileView = true;
          this.updateMobileView(true);
          this.sidebarShow = false;
        } else {
          this.isMobileView = false;
          this.updateMobileView(false);
          this.sidebarShow = true;
        }
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';

.app-body {
  // display: flex;
  // flex-flow: column;
  // -webkit-box-flex: 1;
  // -ms-flex: 1;
  // flex: 1;
  width: 100%;
}

.main-container {
  // height: calc(100vh - 60px);
  height: 100%;
}

.body-scrollbar {
  width: 100%;

  @media only screen and (min-width: 993px) {
    // padding-left: 68px;
  }
}

.sidebar-aside,
.el-container.is-vertical {
  background-color: $--color-primary-bg;
}
.el-footer {
  background-color: $--color-secondary;
  // z-index: 1000;
  height: 100% !important;
}

ul {
  padding: 0;
  margin: 0;
}
</style>
