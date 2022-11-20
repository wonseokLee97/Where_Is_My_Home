import { apiInstance } from "./index.js";

const api = apiInstance();

async function listArticle(param, success, fail) {
  api.get(`/board`, { params: param }).then(success).catch(fail);
}

async function getArticleCount(param, success, fail) {
  api.get(`/board/count`, { params: param }).then(success).catch(fail);
}

async function writeArticle(article, success, fail) {
  api.post(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

async function getArticle(articleno, success, fail) {
  api.get(`/board/${articleno}`).then(success).catch(fail);
}

async function modifyArticle(article, success, fail) {
  api.put(`/board`, JSON.stringify(article)).then(success).catch(fail);
}

async function deleteArticle(articleno, success, fail) {
  api.delete(`/board/${articleno}`).then(success).catch(fail);
}

async function writeComment(comment, success, fail) {
  api.post(`/board/comment`, JSON.stringify(comment)).then(success).catch(fail);
}

async function modifyComment(comment, success, fail) {
  api.put(`/board/comment`, JSON.stringify(comment)).then(success).catch(fail);
}

async function deleteComment(commentno, success, fail) {
  api.delete(`/board/comment/${commentno}`).then(success).catch(fail);
}

export {
  listArticle,
  getArticleCount,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
  writeComment,
  modifyComment,
  deleteComment,
};
