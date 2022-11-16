<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-info" size="sm" @click="moveModifyComment" class="mr-2">댓글 수정</b-button>
        <b-button variant="outline-danger" size="sm" @click="deleteComment">댓글 삭제</b-button>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h6>${comment.userid}</h6> ${comment.regtime}</div>`"
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
export default {
  name: "BoardCommentItem",
  props: {
    comment: {},
  },
  methods: {
    moveModifyComment() {
      // this.$store.dispatch("moveModifyComment", this.article);
    },
    deleteComment() {
      this.$store.dispatch("deleteComment", this.comment.commentno);
      this.refreshAll();
    },
    refreshAll() {
      this.$router.go();
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
