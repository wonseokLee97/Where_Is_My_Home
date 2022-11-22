import {
  getSido,
  getGugun,
  getDong,
  getApartList,
  getApartInfo,
  getApartListByLngLat,
  getApartDeals,
  getApartDealCount,
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
    async getApartDeals({ commit, dispatch }, searchParam) {
      await getApartDeals(
        searchParam,
        ({ data }) => {
          commit("SET_APT_DEALS", data);
        },
        (error) => {
          console.log(error);
        },
      );
      await dispatch("getApartDealCount", searchParam.aptCode);
    },
    async getApartDealCount({ commit }, aptCode) {
      await getApartDealCount(
        aptCode,
        ({ data }) => {
          commit("SET_TOTAL_ROWS", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
  },
};

export default apartStore;
