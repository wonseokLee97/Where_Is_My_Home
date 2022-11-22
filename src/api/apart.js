import { apiInstance } from "./index.js";

const api = apiInstance();

async function getSido(success, fail) {
  api.get(`/home/sido`).then(success).catch(fail);
}

async function getGugun(param, success, fail) {
  console.log(param);
  api.get(`/home/gugun`, { params: param }).then(success).catch(fail);
}

async function getDong(param, success, fail) {
  api.get(`/home/dong`, { params: param }).then(success).catch(fail);
}

async function getApartList(param, success, fail) {
  api.get(`/home`, { params: param }).then(success).catch(fail);
}

async function getApartListByLngLat(param, success, fail) {
  api.get(`/home/lnglat`, { params: param }).then(success).catch(fail);
}

async function getApartInfo(aptcode, success, fail) {
  api.get(`/home/${aptcode}`).then(success).catch(fail);
}

async function getApartDeals(searchParam, success, fail) {
  api.get(`/home/deal/${searchParam.aptCode}`, { params: searchParam.params }).then(success).catch(fail);
}

async function getApartDealCount(aptCode, success, fail) {
  api.get(`/home/deal/count/${aptCode}`).then(success).catch(fail);
}

export {
  getSido,
  getGugun,
  getDong,
  getApartList,
  getApartInfo,
  getApartListByLngLat,
  getApartDeals,
  getApartDealCount,
};
