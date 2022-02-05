import axios from 'axios';
import { isLoggin } from '@/helpers';
import { ApiIni, SetAuthHeader } from './api';
import authServices from './auth-service';

async function getConfigurationByName(name) {
  const config = {
    ...SetAuthHeader(),
  };

  if (!isLoggin()) {
    const authResp = await authServices.setSuperAdminHeader();
    config.headers.Authorization = `Bearer ${authResp}`;
  }

  return ApiIni().get(`/api/configuration/v1/${name}`, config)
    .then((response) => {
      delete axios.defaults.headers.common.Authorization;
      return response.data;
    })
    .catch((error) => {
      delete axios.defaults.headers.common.Authorization;
      throw error.response.data;
    });
}

const services = {
  getConfigurationByName,
};

export default services;
