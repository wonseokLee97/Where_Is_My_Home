<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button variant="light" to="/board/list">목록</b-button>
      </b-col>
      <b-col class="text-right" v-if="userInfo.userId === article.userId">
        <b-button variant="secondary" size="sm" @click="moveModifyArticle">글수정</b-button>&nbsp;
        <b-button variant="outline-secondary" size="sm" @click="deleteArticle">글삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-card no-body style="width: 100%">
        <b-card-title>{{ article.subject }}</b-card-title>
        <b-card-sub-title>
          <h6>{{ article.userId }}</h6>
          <p class="info">{{ article.regtime }} 조회수: {{ article.hit }}</p>
        </b-card-sub-title>
        <b-card-body class="text-left">
          <div v-bar class="word-box">
            <div v-html="message"></div>
          </div>
        </b-card-body>
      </b-card>
    </b-row>
    <board-comment :comments="article.comments"></board-comment>
    <board-comment-input></board-comment-input>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BoardComment from "./comment/BoardComment.vue";
import BoardCommentInput from "./comment/BoardCommentInput.vue";

const boardStore = "boardStore";
const memberStore = "memberStore";

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
    ...mapState(memberStore, ["userInfo"]),
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

<style>
.card {
  padding: 10px;
}

.word-box {
  height: 300px;
  margin: 20px auto;
  background-size: 100%;
  font-size: 15px;
}

.info {
  font-size: 13px;
  color: lightgray;
}

.vb > .vb-dragger {
  z-index: 5;
  width: 12px;
  right: 0;
}

.vb > .vb-dragger > .vb-dragger-styler {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: rotate3d(0, 0, 0, 0);
  transform: rotate3d(0, 0, 0, 0);
  -webkit-transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
  transition: background-color 100ms ease-out, margin 100ms ease-out, height 100ms ease-out;
  background-color: rgba(244, 88, 88, 0.1);
  margin: 5px 5px 5px 0;
  border-radius: 20px;
  height: calc(100% - 10px);
  display: block;
}

.vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(244, 88, 88, 0.3);
}

.vb > .vb-dragger:hover > .vb-dragger-styler {
  background-color: rgba(244, 88, 88, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(244, 88, 88, 0.5);
  margin: 0px;
  height: 100%;
}

.vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
  background-color: rgba(244, 88, 88, 0.5);
}
</style>
