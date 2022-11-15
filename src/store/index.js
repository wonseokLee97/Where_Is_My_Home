import Vue from "vue";
import Vuex from "vuex";
import http from "@/api/http";

Vue.use(Vuex);

const qna = {
  state: () => ({
    qnas: [],
    comments: [],
  }),
  mutations: {
    SET_QNA_LIST(state, qnas) {
      state.qnas = qnas;
    },
  },
  actions: {
    getQnas({ commit }) {
      http
        .get(`/board`)
        .then(({ data }) => {
          console.log(data);
          commit("SET_QNA_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};

export default new Vuex.Store({
  modules: {
    qna: qna,
  },
});
