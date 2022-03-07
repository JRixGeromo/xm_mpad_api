<template>
  <el-container class="login-container">
    <div style="text-align:center;">
      <h1 class="main-header">XMarketplace</h1>
      <h1 class="main-header">Admin Panel</h1>
      <el-main>
        <el-form
          class="custom-form"
          label-position="top"
          label-width="100px"
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          @keyup.enter="onSubmit"
        >
          <TextInput v-model="loginForm.username" formProps="username" formLabel="Username" />
          <div style="margin-top: 35px;">
            <TextInput
              v-model="loginForm.secret"
              inputType="password"
              formProps="secret"
              formLabel="Password"
            />
          </div>
          <div class="right-text fs-12" style="margin-top: -10px; margin-bottom: 20px; color:#575757;">
            <span class="sub-label-light fs-12">Forgot password?</span>
          </div>
          <el-form-item>
            <el-button
              class="custom-btn primary-btn gray"
              @click="onSubmit"
              :loading="isSigningIn"
            >Login</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import { SIGN_IN } from '@/store/modules/auth/actions-type';
import { mapActions, mapState } from 'vuex';
import TextInput from '@/components/Share/TextInput.vue';
import { validateUserName } from '@/helpers';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        secret: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: 'Please enter your username',
          },
          {
            validator: validateUserName,
          },
        ],
        secret: [
          {
            required: true,
            message: 'Please enter your password',
          },
          {
            min: 6,
            message: 'Password must be at least 6 character',
          },
        ],
      },
    };
  },
  computed: {
    ...mapState('auth', ['isSigningIn']),
  },
  methods: {
    ...mapActions('auth', [SIGN_IN]),
    onSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const loginDetails = {
            ...this.loginForm,
            applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
          };

          this.SIGN_IN(loginDetails);
        }
      });
    },
  },
  components: {
    TextInput,
  },
};
</script>
