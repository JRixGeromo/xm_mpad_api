import { MpApiIni } from './api';

function createProfile(profileDetails) {
  return MpApiIni().post('/api/mp/profile/v1/profile', profileDetails)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getProfilebyUserId(userId) {
  return MpApiIni().get(`/api/mp/profile/v1/${userId}/profile/user`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getProfilebyProfileId(profileId) {
  return MpApiIni().get(`/api/mp/profile/v1/${profileId}/profile`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

const services = {
  createProfile,
  getProfilebyUserId,
  getProfilebyProfileId,
};

export default services;
