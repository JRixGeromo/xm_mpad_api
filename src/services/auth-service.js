import { ApiIni, SetAuthHeader } from './api';

function login(loginCredentials) {
  return ApiIni().post('/api/user/v1/auth', loginCredentials)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function signup(signupDetails) {
  return ApiIni().post('/api/user/v1', signupDetails)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function logout() {
  return ApiIni().post('/api/user/v1/session/terminate', null, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function setSuperAdminHeader() {
  const superAdmin = {
    userName: process.env.VUE_APP_USER_NAME,
    secret: process.env.VUE_APP_SECRET,
    applicationDomain: process.env.VUE_APP_APPLICATION_DOMAIN,
  };
  return ApiIni().post('/api/user/v1/auth', superAdmin).then(
    (response) => response.data.token,
    (error) => error.response.data,
  );
}

function assignRole(roleDetails) {
  return setSuperAdminHeader().then(
    (data) => {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data}`,
        },
      };

      return ApiIni().post('/api/access/v1/authorization', roleDetails, config)
        .then((response) => response.data)
        .catch((error) => {
          throw error.response.data;
        });
    },
  );
}

const services = {
  login,
  signup,
  logout,
  assignRole,
  setSuperAdminHeader,
};

export default services;
