import http from "@/api/http";

export default {
  state: () => ({
    userid: null,
  }),

  actions: {
    setLoginUser({ commit }, user) {
      http
        .post(`/user/login`, user)
        .then(({ data }) => {
          if (data) {
            console.log("로그인 성공!");
            commit("SET_LOGIN_USER", user);
          } else {
            console.log("로그인 실패!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mutations: {
    SET_LOGIN_USER(state, user) {
      state.userid = user.userId;
    },
    LOGOUT(state) {
      state.userid = null;
    },
  },
};
