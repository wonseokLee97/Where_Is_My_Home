import Vue from "vue";
import Vuex from "vuex";
import board from "@/api/board";
import member from "@/api/member";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    board: board,
    member: member,
  },
});
