import jwtDecode from "jwt-decode";
import router from "@/router";
import { login, findById, tokenRegeneration, logout, regist, modify, deleteUser, findByName } from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    isValidate: false,
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_USER_VALIDATE: (state, isValidate) => {
      state.isValidate = isValidate;
    }
  },
  
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
          } else {
            console.log("유저 정보 없음");
          }
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("유저 정보 없음");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async registUser(_, user) {
      await regist(
        user,
        ({ data }) => {
          if (data === "success") {
            alert("회원가입 성공");
            router.push({ name: "login" });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    async modifyUser({ commit }, user) {
      await modify(
        user,
        ({data}) => {
          if (data === "success") {
            alert("회원정보 수정 성공");
            commit("SET_USER_INFO", user);
            router.push({ name: "home" });
          }
        },
        (error) => {
          console.log(error);
        }
      )
    },

    async deleteUser({ commit }, userid) {
      await deleteUser(
        userid,
        ({data}) => {
          if (data === "success") {
            alert("회원탈퇴 성공");
            commit("SET_USER_INFO", null);
            router.push({ name: "home" });
          }
        },
        (error) => {
          console.log(error);
        }
      )
    },

    async checkEmail({commit}, user) {
      await findByName(
        user,
        ({ data }) => {
          console.log(data);
          let msg = "이메일 혹은 이름을 찾을 수 없습니다..";
          if (data.message === "success") {
            msg = "해당 이메일로 비밀번호를 전송했습니다.";
            commit("SET_USER_VALIDATE", user.userName)
          }
          commit("SET_USER_VALIDATE", null)
          alert(msg);
        },
        (error) => {
          console.log(error);
        }
      )
    },

    // async sendEmail(_, userEmail) {
    //   await sendEmail(
    //     userEmail,
    //     ({ data }) => {
    //       console.log(data);
    //       console.log("라면좀 ㅋㅋ");
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   )
    // }
    
  },
};

export default memberStore;
//