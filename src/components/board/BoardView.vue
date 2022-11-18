<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="light" to="/board/list">목록</b-button>
      </b-col>
      <b-col class="text-right">
        <b-button variant="secondary" size="sm" @click="moveModifyArticle" class="mr-2"
          >글수정</b-button
        >
        <b-button variant="outline-secondary" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${article.articleNo}.
          ${article.subject} [${article.hit}]</h3><div><h6>${article.userId}</div><div>${article.regtime}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
            <hr />
            <board-comment :comments="article.comments"></board-comment>
            <board-comment-input></board-comment-input>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BoardComment from "./comment/BoardComment.vue";
import BoardCommentInput from "./comment/BoardCommentInput.vue";

const boardStore = "boardStore";

export default {
  name: "BoardView",
  components: {
    BoardComment,
    BoardCommentInput,
  },
  created() {
    this.getArticle(this.$route.params.articleno);
  },
  computed: {
    ...mapState(boardStore, ["article"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  methods: {
    ...mapActions(boardStore, ["getArticle"]),
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleno: this.article.articleNo },
      });
    },
    deleteArticle() {
      if (confirm("삭제하시겠습니까?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleno: this.article.articleNo },
        });
      }
    },
  },
};
</script>

<style></style>
