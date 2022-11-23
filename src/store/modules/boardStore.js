import router from "@/router";
import {
  listQna,
  listArticle,
  getArticleCount,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
  writeComment,
  modifyComment,
  deleteComment,
} from "@/api/board";

const boardStore = {
  namespaced: true,
  state: {
    article: {},
    articles: [],

    qna: {},
    qnas: [],
    totalRows: 0,
  },
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
    SET_QNA_ARTICLE(state, qna) {
      state.qna = qna;
    },
    SET_QNA_ARTICLE_LIST(state, qnas) {
      state.qnas = qnas;
    },
    SET_TOTAL_ROWS(state, totalRows) {
      state.totalRows = totalRows;
    },
  },
  actions: {
    // ========= QNA ============
    async listQna({ commit, dispatch }, params) {
      await listQna(
        params,
        ({ data }) => {
          console.log(params);
          console.log(data);
          commit("SET_QNA_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
      await dispatch("getArticleCount", params);
    },
    // async getQnaCount({ commit }, params) {
    //   await getQnaCount(
    //     params,
    //     ({ data }) => {
    //       commit("SET_QNA_ROWS", data);
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //   );
    // },
    // async getQna({ commit }, articleNo) {
    //   await getQna(
    //     articleNo,
    //     ({ data }) => {
    //       commit("SET_QNA", data);
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //   );
    // },
    // async writeQna(_, article) {
    //   await writeQna(
    //     article,
    //     ({ data }) => {
    //       let msg = "등록 처리시 문제가 발생했습니다.";
    //       if (data === "success") {
    //         msg = "등록이 완료되었습니다.";
    //       }
    //       alert(msg);
    //       router.push({ name: "boardlist" });
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //   );
    // },
    // async deleteQna(_, articleNo) {
    //   await deleteQna(
    //     articleNo,
    //     ({ data }) => {
    //       let msg = "삭제 처리시 문제가 발생했습니다.";
    //       if (data === "success") {
    //         msg = "삭제가 완료되었습니다.";
    //       }
    //       alert(msg);
    //       router.push({ name: "boardlist" });
    //     },
    //     (error) => {
    //       console.log(error);
    //     },
    //   );
    // },

    // ========= LIST ============
    async listArticle({ commit, dispatch }, params) {
      await listArticle(
        params,
        ({ data }) => {
          console.log(params);
          console.log(data);
          commit("SET_ARTICLE_LIST", data);
        },
        (error) => {
          console.log(error);
        },
      );
      await dispatch("getArticleCount", params);
    },
    async getArticleCount({ commit }, params) {
      await getArticleCount(
        params,
        ({ data }) => {
          commit("SET_TOTAL_ROWS", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async getArticle({ commit }, articleNo) {
      await getArticle(
        articleNo,
        ({ data }) => {
          commit("SET_ARTICLE", data);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async writeArticle(_, article) {
      await writeArticle(
        article,
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          router.push({ name: "boardlist" });
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async modifyArticle(_, article) {
      await modifyArticle(
        article,
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          router.push({ name: "boardlist" });
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async deleteArticle(_, articleNo) {
      await deleteArticle(
        articleNo,
        ({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);
          router.push({ name: "boardlist" });
        },
        (error) => {
          console.log(error);
        },
      );
    },

    // ========= COMMENT ============
    async writeComment({ dispatch }, comment) {
      await writeComment(
        comment,
        ({ data }) => {
          let msg = "댓글 등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "댓글 등록이 완료되었습니다.";
          }
          alert(msg);
          dispatch("getArticle", comment.articleNo);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async modifyComment({ dispatch }, comment) {
      await modifyComment(
        comment,
        ({ data }) => {
          let msg = "댓글 수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "댓글 수정이 완료되었습니다.";
          }
          alert(msg);
          dispatch("getArticle", comment.articleNo);
        },
        (error) => {
          console.log(error);
        },
      );
    },
    async deleteComment({ dispatch }, comment) {
      await deleteComment(
        comment.commentNo,
        ({ data }) => {
          let msg = "댓글 삭제 처리시에 문제가 발생했습니다.";
          if (data === "success") {
            msg = "댓글 삭제가 완료되었습니다.";
          }
          alert(msg);
          dispatch("getArticle", comment.articleNo);
        },
        (error) => {
          console.log(error);
        },
      );
    },
  },
};

export default boardStore;
