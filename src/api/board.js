import http from "@/api/http";

export default {
  state: () => ({
    article: {},
    articles: [],
  }),
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
  },
};
