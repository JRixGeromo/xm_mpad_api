<template>
  <AdminLayout v-if="checkIsLogin" />
  <LoginLayout v-else />
</template>

<style lang="scss">
@import '@/assets/styles/index.scss';
</style>

<script>
// @ is an alias to /src
// import GeneralLayout from '@/views/layout/GeneralLayout.vue';
import AdminLayout from '@/views/layout/AdminLayout.vue';
import LoginLayout from '@/views/layout/LoginLayout.vue';
import { isLoggin } from '@/helpers';

export default {
  name: 'App',
  components: {
    AdminLayout,
    LoginLayout,
  },
  computed: {
    checkIsLogin() {
      return isLoggin();
    },
  },
};
</script>
