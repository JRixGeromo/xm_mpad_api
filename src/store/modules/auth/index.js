import authServices from '@/services/auth-service';
import profileServices from '@/services/profile-service';
import { SIGN_IN, SIGN_UP, SIGN_OUT } from '@/store/modules/auth/actions-type';
import { SIGN_IN_START, SIGN_IN_END, SIGN_UP_START, SIGN_UP_END } from '@/store/modules/auth/mutations-type';
import { ElMessage } from 'element-plus';
import { saveAuthInfo, removeAuthInfo } from '@/helpers';

const state = {
  isSigningIn: false,
  isSigningUp: false,
  loginProfile: null,
};

const getters = {
};

const actions = {
  [SIGN_IN]({ commit }, loginCredentials) {
    commit(SIGN_IN_START);
    authServices.login(loginCredentials).then(
      (data) => {
        profileServices.getProfilebyUserId(data.userId).then(
          (profileData) => {
            const newProfileDetail = {
              ...data,
              profile: {
                ...profileData,
                displayPhotoFilePath: profileData.displayPhotoFilePath ? profileData.displayPhotoFilePath : process.env.VUE_APP_DEFAULT_PIC_URL,
              },
            };
            saveAuthInfo(newProfileDetail);
            window.location.replace('/');
            commit(SIGN_IN_END, newProfileDetail.profile);
          },
          (error) => {
            ElMessage.error({
              showClose: true,
              message: error,
            });
            commit(SIGN_IN_END);
          },
        );
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(SIGN_IN_END);
      },
    );
  },
  async [SIGN_UP]({ commit }, userDetails) {
    commit(SIGN_UP_START);
    authServices.signup(userDetails).then(
      async (createUserData) => {
        const roleDetails = {
          userId: createUserData,
          roleIds: [
            process.env.VUE_APP_DEFAULT_ROLE_ID,
          ],
        };

        const userProfile = [
          {
            userId: createUserData,
            name: userDetails.displayName,
            userName: userDetails.userName,
            displayPhotoFilePath: null,
            displayBannerFilePath: null,
            walletAddress: null,
          },
        ];
        profileServices.createProfile(userProfile);
        authServices.assignRole(roleDetails).then(
          () => {
            ElMessage.success({
              showClose: true,
              message: 'Created account successfully',
            });
            window.location.replace('/');
            commit(SIGN_UP_END);
          },
          (error) => {
            ElMessage.error({
              showClose: true,
              message: error,
            });
            commit(SIGN_UP_END);
          },
        );
      },
    );
  },
  [SIGN_OUT]({ commit }) {
    authServices.logout();
    removeAuthInfo();
    window.location.replace('/');
    commit(SIGN_OUT);
  },
};

const mutations = {
  [SIGN_IN_START](state) {
    state.isSigningIn = true;
  },
  [SIGN_IN_END](state, data = null) {
    state.isSigningIn = false;
    state.loginProfile = data;
  },
  [SIGN_UP_START](state) {
    state.isSigningUp = true;
  },
  [SIGN_UP_END](state) {
    state.isSigningUp = false;
  },
  [SIGN_OUT](state) {
    state.loginProfile = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
