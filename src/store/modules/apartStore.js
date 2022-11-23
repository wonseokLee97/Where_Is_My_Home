import {
  getSido,
  getGugun,
  getDong,
  getApartList,
  getApartInfo,
  getApartListByLngLat,
  getApartDeals,
  getStoreInfo,
  getStoreList,
} from "@/api/apart";

const apartStore = {
  namespaced: true,
  state: {
    sidoList: [],
    gugunList: [],
    dongList: [],
    apartList: [],
    apartInfo: {},
    apartDeals: [],
    totalRows: 0,
    storeInfo: [],
    storeList: [],
  },
  mutations: {
    SET_SIDO_LIST(state, sidoList) {
      state.sidoList = sidoList;
      state.gugunList = [];
      state.dongList = [];
    },
    SET_GUGUN_LIST(state, gugunList) {
      state.gugunList = gugunList;
      state.dongList = [];
    },
    SET_DONG_LIST(state, dongList) {
      state.dongList = dongList;
    },
    SET_APT_LIST(state, apartList) {
      state.apartList = apartList;
    },
    SET_APT_INFO(state, apartInfo) {
      state.apartInfo = apartInfo;
    },
    SET_APT_DEALS(state, apartDeals) {
      state.apartDeals = apartDeals;
    },
    SET_TOTAL_ROWS(state, totalRows) {
      state.totalRows = totalRows;
    },
    SET_STORE_INFO(state, storeInfo) {
      state.storeInfo = storeInfo;
    },
    SET_STORE_LIST(state, storeList) {
      state.storeList = storeList;
    },
  },
  actions: {
    async getSidoList({ commit }) {
      await getSido(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getGugunList({ commit }, param) {
      await getGugun(
        param,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getDongList({ commit }, param) {
      await getDong(
        param,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getApartList({ commit }, param) {
      await getApartList(
        param,
        ({ data }) => {
          commit("SET_APT_LIST", data);
          if (!data) commit("SET_APT_LIST", param.sidoName + " " + param.gugunName + " " + param.dongName);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getApartListByLngLat({ commit }, param) {
      await getApartListByLngLat(
        param,
        ({ data }) => {
          commit("SET_APT_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getApartInfo({ commit }, aptcode) {
      await getApartInfo(
        aptcode,
        ({ data }) => {
          commit("SET_APT_INFO", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getApartDeals({ commit }, aptCode) {
      await getApartDeals(
        aptCode,
        ({ data }) => {
          if (data) {
            commit("SET_APT_DEALS", data);
            commit("SET_TOTAL_ROWS", data.length);
          } else {
            commit("SET_APT_DEALS", []);
            commit("SET_TOTAL_ROWS", 0);
          }
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getStoreInfo({ commit }, param) {
      await getStoreInfo(
        param,
        ({ data }) => {
          commit("SET_STORE_INFO", data);
          if (!data) commit("SET_STORE_INFO", []);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getStoreList({ commit }, param) {
      await getStoreList(
        param,
        ({ data }) => {
          commit("SET_STORE_LIST", data);
          if (!data) commit("SET_STORE_LIST", []);
        },
        (error) => {
          console.log("error = ", error);
        },
      );
    },
  },
};

export default apartStore;
