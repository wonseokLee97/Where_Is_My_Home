<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show variant="dark">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "BoardDelete",
  created() {
    this.$store.dispatch("deleteArticle", this.$route.params.articleno);
  },
};
</script>

<style></style>
