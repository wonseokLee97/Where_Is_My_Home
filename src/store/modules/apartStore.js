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
  getFavoriteApts,
  checkFavoriteApt,
  addFavoriteApt,
  removeFavoriteApt,
  searchAptNames,
  getAptByName,
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
    isFavoriteApt: false,
    favoriteApts: [],
    searchList: [],
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
    SET_IS_FAVORITE_APT(state, isFavoriteApt) {
      state.isFavoriteApt = isFavoriteApt;
    },
    SET_FAVORITE_APTS(state, favoriteApts) {
      state.favoriteApts = favoriteApts;
    },
    SET_SEARCH_LIST(state, searchList) {
      state.searchList = searchList;
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
          console.log(error);
        },
      );
    },
    async getFavoriteApts({ commit }, userId) {
      await getFavoriteApts(
        userId,
        ({ data }) => {
          commit("SET_FAVORITE_APTS", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async checkFavoriteApt({ commit }, param) {
      await checkFavoriteApt(
        param,
        ({ data }) => {
          commit("SET_IS_FAVORITE_APT", data == 1);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async addFavoriteApt({ commit, dispatch }, param) {
      console.log(param);
      await addFavoriteApt(
        param,
        () => {
          commit("SET_IS_FAVORITE_APT", true);
        },
        (error) => {
          console.log(error);
        },
      );
      await dispatch("getFavoriteApts", param.userId);
    },
    async removeFavoriteApt({ commit, dispatch }, param) {
      await removeFavoriteApt(
        param,
        () => {
          commit("SET_IS_FAVORITE_APT", false);
        },
        (error) => {
          console.log(error);
        },
      );
      await dispatch("getFavoriteApts", param.userId);
    },
    async searchAptNames({ commit }, word) {
      await searchAptNames(
        word,
        ({ data }) => {
          commit("SET_SEARCH_LIST", data);
          if (!data) commit("SET_SEARCH_LIST", []);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getAptByName({ commit }, word) {
      await getAptByName(
        word,
        ({ data }) => {
          commit("SET_APT_LIST", data);
          if (!data) commit("SET_APT_LIST", []);
        },
        (error) => {
          console.log(error);
        },
      );
    },
  },
};

export default apartStore;
