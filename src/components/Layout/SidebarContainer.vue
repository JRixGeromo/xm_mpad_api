<template>
  <!-- <SidebarMobile
    :sidebarShow="sidebarShow"
    :handleSidebarShow="handleSidebarShow"
    :isProfileNav="isProfileNav"
    v-if="isMobileView"
  /> -->
  <el-drawer
    v-model="drawer"
    :with-header="false"
    :before-close="handleSidebarShow"
    :close-on-press-escape="false"
    modal-class="mobile-nav-drawer"
    :direction="isProfileNav ? 'rtl' : 'ltr'"
    size="100%"
  >
    <div class="wrap-sidebar">
      <!-- <SidebarNavMenu :sidebarShow="sidebarShow" :handleSidebarShow="handleSidebarShow" /> -->
      <SidebarNavMenu :isProfileNav="isProfileNav" :sidebarShow="sidebarShow" :handleSidebarShow="handleSidebarShow" />
    </div>
  </el-drawer>
</template>

<script>
// import SidebarMobile from '@/components/Layout/SidebarMobile.vue';
import SidebarNavMenu from './SidebarNavMenu.vue';

export default {
  props: {
    isMobileView: Boolean,
    sidebarShow: Boolean,
    handleSidebarShow: Function,
    isProfileNav: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    // SidebarMobile,
    SidebarNavMenu,
  },
  data() {
    return {
      drawer: this.sidebarShow,
    };
  },
  watch: {
    sidebarShow(newSidebarShow) {
      if (newSidebarShow) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
      this.drawer = newSidebarShow;
    },
  },
};
</script>
