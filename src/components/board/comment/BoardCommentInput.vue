<template>
  <div>
    <b-input-group>
      <b-form-textarea
        id="textarea-no-resize"
        type="text"
        placeholder="댓글을 입력하세요"
        ref="comment"
        v-model="comment.content"
      >
      </b-form-textarea>
      <b-input-group-append>
        <b-button @click="regist" variant="outline-secondary">등록</b-button>
        <b-button @click="cancle">
          <b-icon icon="x" />
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

const memberStore = "memberStore";
const boardStore = "boardStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      comment: {
        userId: "",
        content: "",
        articleNo: 0,
        commentNo: 0,
      },
    };
  },
  props: {
    type: { type: String },
    mcomment: {},
  },
  created() {
    if (this.type === "modify") {
      this.comment.commentNo = this.mcomment.commentNo;
      this.comment.content = this.mcomment.content;
    }
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(boardStore, ["article"]),
  },
  methods: {
    ...mapActions(boardStore, ["writeComment", "modifyComment"]),
    regist(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      if (!this.comment.content) {
        msg = "댓글을 입력해주세요";
        err = false;
        this.$refs.comment.focus();
      }

      if (!err) alert(msg);
      else {
        this.comment.userId = this.userInfo.userId;
        this.comment.articleNo = this.article.articleNo;
        if (this.type === "modify") this.modifyComment(this.comment);
        else this.writeComment(this.comment);
        this.comment.content = "";
        this.cancle();
      }
    },
    cancle() {
      this.comment.content = "";
      if (this.type === "modify") this.$emit("cancle");
    },
  },
};
</script>

<style></style>
