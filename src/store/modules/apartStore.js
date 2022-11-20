import { getSido, getGugun, getDong } from "@/api/apart";

const apartStore = {
  namespaced: true,
  state: {
    sidoList: [],
    gugunList: [],
    dongList: [],
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
  },
  actions: {
    async getSidoList({ commit }) {
      await getSido(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getGugunList({ commit }, sido) {
      await getGugun(
        sido,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getDongList({ commit }, dong) {
      await getDong(
        dong,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default apartStore;
