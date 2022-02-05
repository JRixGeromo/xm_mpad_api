import profileServices from '@/services/profile-service';
import { GET_USER_PROFILE } from '@/store/modules/profile/actions-type';
import { GET_USER_PROFILE_START, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_FAILURE } from '@/store/modules/profile/mutations-type';
import { ElMessage /* ElLoading */ } from 'element-plus';

const state = {
  gettingProfile: false,
  userProfile: null,
};

const getters = {
};

const actions = {
  [GET_USER_PROFILE]({ commit }, profileId) {
    commit(GET_USER_PROFILE_START);
    profileServices.getProfilebyProfileId(profileId).then(
      (data) => {
        commit(GET_USER_PROFILE_SUCCESS, data);
      },
      (error) => {
        ElMessage.error({
          showClose: true,
          message: error,
        });
        commit(GET_USER_PROFILE_FAILURE);
      },
    );
  },
};

const mutations = {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
