<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form-group id="userid-group" label="작성자:" label-for="userid">
        <b-form-input
          id="userid"
          :disabled="true"
          v-model="article.userId"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="subject-group" label="제목:" label-for="subject">
        <b-form-input
          id="subject"
          v-model="article.subject"
          type="text"
          required
          placeholder="제목 입력"
        ></b-form-input>
      </b-form-group>
      <vue-editor v-model="article.content"></vue-editor>
      <b-button
        type="submit"
        variant="secondary"
        class="m-1"
        @click="onSubmit"
        v-if="this.type === 'register'"
        >글작성</b-button
      >
      <b-button type="submit" variant="secondary" class="m-1" @click="onSubmit" v-else
        >글수정</b-button
      >
      <b-button type="list" @click="moveList" variant="light" class="m-1">글목록</b-button>
    </b-col>
  </b-row>
</template>

<script>
import store from "@/store";
import { mapActions, mapState } from "vuex";
import { VueEditor } from "vue2-editor";

const memberStore = "memberStore";
const boardStore = "boardStore";

export default {
  name: "BoardInputItem",
  components: {
    VueEditor,
  },
  data() {
    return {
      article: {
        userId: "",
        subject: "",
        content: "",
      },
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    this.article.userId = this.userInfo.userId;
    if (this.type === "modify") {
      this.article = store.getters["boardStore/article"];
    }
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(boardStore, ["writeArticle", "modifyArticle"]),
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userId &&
        ((msg = "작성자 입력해주세요"), (err = false), this.$refs.userid.focus());
      err &&
        !this.article.subject &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false), this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "register"
          ? this.writeArticle(this.article)
          : this.modifyArticle(this.article);
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
  },
};
</script>

<style></style>
