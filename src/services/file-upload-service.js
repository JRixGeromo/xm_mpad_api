import { removeAuthInfo } from '@/helpers';
import { ApiIni, SetAuthHeader, CheckAuthStatus } from './api';

function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  return ApiIni().post('/api/uploads/v1/xm_mp', formData, {
    headers: {
      Accept: 'multipart/form-data',
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${SetAuthHeader().headers.Authorization}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      CheckAuthStatus(error.response);
      if (error.response.status === 500) {
        removeAuthInfo();
        window.location.reload();
      }
      throw error.response.data;
    });
}

const services = {
  uploadFile,
};

export default services;
