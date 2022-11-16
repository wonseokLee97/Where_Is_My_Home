import http from "@/api/http";

export default {
  state: () => ({
    article: {},
    articles: [],
    msg: "",
  }),
  getters: {
    article(state) {
      return state.article;
    },
    msg(state) {
      return state.msg;
    },
  },
  mutations: {
    SET_ARTICLE(state, article) {
      state.article = article;
    },
    SET_ARTICLE_LIST(state, articles) {
      state.articles = articles;
    },
    SET_MESSAGE(state, msg) {
      state.msg = msg;
    },
  },
  actions: {
    getArticle({ commit }, articleno) {
      http
        .get(`/board/${articleno}`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_ARTICLE", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getArticles({ commit }) {
      http
        .get(`/board`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_ARTICLE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // writeArticle({ commit }, article) {
    //   http
    //     .post(`/board`, {
    //       userid: this.article.userid,
    //       subject: this.article.subject,
    //       content: this.article.content,
    //     })
    //     .then(({ data }) => {
    //       let msg = "등록 처리시 문제가 발생했습니다.";
    //       if (data === "success") {
    //         msg = "등록이 완료되었습니다.";
    //       }
    //       alert(msg);
    //       this.moveList();
    //     });
    // },
    // modifyArticle({ commit }, article) {
    //   http
    //     .put(`/board`, {
    //       articleno: this.article.articleno,
    //       userid: this.article.userid,
    //       subject: this.article.subject,
    //       content: this.article.content,
    //     })
    //     .then(({ data }) => {
    //       let msg = "수정 처리시 문제가 발생했습니다.";
    //       if (data === "success") {
    //         msg = "수정이 완료되었습니다.";
    //       }
    //       alert(msg);
    //       // 현재 route를 /list로 변경.
    //       this.moveList();
    //     });
    // },
    deleteArticle({ commit }, articleno) {
      http
        .delete(`/board/${articleno}`)
        .then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          commit("SET_MESSAGE", msg);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteComment(_, commentno) {
      http
        .delete(`/board/comment/${commentno}`, commentno)
        .then(({ data }) => {
          let msg = "댓글 삭제 처리시에 문제가 발생했습니다.";
          if (data === "success") {
            msg = "댓글 삭제가 완료되었습니다.";
          }
          console.log(msg);
          alert(msg);
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    },
    writeComment(_, comment) {
      http
        .post(`/board/comment`, comment)
        .then(({ data }) => {
          let msg = "댓글 등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "댓글 등록이 완료되었습니다.";
          }
          console.log(msg);
          alert(msg);
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    },
  },
};
