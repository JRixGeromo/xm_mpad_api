import { MpApiIni, SetAuthHeader } from './api';

function getProducts() {
  return MpApiIni().get('/api/mp/product/v1/products', SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getProductByUserId(userId) {
  return MpApiIni().get(`/api/mp/product/v1/${userId}/product/user`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getProductById(productId) {
  return MpApiIni().get(`/api/mp/product/v1/${productId}/product`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getSimilarProductsById(productId) {
  return MpApiIni().get(`/api/mp/product/v1/${productId}/product/similar`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function createProduct(productDetails) {
  return MpApiIni().post('/api/mp/product/v1/product', productDetails, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getBannerProducts() {
  return MpApiIni().get('/api/mp/product/v1/products/banner')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getPopularProducts() {
  return MpApiIni().get('/api/mp/product/v1/products/popular/4')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getAuctionEndSoonProducts() {
  return MpApiIni().get('/api/mp/product/v1/products/auctionendsoon/4')
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function placeBid(bidDetails) {
  return MpApiIni().post('/api/mp/product/v1/bid', bidDetails, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function placeOffer(offerDetails) {
  return MpApiIni().post('/api/mp/product/v1/offer', offerDetails, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getBidsByProductId(productId) {
  return MpApiIni().get(`/api/mp/product/v1/product/${productId}/bids`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getOffersByProductId(productId) {
  return MpApiIni().get(`/api/mp/product/v1/${productId}/offers`)
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function rejectOffer(offerId) {
  return MpApiIni().get(`/api/mp/product/v1/${offerId}/rejectoffer`, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function acceptOffer(offerId) {
  return MpApiIni().get(`/api/mp/product/v1/${offerId}/acceptoffer`, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function cancelOffer(offerId) {
  return MpApiIni().get(`/api/mp/product/v1/${offerId}/canceloffer`, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function likeUnlikeProduct(productId) {
  return MpApiIni().post(`/api/mp/product/v1/${productId}/like`, null, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getLikedProduct(productId) {
  return MpApiIni().get(`/api/mp/product/v1/${productId}/like`, SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function getLikedProducts() {
  return MpApiIni().get('/api/mp/product/v1/like/products', SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

function newlistingcharts() {
  return MpApiIni().get('/api/mp/product/v1/product/dashboard/newlistingcharts', SetAuthHeader())
    .then((response) => response.data)
    .catch((error) => {
      throw error.response.data;
    });
}

const services = {
  getProductByUserId,
  getProductById,
  getSimilarProductsById,
  getBannerProducts,
  createProduct,
  getPopularProducts,
  getAuctionEndSoonProducts,
  placeBid,
  placeOffer,
  getBidsByProductId,
  getOffersByProductId,
  acceptOffer,
  rejectOffer,
  cancelOffer,
  likeUnlikeProduct,
  getLikedProducts,
  getLikedProduct,
  getProducts,
  newlistingcharts,
};

export default services;
