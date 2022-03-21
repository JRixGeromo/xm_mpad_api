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

function getTransactions() {
  return MpApiIni().get('/api/mp/transaction/v1/transactions', SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getTransactionById(transactionId) {
  return MpApiIni().get(`/api/mp/transaction/v1/${transactionId}/transaction`, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getPurchasesChart() {
  return MpApiIni().get('/api/mp/transaction/v1/transaction/dashboard/purchases', SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getPaymentsChart() {
  return MpApiIni().get('/api/mp/transaction/v1/transaction/dashboard/payments', SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

const services = {
  getUserSoldTransactions,
  getUserBoughtTransactions,
  payment,
  getTransactions,
  getTransactionById,
  getPurchasesChart,
  getPaymentsChart,
};

export default services;
