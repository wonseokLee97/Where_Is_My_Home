<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="outline-primary" to="/board/list">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2">글수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleno}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userid}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <board-comment :comments="article.comments"></board-comment>
    <board-comment-write></board-comment-write>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import BoardComment from "./comment/BoardComment.vue";
import BoardCommentWrite from "./comment/BoardCommentWrite.vue";

export default {
  components: { BoardComment, BoardCommentWrite },
  name: "BoardView",
  created() {
    this.$store.dispatch("getArticle", this.$route.params.articleno);
  },
  computed: {
    ...mapState({
      board: (state) => state.board,
      article: (state) => state.board.article,
    }),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleno: this.article.articleno },
      });
    },
    deleteArticle() {
      if (confirm("삭제하시겠습니까?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleno: this.article.articleno },
        });
      }
    },
  },
};
</script>

<style></style>
