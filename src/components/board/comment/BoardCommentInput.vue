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
import { mapGetters } from "vuex";
export default {
  name: "BoardInputItem",
  data() {
    return {
      comment: {
        userid: "",
        content: "",
        articleno: "",
      },
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
  methods: {
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
        this.comment.userid = this.userid;
        this.comment.articleno = this.article.articleno;
        if (this.type === "modify") this.$store.dispatch("modifyComment", this.comment);
        else this.$store.dispatch("writeComment", this.comment);
        this.$store.commit("SET_MODIFYNO", -1);
        this.comment.content = "";
      }
    },
    cancle() {
      this.$store.commit("SET_MODIFYNO", -1);
    },
  },
  computed: {
    ...mapGetters(["article", "userid"]),
  },
  beforeDestroy() {
    this.$store.commit("SET_MODIFYNO", -1);
  },
};
</script>

<style></style>
