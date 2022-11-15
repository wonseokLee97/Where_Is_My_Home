import http from "@/api/http";

export default {
  state: () => ({
    userid: null,
  }),

  mutations: {
    SET_LOGIN_USER(state, userid) {
      state.userid = userid;
    },
  },

  actions: {
    setLoginUser({ commit }, user) {
      console.log(user);

      http
        .post(`/user/login`, null, {
          params: { user },
        })
        .then(({ data }) => {
          if (data === "fail") {
            console.log("로그인 실패!");
          } else {
            console.log("로그인 성공!");
            commit("SET_LOGIN_USER", data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
