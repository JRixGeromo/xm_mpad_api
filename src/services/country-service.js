import { CountriesApiIni } from './api';

function getCountries() {
  return CountriesApiIni().get('/v3.1/all')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

const services = {
  getCountries,
};

export default services;
