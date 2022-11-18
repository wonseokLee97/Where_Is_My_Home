<template>
  <div>
    <b-input-group>
      <b-form-textarea
        id="comment"
        type="text"
        placeholder="댓글을 입력하세요"
        ref="comment"
        v-model="comment.content"
      >
      </b-form-textarea>
      <b-input-group-append>
        <b-button @click="modify" variant="outline-secondary">등록</b-button>
        <b-button @click="cancle">
          <b-icon icon="x" />
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

const memberStore = "memberStore";
const boardStore = "boardStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      comment: {
        userId: "",
        content: "",
        articleNo: "",
      },
      modifyChange: false,
    };
  },
  props: {
    type: { type: String },
    mcomment: {},
  },
  created() {
    if (this.type === "modify") {
      this.comment = this.mcomment;
    }
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    ...mapGetters(boardStore, ["article", "modifyNo"]),
  },
  methods: {
    ...mapActions(boardStore, ["writeComment", "modifyComment"]),
    ...mapMutations(boardStore, ["SET_MODIFYNO"]),
    modify(event) {
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
        this.SET_MODIFYNO(-1);
        this.comment.content = "";
      }
    },
    cancle() {
      this.SET_MODIFYNO(-1);
    },
  },
  watch: {
    modifyNo() {
      this.modifyChange = true;
    },
  },
  beforeDestroy() {
    if (this.modifyChange) this.SET_MODIFYNO(-1);
  },
};
</script>

<style></style>
