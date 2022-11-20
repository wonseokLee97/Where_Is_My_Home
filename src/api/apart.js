import { apiInstance } from "./index.js";

const api = apiInstance();

async function getSido(success, fail) {
  api.get(`/home/sido`).then(success).catch(fail);
}

async function getGugun(sido, success, fail) {
  api.get(`/home/gugun?sido=${sido}`).then(success).catch(fail);
}

async function getDong(gugun, success, fail) {
  api.get(`/home/dong?gugun=${gugun}`).then(success).catch(fail);
}

export { getSido, getGugun, getDong };
