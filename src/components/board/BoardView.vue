<template>
  <div>
    {{ board }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BoardView",
  created() {
    this.$store.dispatch("getArticle", this.$route.params.articleno);
  },
  computed: {
    ...mapState({
      board: (state) => state.board,
    }),
  },
};
</script>

<style></style>
