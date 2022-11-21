<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col>
        <b-card no-body style="width: 100%">
          <b-card-sub-title><br />{{ comment.userId }} {{ comment.regtime }}</b-card-sub-title>
          <template v-if="modify">
            <board-comment-input type="modify" @cancle="cancle" :mcomment="comment" />
          </template>
          <template v-else>
            <b-card-body class="text-left">
              <b-col class="text-right" v-if="userInfo.userId === comment.userId">
                <b-icon icon="pen" @click="modifyComment" />
                &nbsp;
                <b-icon icon="x-square" @click="deleteCommentAction" />
              </b-col>
              <div v-html="message" />
            </b-card-body>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BoardCommentInput from "@/components/board/comment/BoardCommentInput";
import { mapState, mapActions } from "vuex";

const boardStore = "boardStore";
const memberStore = "memberStore";

export default {
  name: "BoardCommentItem",
  components: {
    BoardCommentInput,
  },
  data() {
    return {
      modify: false,
    };
  },
  props: {
    comment: {},
  },
  methods: {
    ...mapActions(boardStore, ["deleteComment"]),
    modifyComment() {
      this.modify = true;
    },
    deleteCommentAction() {
      if (confirm("삭제하시겠습니까?")) {
        this.deleteComment(this.comment);
      }
    },
    cancle() {
      this.modify = false;
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
</script>

<style></style>
