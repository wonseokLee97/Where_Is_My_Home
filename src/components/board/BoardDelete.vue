<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show variant="dark">삭제처리중...</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

const boardStore = "boardStore";

export default {
  name: "BoardDelete",
  created() {
    this.deleteArticle(this.$route.params.articleno);
  },
  methods: {
    ...mapActions(boardStore, ["deleteArticle"]),
  },
};
</script>

<style></style>
