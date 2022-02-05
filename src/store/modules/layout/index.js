const state = {
  isMobileView: false,
};

const getters = {
};

const actions = {
  UpdateMobileView({ commit }, isMobileView) {
    commit('isMobileViewUpdate', isMobileView);
  },
};

const mutations = {
  isMobileViewUpdate(state, isMobileView) {
    state.isMobileView = isMobileView;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
