import Vue from "vue";
import Vuex from "vuex";
import board from "@/api/board";
import member from "@/api/member";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    board: board,
    member: member,
  },

  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
