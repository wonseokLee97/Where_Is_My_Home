import { apiInstance } from "./index.js";

const api = apiInstance();

async function getSido(success, fail) {
  api.get(`/home/sido`).then(success).catch(fail);
}

async function getGugun(param, success, fail) {
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

async function getApartDeals(aptCode, success, fail) {
  api.get(`/home/deal/${aptCode}`).then(success).catch(fail);
}

async function getStoreInfo(param, success, fail) {
  await api.get(`/home/storeinfo`, { params: param }).then(success).catch(fail);
}

async function getStoreList(param, success, fail) {
  await api.get(`/home/storelist`, { params: param }).then(success).catch(fail);
}

export {
  getSido,
  getGugun,
  getDong,
  getApartList,
  getApartInfo,
  getApartListByLngLat,
  getApartDeals,
  getStoreInfo,
  getStoreList,
};
