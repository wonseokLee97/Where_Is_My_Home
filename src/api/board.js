import http from "@/api/http";
import router from "@/router";

export default {
  state: () => ({
    article: {},
    articles: [],
  }),
  getters: {
    article(state) {
      return state.article;
    },
  },
  mutations: {
    SET_ARTICLE(state, article) {
      state.article = article;
    },
    SET_ARTICLE_LIST(state, articles) {
      state.articles = articles;
    },
  },
  actions: {
    getArticle({ commit }, articleno) {
      http
        .get(`/board/${articleno}`)
        .then(({ data }) => {
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
          commit("SET_ARTICLE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    writeArticle(_, article) {
      http
        .post(`/board`, article)
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          router.push({ name: "boardlist" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    modifyArticle(_, article) {
      http
        .put(`/board`, article)
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          router.push({ name: "boardlist" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteArticle(_, articleno) {
      http
        .delete(`/board/${articleno}`)
        .then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          router.push({ name: "boardlist" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    writeComment({ dispatch }, comment) {
      http
        .post(`/board/comment`, comment)
        .then(({ data }) => {
          let msg = "댓글 등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "댓글 등록이 완료되었습니다.";
          }
          alert(msg);
          dispatch("getArticle", comment.articleno);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteComment({ dispatch }, comment) {
      http
        .delete(`/board/comment/${comment.commentno}`)
        .then(({ data }) => {
          let msg = "댓글 삭제 처리시에 문제가 발생했습니다.";
          if (data === "success") {
            msg = "댓글 삭제가 완료되었습니다.";
          }
          alert(msg);
          dispatch("getArticle", comment.articleno);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
