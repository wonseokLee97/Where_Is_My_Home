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

async function getApartInfo(aptcode, success, fail) {
  api.get(`/home/${aptcode}`).then(success).catch(fail);
}

export { getSido, getGugun, getDong, getApartList, getApartInfo };
