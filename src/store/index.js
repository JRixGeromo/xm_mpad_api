import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import layout from './modules/layout';
import profile from './modules/profile';

const debug = process.env.NODE_ENV !== 'production';

const persistedState = createPersistedState({
  paths: ['auth'],
});

export default createStore({
  modules: {
    auth,
    profile,
    layout,
  },
  strict: true,
  plugins: debug ? [createLogger(), persistedState] : [persistedState],
});
