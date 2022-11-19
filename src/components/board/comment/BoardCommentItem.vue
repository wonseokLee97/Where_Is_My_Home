<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col>
        <b-card no-body style="width: 100%">
          <b-card-sub-title>{{ comment.userId }}<br />{{ comment.regtime }}</b-card-sub-title>
          <b-col class="text-right" v-if="userInfo.userId === comment.userId">
            <b-icon icon="pen" @click="modifyComment" />
            &nbsp;
            <b-icon icon="x-square" @click="deleteCommentAction" />
          </b-col>
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const boardStore = "boardStore";
const memberStore = "memberStore";

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
      if (confirm("삭제하시겠습니까?")) {
        this.deleteComment(this.comment);
      }
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    message() {
      if (this.comment.content) return this.comment.content.split("\n").join("<br>");
      return "";
    },
  },
};
//test
</script>

<style></style>
