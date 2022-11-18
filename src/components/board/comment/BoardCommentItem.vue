<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right" v-if="userInfo.userId === article.userId">
        <b-button variant="secondary" size="sm" @click="modifyComment" class="mr-2">수정</b-button>
        <b-button variant="outline-secondary" size="sm" @click="deleteCommentAction">삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h6>${comment.userId}</h6> ${comment.regtime}</div>`"
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
  </b-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

const boardStore = "boardStore";

export default {
  name: "BoardCommentItem",
  props: {
    comment: {},
  },
  methods: {
    ...mapMutations(boardStore, ["SET_MODIFYNO"]),
    ...mapActions(boardStore, ["deleteComment"]),
    modifyComment() {
      this.SET_MODIFYNO(this.comment.commentNo);
    },
    deleteCommentAction() {
      this.deleteComment(this.comment);
    },
  },
  computed: {
    message() {
      if (this.comment.content) return this.comment.content.split("\n").join("<br>");
      return "";
    },
  },
};
//test
</script>

<style></style>
