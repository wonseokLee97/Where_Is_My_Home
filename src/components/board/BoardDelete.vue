<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col><b-alert show variant="danger">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BoardDelete",
  created() {
    this.$store.dispatch("deleteArticle", this.$route.params.articleno).then(() => {
      alert(this.msg);
      this.$router.push({ name: "boardlist" });
    });
  },
  computed: {
    ...mapGetters(["msg"]),
  },
};
</script>

<style></style>
