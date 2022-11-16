<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @list="moveList">
        <b-form-group id="userid-group" label="작성자:" label-for="userid" description="작성자를 입력하세요.">
          <b-form-input
            id="userid"
            :disabled="true"
            v-model="article.userid"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="subject-group" label="제목:" label-for="subject" description="제목을 입력하세요.">
          <b-form-input
            id="subject"
            v-model="article.subject"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="article.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button type="submit" variant="primary" class="m-1" v-if="this.type === 'register'">글작성</b-button>
        <b-button type="submit" variant="primary" class="m-1" v-else>글수정</b-button>
        <b-button type="list" variant="danger" class="m-1">글목록</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        userid: "",
        subject: "",
        content: "",
      },
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    this.article.userid = this.userid;
    if (this.type === "modify") {
      this.article = this.mArticle;
    }
  },
  computed: {
    ...mapGetters({
      mArticle: ["article"],
      userid: ["userid"],
    }),
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userid && ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      err && !this.article.subject && ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err && !this.article.content && ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    registArticle() {
      this.$store.dispatch("writeArticle", this.article);
    },
    modifyArticle() {
      this.$store.dispatch("modifyArticle", this.article);
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
