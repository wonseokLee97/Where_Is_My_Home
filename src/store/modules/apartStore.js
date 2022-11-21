import { getSido, getGugun, getDong, getApartList, getApartInfo } from "@/api/apart";

const apartStore = {
  namespaced: true,
  state: {
    sidoList: [],
    gugunList: [],
    dongList: [],
    apartList: [],
    apartInfo: {},
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
          console.log(data);
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
  },
};

export default apartStore;
