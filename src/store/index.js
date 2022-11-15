import Vue from "vue";
import Vuex from "vuex";
import board from "@/api/board";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    board: board,
  },
});
