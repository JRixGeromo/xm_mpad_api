import { MpApiIni, SetAuthHeader } from './api';

function getUserSoldTransactions() {
  return MpApiIni().get('/api/mp/transaction/v1/sold/transactions', SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getUserBoughtTransactions() {
  return MpApiIni().get('/api/mp/transaction/v1/bought/transactions', SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function payment(paymentDetails) {
  return MpApiIni().post('/api/mp/transaction/v1/payment', paymentDetails, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

const services = {
  getUserSoldTransactions,
  getUserBoughtTransactions,
  payment,
};

export default services;
